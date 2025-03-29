import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { fillProfileSchema } from '@/types/account';
import AccountService from '@/server/api/routers/account/account.service';

const accountRoute = createTRPCRouter({
  updateUserInfo: protectedProcedure
    .input(fillProfileSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(ctx.session);
      const accountService = new AccountService(ctx.db);
      await accountService.updateUserInfo(ctx.session.user.id as string, input);
    }),
});

export default accountRoute;
