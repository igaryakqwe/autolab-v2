import authRouter from '@/server/api/routers/auth/auth.router';
import organizationRouter from '@/server/api/routers/organization/organization.router';
import { createCallerFactory, createTRPCRouter } from './trpc';
import employeeRouter from '@/server/api/routers/employee/employee.router';
import accountRouter from '@/server/api/routers/account/account.router';
import serviceRouter from '@/server/api/routers/service/service.router';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  account: accountRouter,
  organization: organizationRouter,
  employee: employeeRouter,
  service: serviceRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
