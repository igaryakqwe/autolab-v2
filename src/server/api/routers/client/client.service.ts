import { CreateClientDto } from '@/server/api/routers/client/dto/client.dto';
import ClientRepository from '@/server/api/routers/client/client.repository';

class ClientService {
  private readonly clientRepository = new ClientRepository();

  async create(client: CreateClientDto) {
    return await this.clientRepository.create(client);
  }

  async findAll(organizationId: string) {
    return await this.clientRepository.findAll(organizationId);
  }

  async update(id: string, client: CreateClientDto) {
    return await this.clientRepository.update(id, client);
  }

  async delete(id: string) {
    return await this.clientRepository.delete(id);
  }
}

export default ClientService;
