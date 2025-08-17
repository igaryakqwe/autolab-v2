import { ServiceStatus, Vehicle } from '@/types/models/vehicle';

export type CalendarView = 'month' | 'week' | 'day' | 'agenda';

export interface CalendarEvent {
  id: string;
  startTime: Date;
  endTime: Date;
  status: ServiceStatus;
  totalPrice: number;
  vehicle: Pick<Vehicle, 'id' | 'make' | 'model' | 'licensePlate'>;
}

export type EventColor =
  | 'sky'
  | 'amber'
  | 'violet'
  | 'rose'
  | 'emerald'
  | 'orange';
