import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import db from '@/lib/db';
import authConfig from '@/lib/auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') return true;

      const verificationToken = await db.verificationToken.findFirst({
        where: {
          email: user.email as string,
        },
      });

      if (!verificationToken) {
        return false;
      }

      return true;
    },
  },
});
