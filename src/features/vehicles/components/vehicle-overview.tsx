import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Car, User, Phone, Calendar, Fuel } from 'lucide-react';
import LicencePlate from '@/features/vehicles/components/licence-plate';
import { VehicleFormValues } from '@/features/vehicles/lib/types';
import useCreateVehicleMutation from '@/features/vehicles/hooks/mutations/use-create-vehicle.mutation';
import { Client } from '@/types/client';
import { Button } from '@/components/ui/button';

interface OverviewCardProps {
  client: Client | null;
  vehicle: VehicleFormValues | null;
  className?: string;
}

const VehicleOverview = ({ client, vehicle, className }: OverviewCardProps) => {
  const { createVehicle, isCreating } = useCreateVehicleMutation();

  const handleCreateVehicle = () => {
    if (!client || !vehicle) {
      return;
    }
    createVehicle({
      ...vehicle,
      clientId: client?.id,
      userId: null,
    });
  };

  if (!client || !vehicle) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className={className}>
        <CardContent className="flex flex-col gap-4 pt-6 text-sm md:text-base">
          <VehicleInfo vehicle={vehicle} />
          <Separator />
          <ClientInfo client={client} />
        </CardContent>
      </Card>
      <Button
        className="self-end"
        isLoading={isCreating}
        onClick={handleCreateVehicle}
        disabled={isCreating}
      >
        Створити
      </Button>
    </div>
  );
};

export default VehicleOverview;

const VehicleInfo = ({ vehicle }: { vehicle: VehicleFormValues }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Car className="h-4 w-4 text-muted-foreground font-medium" />
        <h3 className="font-semibold text-sm md:text-base">
          Інформація про транспорт
        </h3>
      </div>
      <div className="grid gap-3 pl-6">
        <div className="flex justify-between">
          <span className="text-muted-foreground font-medium text-sm md:text-md">
            Марка та модель:
          </span>
          <span className="font-medium text-sm md:text-base">
            {vehicle?.make && vehicle?.model
              ? `${vehicle.make} ${vehicle.model}`
              : vehicle?.make || 'Не вказано'}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground font-medium text-sm md:text-md">
            Державний номер:
          </span>
          <div className="flex items-center gap-1">
            {vehicle?.licensePlate ? (
              <LicencePlate plateNumber={vehicle.licensePlate} />
            ) : (
              <span className="font-medium text-sm md:text-base">
                Не вказано
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground font-medium text-sm md:text-md">
            Рік випуску:
          </span>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className="font-medium text-sm md:text-base">
              {vehicle?.year || 'Не вказано'}
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground font-medium text-sm md:text-md">
            Тип кузова:
          </span>
          <Badge variant="secondary" className="text-xs md:text-sm">
            {vehicle?.bodyStyle || 'Не вказано'}
          </Badge>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground font-medium text-sm md:text-md">
            Двигун:
          </span>
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4" />
            <span className="font-medium text-sm md:text-base">
              {vehicle?.engine || 'Не вказано'}
              {vehicle?.engineVolume && ` (${vehicle.engineVolume}л)`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientInfo = ({ client }: { client: Client }) => {
  const fullName = [client?.lastName, client?.firstName, client?.middleName]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-muted-foreground font-medium" />
        <h3 className="font-semibold text-sm md:text-base">
          Інформація про клієнта
        </h3>
      </div>
      <div className="grid gap-2 pl-6">
        <div className="flex justify-between">
          <span className="text-muted-foreground font-medium text-sm md:text-md">
            Повне імʼя:
          </span>
          <span className="font-medium text-sm md:text-base text-end">
            {fullName || 'Не вказано'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground font-medium text-sm md:text-md">
            Телефон:
          </span>
          <div className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <span className="font-medium text-sm md:text-base">
              {client?.phone || 'Не вказано'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
