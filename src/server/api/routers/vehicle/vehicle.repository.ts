import { env } from '@/lib/env';
import { handleAPIResponse } from '@/utils/api.utils';
import {
  CreateVehicleDto,
  MakeDtoSchema,
  UpdateVehicleDto,
} from './dto/vehicle.dto';
import db from '@/lib/db';
import { TRPCError } from '@trpc/server';

const API_URL = env.AUTORIA_API_URL;
const API_KEY = env.AUTORIA_API_KEY;

class VehicleRepository {
  private readonly categoryId = 1;
  async getAllMakes() {
    const res = await fetch(
      `${API_URL}/auto/categories/${this.categoryId}/marks?api_key=${API_KEY}`,
    );

    const data = handleAPIResponse(res, MakeDtoSchema.array());
    return data;
  }

  async getModels(makeId?: number) {
    try {
      let res;

      if (makeId) {
        res = await fetch(
          `${API_URL}/auto/categories/${this.categoryId}/marks/${makeId}/models?api_key=${API_KEY}`,
        );
      } else {
        res = await fetch(
          `${API_URL}/auto/categories/${this.categoryId}/models?api_key=${API_KEY}`,
        );
      }

      if (!res.ok) {
        const error = await res.json();
        console.log(error);
        throw new Error(error);
      }

      const data = handleAPIResponse(res, MakeDtoSchema.array());
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        });
      }
    }
  }

  async getVehicleById(id: string) {
    return db.vehicle.findFirst({
      where: {
        id,
      },
    });
  }

  async getVehiclesByOrganization(organizationId: string) {
    return db.vehicle.findMany({
      where: {
        ServiceRecord: {
          some: {
            organizationId,
          },
        },
      },
    });
  }

  async createVehicle(vehicle: CreateVehicleDto) {
    return db.vehicle.create({
      data: {
        type: 'CAR',
        ...vehicle,
      },
    });
  }

  async updateVehicle(vehicle: UpdateVehicleDto) {
    if (!vehicle?.id) {
      throw new Error('Vehicle id is required');
    }

    return db.vehicle.update({
      where: {
        id: vehicle.id,
      },
      data: vehicle,
    });
  }

  async deleteVehicle(id: string) {
    return db.vehicle.delete({
      where: {
        id,
      },
    });
  }

  async getVehiclesByClient(clientId: string) {
    return db.vehicle.findMany({
      where: {
        clientId,
      },
    });
  }

  async getVehiclesByUser(userId: string) {
    return db.vehicle.findMany({
      where: {
        userId,
      },
    });
  }
}

export default VehicleRepository;
