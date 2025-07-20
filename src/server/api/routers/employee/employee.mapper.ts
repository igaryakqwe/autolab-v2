import { Employee } from '@/types/employee';

interface InitialEmployee {
  role: string;
  isActive: boolean;
  user: {
    id: string;
    image: string | null;
    email: string;
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
    phone: string | null;
  };
}

class EmployeeMapper {
  mapMany(employees: InitialEmployee[]): Employee[] {
    return employees.map((employee) => this.getOne(employee));
  }

  getOne(employee: InitialEmployee): Employee {
    return {
      id: employee.user.id,
      image: employee.user.image,
      email: employee.user.email,
      phone: employee.user.phone,
      firstName: employee.user.firstName,
      lastName: employee.user.lastName,
      middleName: employee.user.middleName,
      role: employee.role,
      isActive: employee.isActive,
    };
  }
}

export default EmployeeMapper;
