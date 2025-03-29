import EmployeeRepository from '@/server/api/routes/employee/employee.repository';
import EmployeeMapper from '@/server/api/routes/employee/employee.mapper';
import { EmployeeRole } from '@/types/organization';

class EmployeeService {
  private readonly employeeRepository = new EmployeeRepository();
  private readonly employeeMapper = new EmployeeMapper();

  async getEmployees(organizationId: string) {
    const employees =
      await this.employeeRepository.getEmployees(organizationId);
    return this.employeeMapper.mapMany(employees);
  }

  async updateEmployee(employeeId: string, role: EmployeeRole) {
    return await this.employeeRepository.updateEmployee(employeeId, role);
  }

  async deleteEmployee(employeeId: string) {
    return await this.employeeRepository.deleteEmployee(employeeId);
  }

  async deleteEmployees(employeeIds: string[]) {
    await this.employeeRepository.deleteEmployees(employeeIds);
  }
}

export default EmployeeService;
