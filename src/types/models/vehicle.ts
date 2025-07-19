import { z } from 'zod';
import { ServiceSchema } from '@/types/service';
import { EmployeeSchema } from '@/types/employee';
import { OrganizationSchema } from '@/types/organization';

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

export type ServiceStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export const ServiceRecordSchema = z.object({
  id: z.string(),
  startTime: z.date(),
  endTime: z.date().nullable(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
  notes: z.string().nullable(),
  totalPrice: z.number().nullable(),
  organizationId: z.string().uuid(),
  employeeId: z.string().uuid(),
  vehicleId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  services: z.array(ServiceSchema.pick({ id: true, title: true, price: true })),
  employee: EmployeeSchema.pick({
    image: true,
    firstName: true,
    lastName: true,
    middleName: true,
    phone: true,
  }),
  organization: OrganizationSchema.pick({ id: true, name: true, logo: true }),
});

export type ServiceRecord = z.infer<typeof ServiceRecordSchema>;
