import SvgIcon from '@/components/icons/svg-icon';
import { Button } from '@/components/ui/button';
import { CarFrontIcon, Settings } from 'lucide-react';
import LicencePlate from '@/features/vehicles/components/licence-plate';
import { getVehicleImage } from '../lib/utils';

export type VehicleHeaderProps = {
  make: string;
  model: string;
  licensePlate: string | null;
};

const VehicleHeader = ({ make, model, licensePlate }: VehicleHeaderProps) => {
  return (
    <div className="mb-2">
      <div className="flex items-center flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-white p-2 shadow-sm border w-[75px] h-[75px] flex items-center justify-center">
            <SvgIcon
              src={getVehicleImage(make)}
              className="h-12 w-12"
              fallback={<CarFrontIcon className="h-10 w-10" />}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {make} {model}
            </h1>
            <div className="flex items-center gap-4 mt-1">
              {licensePlate && <LicencePlate plateNumber={licensePlate} />}
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
