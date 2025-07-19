import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import LicencePlate from '@/features/vehicles/components/licence-plate';

export const vehicle: VehicleHeaderProps = {
  make: 'Chevrolet',
  model: 'Malibu',
  year: 2021,
  licensePlate: 'АА1234ВВ',
  type: 'АВТОМОБІЛЬ',
  logoSrc: '/icons/chevrolet.svg',
};

export type VehicleHeaderProps = {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  type: string;
  logoSrc: string;
};

const VehicleHeader = () => {
  return (
    <div className="mb-4">
      <div className="flex items-center flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Image
            src={vehicle.logoSrc}
            alt={`Логотип ${vehicle.make}`}
            width={75}
            height={75}
            className="rounded-lg bg-white p-2 shadow-sm border"
          />
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <div className="flex items-center gap-4 mt-1">
              {vehicle.licensePlate && (
                <LicencePlate plateNumber={vehicle.licensePlate} />
              )}
              <Badge variant="secondary" className="font-medium">
                {vehicle.type}
              </Badge>
            </div>
          </div>
        </div>
        <div className="ml-auto">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Settings className="h-4 w-4" />
            Керувати
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleHeader;
