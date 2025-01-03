import { CredentialsSignin, type NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from '@/server/api/actions/auth-actions';
import { LoginFormInputs } from '@/types/auth';
import bcrypt from 'bcryptjs';
import { ErrorCodes } from '@/server/common/enums/error-codes.enum';

class CustomAuthError extends CredentialsSignin {
  constructor(code: ErrorCodes) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
  }
}

export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      async authorize(credentials) {
        const { email, password } = credentials as LoginFormInputs;

        const user = await getUserByEmail(email);

        if (!user || !user.password) {
          throw new CustomAuthError(ErrorCodes.INVALID_CREDENTIALS);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          throw new CustomAuthError(ErrorCodes.INVALID_CREDENTIALS);
        }

        if (!user.emailVerified) {
          throw new CustomAuthError(ErrorCodes.USER_NOT_VERIFIED);
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
