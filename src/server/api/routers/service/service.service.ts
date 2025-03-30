import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
import ServiceRepository from './service.repository';

class ServiceService {
  private readonly serviceRepository = new ServiceRepository();

  async create(service: CreateServiceDto, organizationId: string) {
    return this.serviceRepository.create(service, organizationId);
  }

  async findAll(organizationId: string) {
    return this.serviceRepository.findAll(organizationId);
  }

  async update(id: string, service: UpdateServiceDto) {
    return this.serviceRepository.update(id, service);
  }

  async delete(id: string) {
    return this.serviceRepository.delete(id);
  }

  async deleteMany(ids: string[]) {
    return this.serviceRepository.deleteMany(ids);
  }
}

export default ServiceService;
