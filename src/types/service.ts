import { z } from 'zod';

export const ServiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  duration: z.number(),
});

export type Service = z.infer<typeof ServiceSchema>;
