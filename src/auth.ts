import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import db from '@/lib/db';
import authConfig from '@/lib/auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
  session: { strategy: 'jwt' },
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') return true;

      const dbUser = await db.user.findUnique({
        where: {
          email: user.email as string,
        },
      });

      if (!dbUser?.emailVerified) {
        return false;
      }

      return true;
    },
  },
});
