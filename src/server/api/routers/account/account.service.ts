import { Prisma, PrismaClient } from '@prisma/client';
import { Gender, TUpdateProfileData } from '@/types/account';
import RequestError from '@/server/common/request-error';
import {
  ErrorCodes,
  ErrorMessages,
} from '@/server/common/enums/error-codes.enum';
import { Logger } from '@/server/common/logger';

const logger = new Logger('Account Service');

class AccountService {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async updateUserInfo(userId: string, data: TUpdateProfileData) {
    try {
      await this.db.user.update({
        where: {
          id: userId,
        },
        data: {
          ...data,
          gender: data.gender as Gender,
        },
      });
    } catch (e) {
      logger.error(e);

      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new RequestError({
          code: ErrorCodes.PHONE_ALREADY_EXIST,
          message: ErrorMessages.PHONE_ALREADY_EXIST,
        });
      }
      throw new RequestError({
        code: ErrorCodes.FAILED_TO_UPDATE_USER,
        message: ErrorMessages.FAILED_TO_UPDATE_USER,
      });
    }
  }
}

export default AccountService;
