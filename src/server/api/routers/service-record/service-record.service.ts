import ServiceRecordRepository from '@/server/api/routers/service-record/service-record.repository';
import ServiceRecordMapper from '@/server/api/routers/service-record/service-record.mapper';
import {
  CreateServiceRecordDto,
  UpdateServiceRecordDto,
} from './service-record.dto';

const serviceRecordRepository = new ServiceRecordRepository();
const serviceRecordMapper = new ServiceRecordMapper();

class ServiceRecordService {
  public async getVehicleServiceRecords(vehicleId: string) {
    const records =
      await serviceRecordRepository.getVehicleServiceRecords(vehicleId);
    if (!records) return [];
    return serviceRecordMapper.mapServiceRecords(records);
  }

  public async getOrganizationServiceRecords(organizationId: string) {
    const records =
      await serviceRecordRepository.getOrganizationServiceRecords(
        organizationId,
      );
    const serviceRecords = records.map((record) => ({
      ...record,
      services: record.services.map((service) => service.id),
    }));
    return serviceRecords;
  }

  public async createServiceRecord(record: CreateServiceRecordDto) {
    const serviceRecord =
      await serviceRecordRepository.createServiceRecord(record);
    if (!serviceRecord) return null;
    return serviceRecordMapper.mapServiceRecord(serviceRecord);
  }

  public async updateServiceRecord(record: UpdateServiceRecordDto) {
    const serviceRecord =
      await serviceRecordRepository.updateServiceRecord(record);
    if (!serviceRecord) return null;
    return serviceRecordMapper.mapServiceRecord(serviceRecord);
  }

  public async deleteServiceRecord(id: string) {
    const serviceRecord = await serviceRecordRepository.deleteServiceRecord(id);
    if (!serviceRecord) return null;
    return serviceRecordMapper.mapServiceRecord(serviceRecord);
  }
}

export default ServiceRecordService;
