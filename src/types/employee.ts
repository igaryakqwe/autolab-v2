import { z } from 'zod';

export const EmployeeSchema = z.object({
  id: z.string().uuid(),
  image: z.string().nullable().optional(),
  email: z.string(),
  phone: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  middleName: z.string().nullable(),
  role: z.string().nullable(),
  isActive: z.boolean(),
});

export type Employee = z.infer<typeof EmployeeSchema>;
