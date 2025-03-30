import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { createServiceDto, updateServiceDto } from './dto/service.dto';
import ServiceService from './service.service';
import { z } from 'zod';

const serviceService = new ServiceService();

const serviceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        service: createServiceDto,
        organizationId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { service, organizationId } = input;
      return serviceService.create(service, organizationId);
    }),
  findAll: protectedProcedure.input(z.string()).query(async ({ input }) => {
    return serviceService.findAll(input);
  }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        service: updateServiceDto,
      }),
    )
    .mutation(async ({ input }) => {
      const { id, service } = input;
      return serviceService.update(id, service);
    }),
  delete: protectedProcedure.input(z.string()).mutation(async ({ input }) => {
    return serviceService.delete(input);
  }),
  deleteMany: protectedProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      return serviceService.deleteMany(input);
    }),
});

export default serviceRouter;
