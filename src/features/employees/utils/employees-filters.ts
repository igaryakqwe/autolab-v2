import { Employee } from '@/types/employee';

export const filterEmployees = (
  employees: Employee[],
  search: string,
  role: string[],
) => {
  return employees.filter((employee) => {
    const matchesSearch = search
      ? employee?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        employee?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        employee?.email?.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesRole =
      role.length > 0 ? role.includes(employee.role ?? '') : true;
    return matchesSearch && matchesRole;
  });
};
