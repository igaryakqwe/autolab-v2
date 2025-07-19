import { z } from 'zod';

export const VehicleShema = z.object({
  id: z.string(),
  make: z.string().min(1, {
    message: 'Вкажіть марку автомобіля',
  }),
  model: z.string().min(1, {
    message: 'Вкажіть модель автомобіля',
  }),
  year: z.number(),
  vin: z.string().nullable(),
  bodyStyle: z.string().nullable(),
  licensePlate: z.string().min(8).max(8).nullable(),
  engine: z.string().nullable(),
  engineVolume: z.number().nullable(),
  notes: z.string().nullable(),
  clientId: z.string().nullable(),
  userId: z.string().nullable(),
});

export type Vehicle = z.infer<typeof VehicleShema>;
