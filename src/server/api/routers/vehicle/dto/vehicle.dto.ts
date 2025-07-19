import { VehicleShema } from '@/types/models/vehicle';
import { z } from 'zod';

export const MakeDtoSchema = z.object({
  name: z.string(),
  value: z.number(),
});

export type MakeDto = z.infer<typeof MakeDtoSchema>;

export const CreateVehicleSchema = z.object({
  make: z.string(),
  model: z.string(),
  year: z.coerce.number(),
  vin: z.string().nullable(),
  bodyStyle: z.string(),
  licensePlate: z.string().min(8).max(8),
  engine: z.string(),
  engineVolume: z.coerce.number().nullable(),
  notes: z.string().nullable().optional(),
  clientId: z.string().nullable(),
  userId: z.string().nullable(),
});

export type CreateVehicleDto = z.infer<typeof CreateVehicleSchema>;

export const UpdateVehicleSchema = VehicleShema.partial();

export type UpdateVehicleDto = z.infer<typeof UpdateVehicleSchema>;
