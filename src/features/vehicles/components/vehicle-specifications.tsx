import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CarIcon } from 'lucide-react';
import LicencePlate from '@/features/vehicles/components/licence-plate';
import SectionHeader from '@/components/section-header';

export type VehicleSpecificationsProps = {
  make: string;
  model: string;
  year: number;
  licensePlate: string | null;
  engine: string | null;
  engineVolume: number | null;
  bodyStyle: string | null;
  vin: string | null;
};

const VehicleSpecifications = ({
  make,
  model,
  year,
  licensePlate,
  engine,
  engineVolume,
  bodyStyle,
  vin,
}: VehicleSpecificationsProps) => {
  return (
    <Card>
      <SectionHeader
        title="Технічні характеристики"
        description="Технічні деталі та ідентифікація"
        icon={
          <div className="p-2 bg-blue-100 rounded-lg">
            <CarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
        }
      />

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Марка і модель
              </p>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {make} {model}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Рік випуску
              </p>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {year}
              </p>
            </div>
            <div>
              <p className="text-xs mb-1 font-semibold text-muted-foreground uppercase tracking-wide">
                Номерний знак
              </p>
              <LicencePlate plateNumber={licensePlate ?? ''} />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Двигун
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {engine || 'Не вказано'}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Об&apos;єм двигуна
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {engineVolume ? `${engineVolume.toFixed(1)} л` : 'Не вказано'}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Тип кузова
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {bodyStyle ?? 'Не вказано'}
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
            {vin || 'Не вказано'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleSpecifications;
