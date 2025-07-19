import { z } from 'zod';

export const createClientDto = z.object({
  client: z.object({
    firstName: z.string().min(1, 'Імя обовязкове'),
    lastName: z.string().min(1, 'Призвище обовязкове'),
    middleName: z.string().nullable(),
    phone: z.string().min(1, 'Телефон обовязковий'),
  }),
  userId: z.string().nullable().optional(),
  organizationId: z.string(),
});

export type CreateClientDto = z.infer<typeof createClientDto>;

export const updateClientDto = createClientDto.partial();
export type UpdateClientDto = z.infer<typeof updateClientDto>;
