import db from '@/lib/db';
import { Logger } from '@/server/common/logger';
import { EmployeeRole } from '@/types/organization';

const logger = new Logger('Employee Route');

class EmployeeRepository {
  async getEmployees(organizationId: string) {
    try {
      return await db.employee.findMany({
        where: {
          organizationId,
          isActive: true,
        },
        select: {
          role: true,
          isActive: true,
          user: {
            select: {
              id: true,
              image: true,
              email: true,
              firstName: true,
              lastName: true,
              middleName: true,
              phone: true,
            },
          },
        },
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updateEmployee(employeeId: string, role: EmployeeRole) {
    try {
      return await db.employee.update({
        where: {
          id: employeeId,
        },
        data: {
          role,
        },
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async deleteEmployee(employeeId: string) {
    try {
      return await db.employee.update({
        where: {
          id: employeeId,
        },
        data: {
          isActive: false,
        },
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async deleteEmployees(employeeIds: string[]) {
    try {
      await db.employee.updateMany({
        where: {
          userId: {
            in: employeeIds,
          },
        },
        data: {
          isActive: false,
        },
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getByEmailOrUsername(emailOrUsername: string) {
    try {
      return await db.user.findMany({
        where: {
          OR: [
            { email: emailOrUsername },
            { name: emailOrUsername },
            { phone: emailOrUsername },
          ],
        },
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async inviteEmployee(userId: string, organizationId: string) {
    try {
      return await db.employee.create({
        data: {
          userId,
          organizationId,
          role: EmployeeRole.TECHNICIAN,
          isActive: true,
        },
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

export default EmployeeRepository;
