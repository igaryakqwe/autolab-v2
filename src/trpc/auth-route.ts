import { createTRPCRouter, publicProcedure } from '@/lib/trpc/trpc';

const authRoute = createTRPCRouter({
  getUsers: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany();
  }),
});

export default authRoute;
