import authRoute from './routes/auth/auth.route';
import organizationRoute from './routes/organization/organization.route';
import { createCallerFactory, createTRPCRouter } from './trpc';
import accountRoute from '@/server/api/routes/account/account.route';
import employeeRoute from '@/server/api/routes/employee/employee.route';

export const appRouter = createTRPCRouter({
  auth: authRoute,
  account: accountRoute,
  organization: organizationRoute,
  employee: employeeRoute,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
