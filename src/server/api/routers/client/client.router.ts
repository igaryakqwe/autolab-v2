import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import ClientService from '@/server/api/routers/client/client.service';
import { createClientDto } from '@/server/api/routers/client/dto/client.dto';
import { z } from 'zod';

const clientService = new ClientService();

const clientRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createClientDto)
    .mutation(async ({ input }) => {
      return await clientService.create(input);
    }),
  findAll: protectedProcedure.input(z.string()).query(async ({ input }) => {
    return await clientService.findAll(input);
  }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        client: createClientDto,
      }),
    )
    .mutation(async ({ input }) => {
      const { id, client } = input;
      return await clientService.update(id, client);
    }),
  delete: protectedProcedure.input(z.string()).mutation(async ({ input }) => {
    return await clientService.delete(input);
  }),
});

export default clientRouter;
