import { PrismaClient } from '@prisma/client';
import { Logger } from '@/server/common/logger';
import { EmployeeRole, TCreateOrganizationData } from '@/types/organization';
import RequestError from '@/server/common/request-error';
import {
  ErrorCodes,
  ErrorMessages,
} from '@/server/common/enums/error-codes.enum';

const logger = new Logger('Auth Route');

class OrganizationService {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getOrganizationsByUser(userId: string) {
    try {
      return await this.db.organization
        .findMany({
          where: {
            employees: {
              some: {
                userId,
              },
            },
          },
          select: {
            id: true,
            logo: true,
            name: true,
            description: true,
            address: true,
            phone: true,
            email: true,
            website: true,
            _count: {
              select: {
                employees: true,
                services: true,
                serviceRecords: true,
              },
            },
            employees: {
              select: {
                role: true,
                userId: true,
              },
            },
          },
        })
        .then((organizations) =>
          organizations.map((org) => ({
            ...org,
            employeesCount: org._count.employees,
            servicesCount: org._count.services,
            serviceRecordsCount: org._count.serviceRecords,
            userPosition: org.employees.find((emp) => emp.userId === userId)
              ?.role as EmployeeRole,
          })),
        );
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async createOrganization(data: TCreateOrganizationData, userId: string) {
    try {
      return await this.db.organization
        .create({
          data: {
            ...data,
            employees: {
              create: {
                role: 'OWNER',
                user: {
                  connect: {
                    id: userId,
                  },
                },
              },
            },
          },
          select: {
            id: true,
            logo: true,
            name: true,
            description: true,
            address: true,
            phone: true,
            email: true,
            website: true,
            _count: {
              select: {
                employees: true,
                services: true,
                serviceRecords: true,
              },
            },
            employees: {
              select: {
                role: true,
                userId: true,
              },
            },
          },
        })
        .then((organization) => ({
          ...organization,
          employeesCount: organization._count.employees,
          servicesCount: organization._count.services,
          serviceRecordsCount: organization._count.serviceRecords,
          userPosition: organization.employees.find(
            (emp) => emp.userId === userId,
          )?.role as EmployeeRole,
        }));
    } catch (error) {
      logger.error(error);
      throw new RequestError({
        code: ErrorCodes.FAILED_TO_CREATE_ORGANIZATION,
        message: ErrorMessages.FAILED_TO_CREATE_ORGANIZATION,
      });
    }
  }

  async getOrganizationById(organizationId: string) {
    try {
      return await this.db.organization.findUnique({
        where: {
          id: organizationId,
        },
        select: {
          id: true,
          logo: true,
          name: true,
          description: true,
          address: true,
          phone: true,
          email: true,
          website: true,
        },
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getOrganizationEmployees(organizationId: string) {
    try {
      return await this.db.organization
        .findUnique({
          where: {
            id: organizationId,
          },
          select: {
            employees: {
              select: {
                role: true,
                user: {
                  select: {
                    id: true,
                    image: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    middleName: true,
                  },
                },
              },
            },
          },
        })
        .then((organization) =>
          organization?.employees.map((emp) => ({
            ...emp.user,
            role: emp.role,
          })),
        );
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

export default OrganizationService;
