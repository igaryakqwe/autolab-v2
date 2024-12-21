import { createCallerFactory, createTRPCRouter } from './trpc';
import authRoute from '@/trpc/auth-route';

export const appRouter = createTRPCRouter({
  auth: authRoute,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
