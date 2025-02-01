import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import OrganizationService from './organization.service';
import { organizationSchema } from '@/types/organization';
import { z } from 'zod';

const organizationRoute = createTRPCRouter({
  getMy: protectedProcedure.query(async ({ ctx }) => {
    const organizationService = new OrganizationService(ctx.db);
    return await organizationService.getOrganizationsByUser(
      ctx.session.user.id,
    );
  }),

  create: protectedProcedure
    .input(organizationSchema)
    .mutation(async ({ ctx, input }) => {
      const organizationService = new OrganizationService(ctx.db);
      return await organizationService.createOrganization(
        input,
        ctx.session.user.id,
      );
    }),

  getEmployees: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const organizationService = new OrganizationService(ctx.db);
      return await organizationService.getOrganizationEmployees(input);
    }),
});

export default organizationRoute;
