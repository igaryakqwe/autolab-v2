import { CreateVehicleDto } from '@/server/api/routers/vehicle/dto/vehicle.dto';

export type VehicleFormValues = Omit<CreateVehicleDto, 'clientId' | 'userId'>;
