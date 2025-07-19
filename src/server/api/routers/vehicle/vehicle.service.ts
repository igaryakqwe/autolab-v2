import VehicleRepository from '@/server/api/routers/vehicle/vehicle.repository';
import {
  CreateVehicleDto,
  UpdateVehicleDto,
} from '@/server/api/routers/vehicle/dto/vehicle.dto';
import VehicleMapper from '@/server/api/routers/vehicle/vehicle.mapper';

class VehicleService {
  private readonly vehicleRepository = new VehicleRepository();
  private readonly vehicleMapper = new VehicleMapper();

  public async getAllMakes() {
    const makes = await this.vehicleRepository.getAllMakes();
    return this.vehicleMapper.mapMakes(makes);
  }

  public async getModels(makeId?: number) {
    const models = await this.vehicleRepository.getModels(makeId);
    if (!models) return [];
    return this.vehicleMapper.mapModels(models);
  }

  public async getVehicleById(id: string) {
    return this.vehicleRepository.getVehicleById(id);
  }

  public async getVehicleServiceRecords(vehicleId: string) {
    const records =
      await this.vehicleRepository.getVehicleServiceRecords(vehicleId);
    if (!records) return [];
    return this.vehicleMapper.mapServiceRecords(records);
  }

  public async getVehiclesByOrganization(organizationId: string) {
    return this.vehicleRepository.getVehiclesByOrganization(organizationId);
  }

  public async createVehicle(data: CreateVehicleDto) {
    return this.vehicleRepository.createVehicle(data);
  }

  public async updateVehicle(data: UpdateVehicleDto) {
    return this.vehicleRepository.updateVehicle(data);
  }

  public async getVehiclesByClient(clientId: string) {
    return this.vehicleRepository.getVehiclesByClient(clientId);
  }

  public async getVehiclesByUser(userId: string) {
    return this.vehicleRepository.getVehiclesByUser(userId);
  }

  public async deleteVehicle(id: string) {
    return this.vehicleRepository.deleteVehicle(id);
  }
}

export default VehicleService;
