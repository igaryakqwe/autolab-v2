import db from '@/lib/db';
import { CreateServiceRecordDto } from './service-record.dto';

class ServiceRecordRepository {
  constructor() {}

  private readonly include = {
    services: {
      select: {
        id: true,
        title: true,
        price: true,
      },
    },
    employee: {
      select: {
        user: {
          select: {
            image: true,
            firstName: true,
            lastName: true,
            middleName: true,
            phone: true,
          },
        },
      },
    },
    organization: {
      select: {
        id: true,
        name: true,
        logo: true,
      },
    },
  };

  async getVehicleServiceRecords(vehicleId: string) {
    return db.serviceRecord.findMany({
      where: {
        vehicleId,
      },
      include: this.include,
      orderBy: {
        startTime: 'desc',
      },
    });
  }

  async createServiceRecord(record: CreateServiceRecordDto) {
    return db.serviceRecord.create({
      data: {
        ...record,
        services: {
          connect: record.services.map((serviceId) => ({
            id: serviceId,
          })),
        },
      },
      include: this.include,
    });
  }

  async updateServiceRecord(id: string, record: CreateServiceRecordDto) {
    return db.serviceRecord.update({
      where: {
        id,
      },
      data: {
        ...record,
        services: {
          connect: record.services.map((serviceId) => ({
            id: serviceId,
          })),
        },
      },
      include: this.include,
    });
  }

  async deleteServiceRecord(id: string) {
    return db.serviceRecord.delete({
      where: {
        id,
      },
      include: this.include,
    });
  }
}

export default ServiceRecordRepository;
