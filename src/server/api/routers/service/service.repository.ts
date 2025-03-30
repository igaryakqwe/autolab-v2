import db from '@/lib/db';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

class ServiceRepository {
  private readonly include = {
    id: true,
    title: true,
    description: true,
    price: true,
    duration: true,
  };

  async create(service: CreateServiceDto, organizationId: string) {
    return db.service.create({
      data: {
        ...service,
        organizationId,
      },
      select: this.include,
    });
  }

  async findAll(organizationId: string) {
    return db.service.findMany({
      where: { organizationId },
      select: this.include,
    });
  }

  async update(id: string, service: UpdateServiceDto) {
    return db.service.update({
      where: { id },
      data: service,
      select: this.include,
    });
  }

  async delete(id: string) {
    return db.service.delete({
      where: { id },
    });
  }

  async deleteMany(ids: string[]) {
    return db.service.deleteMany({
      where: { id: { in: ids } },
    });
  }
}

export default ServiceRepository;
