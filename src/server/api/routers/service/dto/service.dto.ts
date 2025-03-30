import { z } from 'zod';

export const createServiceDto = z.object({
  title: z.string().min(1, 'Назва обвязкова'),
  description: z.string().nullable(),
  price: z.coerce
    .number({ message: 'Тривалість має бути числом' })
    .positive('Ціна має бути додатнім числом'),
  duration: z.coerce
    .number({ message: 'Тривалість має бути числом' })
    .int('Тривалість має бути числом')
    .positive('Тривалість має бути додатнім числом'),
});

export type CreateServiceDto = z.infer<typeof createServiceDto>;

export const updateServiceDto = createServiceDto.partial();
export type UpdateServiceDto = z.infer<typeof updateServiceDto>;
