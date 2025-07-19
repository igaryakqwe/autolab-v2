import { MakeDto } from '@/server/api/routers/vehicle/dto/vehicle.dto';

class VehicleMapper {
  private mapMake(make: MakeDto) {
    return {
      value: make.value,
      label: make.name,
    };
  }

  public mapMakes(makes: MakeDto[]) {
    return makes.map((make) => this.mapMake(make));
  }

  public mapModels(models: MakeDto[]) {
    return models.map((model) => this.mapMake(model));
  }
}

export default VehicleMapper;
