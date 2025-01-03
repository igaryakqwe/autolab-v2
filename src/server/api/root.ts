import authRoute from './routes/auth/auth.route';
import { createCallerFactory, createTRPCRouter } from './trpc';
import accountRoute from '@/server/api/routes/account/account.route';

export const appRouter = createTRPCRouter({
  auth: authRoute,
  account: accountRoute,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
