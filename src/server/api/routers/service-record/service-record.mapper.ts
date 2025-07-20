import { ServiceRecordDto } from '@/server/api/routers/service-record/service-record.dto';

class ServiceRecordMapper {
  public mapServiceRecords(records: ServiceRecordDto[]) {
    return records.map((record) => this.mapServiceRecord(record));
  }

  public mapServiceRecord(record: ServiceRecordDto) {
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

export default ServiceRecordMapper;
