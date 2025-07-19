import {
  MakeDto,
  ServiceRecordDto,
} from '@/server/api/routers/vehicle/dto/vehicle.dto';

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

  public mapServiceRecords(records: ServiceRecordDto[]) {
    return records.map((record) => this.mapServiceRecord(record));
  }

  private mapServiceRecord(record: ServiceRecordDto) {
    return {
      ...record,
      employee: {
        firstName: record.employee.user.firstName,
        lastName: record.employee.user.lastName,
        middleName: record.employee.user.middleName,
        phone: record.employee.user.phone,
      },
    };
  }
}

export default VehicleMapper;
