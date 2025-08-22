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
  vehicleId: z.string().min(1, 'Вкажіть автомобіль'),
  employeeId: z.string().min(1, 'Вкажіть працівника'),
  organizationId: z.string().min(1, 'Вкажіть організацію'),
  services: z.array(z.string()).min(1, 'Вкажіть послуги'),
  startTime: z.date({ required_error: 'Вкажіть час початку' }),
  endTime: z.date({ required_error: 'Вкажіть час кінця' }),
  totalPrice: z.number().min(0, 'Ціна повинна бути додатнім числом'),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
  notes: z.string().nullable(),
});

export const UpdateServiceRecordSchema = CreateServiceRecordSchema.extend({
  id: z.string(),
}).partial();

export type CreateServiceRecordDto = z.infer<typeof CreateServiceRecordSchema>;
export type UpdateServiceRecordDto = z.infer<typeof UpdateServiceRecordSchema>;
