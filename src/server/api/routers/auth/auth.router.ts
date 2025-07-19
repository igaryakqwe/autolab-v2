import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import {
  approveEmailSchema,
  signUpSchema,
} from '@/server/api/routers/auth/auth.types';
import AuthService from '@/server/api/routers/auth/auth.service';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { emailService } from '@/server/api/email/email.service';
import { changePasswordSchema, signInDataSchema } from '@/types/account';

const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      const host = ctx.headers.get('host') || 'unknown';
      const protocol =
        process.env.NODE_ENV === 'development' ? 'http' : 'https';
      const url = `${protocol}://${host}`;
      const authService = new AuthService(ctx.db);
      const token = uuid();

      await authService.createUser(input.email, input.password);
      await authService.generateToken(token, input.email);
      await emailService.sendApprovalEmail(url, input.email, token);
    }),

  sendApprovalEmail: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const host = ctx.headers.get('host') || 'unknown';
      const protocol =
        process.env.NODE_ENV === 'development' ? 'http' : 'https';
      const url = `${protocol}://${host}`;
      const authService = new AuthService(ctx.db);
      const token = uuid();

      await authService.generateToken(token, input);
      await emailService.sendApprovalEmail(url, input, token);
    }),

  approveEmail: publicProcedure
    .input(approveEmailSchema)
    .mutation(async ({ input, ctx }) => {
      const authService = new AuthService(ctx.db);

      console.log(ctx.headers.get('host'));

      await authService.verifyEmail(input.email, input.token);
    }),

  updateSignInData: protectedProcedure
    .input(signInDataSchema)
    .mutation(async ({ input, ctx }) => {
      const authService = new AuthService(ctx.db);
      await authService.updateSignInData(ctx.session.user.id as string, input);
    }),

  updatePassword: protectedProcedure
    .input(changePasswordSchema)
    .mutation(async ({ input, ctx }) => {
      const authService = new AuthService(ctx.db);
      await authService.updatePassword(
        ctx.session.user.id as string,
        input.currentPassword,
        input.newPassword,
      );
    }),
});

export default authRouter;
