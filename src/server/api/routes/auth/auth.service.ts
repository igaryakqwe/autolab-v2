import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import RequestError from '@/server/common/request-error';
import {
  ErrorCodes,
  ErrorMessages,
} from '@/server/common/enums/error-codes.enum';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DateTime } from 'luxon';

class AuthService {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async createUser(email: string, password: string): Promise<void> {
    const hashedPassword = await this.hashPassword(password);
    try {
      await this.db.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new RequestError({
            code: ErrorCodes.USER_ALREADY_EXISTS,
            message: ErrorMessages.USER_ALREADY_EXISTS,
          });
        }
      }
      throw new RequestError({
        code: ErrorCodes.INTERNAL_SERVER_ERROR,
        message: ErrorMessages.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async generateToken(token: string, email: string) {
    const expires = DateTime.now().plus({ days: 1 }).toJSDate();

    try {
      const existingToken = await this.db.verificationToken.findFirst({
        where: {
          email,
        },
      });

      if (existingToken) {
        await this.db.verificationToken.delete({
          where: {
            email_token: {
              email: existingToken.email,
              token: existingToken.token,
            },
          },
        });
      }

      await this.db.verificationToken.create({
        data: {
          email,
          token,
          expires,
        },
      });
    } catch {
      throw new RequestError({
        code: ErrorCodes.FAILED_TO_GENERATE_TOKEN,
        message: ErrorMessages.FAILED_TO_GENERATE_TOKEN,
      });
    }
  }

  async verifyEmail(email: string, token: string): Promise<void> {
    const emailToken = await this.db.verificationToken.findUnique({
      where: {
        email,
        token,
      },
    });

    if (!emailToken) {
      throw new RequestError({
        code: ErrorCodes.USER_NOT_FOUND,
        message: ErrorMessages.USER_NOT_FOUND,
      });
    }

    if (DateTime.fromJSDate(emailToken.expires) < DateTime.now()) {
      throw new RequestError({
        code: ErrorCodes.TOKEN_EXPIRED,
        message: ErrorMessages.TOKEN_EXPIRED,
      });
    }

    try {
      await this.db.user.update({
        where: {
          email,
        },
        data: {
          emailVerified: DateTime.now().toJSDate(),
        },
      });

      await this.db.verificationToken.delete({
        where: {
          email,
        },
      });
    } catch (e) {
      console.log(e);
      throw new RequestError({
        code: ErrorCodes.EMAIL_VERIFICATION_ERROR,
        message: ErrorMessages.EMAIL_VERIFICATION_ERROR,
      });
    }
  }
}

export default AuthService;
