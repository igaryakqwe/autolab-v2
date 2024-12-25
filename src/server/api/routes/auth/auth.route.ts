import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import {
  approveEmailSchema,
  signUpSchema,
} from '@/server/api/routes/auth/auth.types';
import AuthService from '@/server/api/routes/auth/auth.service';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { emailService } from '@/server/api/routes/email/email.service';

const authRoute = createTRPCRouter({
  register: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      const authService = new AuthService(ctx.db);
      const token = uuid();

      await authService.createUser(input.email, input.password);
      await authService.generateToken(token, input.email);
      await emailService.sendApprovalEmail(input.email, token);
    }),
  sendApprovalEmail: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const authService = new AuthService(ctx.db);
      const token = uuid();

      await authService.generateToken(token, input);
      await emailService.sendApprovalEmail(input, token);
    }),
  approveEmail: publicProcedure
    .input(approveEmailSchema)
    .mutation(async ({ input, ctx }) => {
      const authService = new AuthService(ctx.db);

      await authService.verifyEmail(input.email, input.token);
    }),
});

export default authRoute;
