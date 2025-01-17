import { EmployeeRole } from '@/types/organization';

export const roleMapper: Record<EmployeeRole, string> = {
  OWNER: 'Власник',
  MANAGER: 'Менеджер',
  TECHNICIAN: 'Працівник',
};
