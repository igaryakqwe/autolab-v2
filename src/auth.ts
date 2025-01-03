import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import db from '@/lib/db';
import authConfig from '@/lib/auth.config';
import { getUserById } from '@/server/api/actions/auth-actions';

export const { handlers, signIn, signOut, auth } = NextAuth({
  // TODO: It's crunch, change this during BetterAuth migration
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
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
    async jwt({ token, user, session, trigger }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.middleName = user.middleName;
        token.birthDate = user.birthDate;
        token.gender = user.gender;
        token.phone = user.phone;
      }

      if (trigger === 'update') {
        const dbUser = await getUserById(session.user.id as string);

        if (dbUser) {
          token = dbUser;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.image = token.image as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.middleName = token.middleName as string;
        session.user.birthDate = token.birthDate as string;
        session.user.gender = token.gender as string;
        session.user.phone = token.phone as string;
      }
      return session;
    },
  },
});
