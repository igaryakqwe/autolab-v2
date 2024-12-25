import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from '@/server/api/actions/auth-actions';
import { LoginFormInputs } from '@/types/auth';
import bcrypt from 'bcryptjs';

export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as LoginFormInputs;

        const user = await getUserByEmail(email);

        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          throw new Error('Invalid credentials');
        }

        if (!user.emailVerified) {
          throw new Error('Email is not verified');
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
