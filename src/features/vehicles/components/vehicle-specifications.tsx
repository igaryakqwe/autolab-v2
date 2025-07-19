import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Car } from 'lucide-react';

export const vehicle: VehicleSpecificationsProps = {
  make: 'Chevrolet',
  model: 'Malibu',
  year: 2021,
  licensePlate: 'АА1234ВВ',
  vin: '1G1ZD5ST5MF123456',
  engine: '1.5L Turbo',
  engineVolume: 1.5,
  bodyStyle: 'Седан',
};

export type VehicleSpecificationsProps = {
  make: string;
  model: string;
  year: number;
  bodyStyle?: string;
  engine?: string;
  engineVolume?: number;
  licensePlate?: string;
  vin?: string;
};

const VehicleSpecifications = () => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Car className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Технічні характеристики
        </CardTitle>
        <CardDescription>Технічні деталі та ідентифікація</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Марка і модель
              </p>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {vehicle.make} {vehicle.model}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Рік випуску
              </p>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {vehicle.year}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Тип кузова
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {vehicle.bodyStyle || 'Не вказано'}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Двигун
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {vehicle.engine || 'Не вказано'}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Об&apos;єм двигуна
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {vehicle.engineVolume
                  ? `${vehicle.engineVolume}л`
                  : 'Не вказано'}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Номерний знак
              </p>
              <p className="text-sm font-mono text-slate-700 dark:text-slate-300">
                {vehicle.licensePlate || 'Не вказано'}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Ідентифікаційний номер транспортного засобу
          </p>
          <p className="text-sm font-mono bg-slate-100 dark:bg-slate-800 p-3 rounded-lg border">
            {vehicle.vin || 'Не вказано'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleSpecifications;
