import { CreateClientDto } from '@/server/api/routers/client/dto/client.dto';
import db from '@/lib/db';

class ClientRepository {
  async create(client: CreateClientDto) {
    const { organizationId, userId, client: clientData } = client;
    return await db.client.create({
      data: {
        ...clientData,
        createdAt: new Date(),
        updatedAt: new Date(),
        organization: {
          connect: {
            id: organizationId,
          },
        },
        ...(userId && {
          user: {
            connect: { id: userId ?? null },
          },
        }),
      },
    });
  }

  async findAll(organizationId: string) {
    return await db.client.findMany({
      where: { organizationId },
    });
  }

  async update(id: string, client: CreateClientDto) {
    return await db.client.update({
      where: { id },
      data: client,
    });
  }

  async delete(id: string) {
    return await db.client.delete({
      where: { id },
    });
  }
}

export default ClientRepository;
