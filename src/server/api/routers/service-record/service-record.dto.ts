import { ServiceRecord } from '@/types/models/vehicle';
import { z } from 'zod';

export interface ServiceRecordDto extends Omit<ServiceRecord, 'employee'> {
  employee: {
    user: {
      image: string | null;
      firstName: string | null;
      lastName: string | null;
      middleName: string | null;
      phone: string | null;
    };
  };
}

export const CreateServiceRecordSchema = z.object({
  vehicleId: z.string(),
  employeeId: z.string(),
  organizationId: z.string(),
  services: z.array(z.string()),
  startTime: z.date(),
  endTime: z.date(),
  totalPrice: z.number(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
  notes: z.string().nullable(),
});

export const UpdateServiceRecordSchema = CreateServiceRecordSchema.extend({
  id: z.string(),
});

export type CreateServiceRecordDto = z.infer<typeof CreateServiceRecordSchema>;
export type UpdateServiceRecordDto = z.infer<typeof UpdateServiceRecordSchema>;
