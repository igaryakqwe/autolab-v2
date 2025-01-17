import authRoute from './routes/auth/auth.route';
import organizationRoute from './routes/organization/organization.route';
import { createCallerFactory, createTRPCRouter } from './trpc';
import accountRoute from '@/server/api/routes/account/account.route';

export const appRouter = createTRPCRouter({
  auth: authRoute,
  account: accountRoute,
  organization: organizationRoute,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
