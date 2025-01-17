import { z } from 'zod';

export const organizationSchema = z.object({
  logo: z.string().url().optional(),
  name: z.string().nonempty("Назва організації обов'язкова"),
  description: z.string().optional(),
  address: z.string().optional(),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
});

export type TCreateOrganizationData = z.infer<typeof organizationSchema>;

export interface Organization {
  id: string;
  logo: string | null;
  name: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  userPosition: EmployeeRole;
}

export interface OrganizationCount {
  employeesCount: number;
  servicesCount: number;
  serviceRecordsCount: number;
}

export enum EmployeeRole {
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  TECHNICIAN = 'TECHNICIAN',
}

export type OrganizationInfo = Organization & OrganizationCount;
