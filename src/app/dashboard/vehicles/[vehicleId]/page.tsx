import VehiclePage from '@/features/vehicles/vehicle.page';
import { HydrateClient, trpc } from '@/lib/trpc/server';

interface VehicleProps {
  params: {
    vehicleId: string;
  };
}

const Vehicle = async ({ params }: VehicleProps) => {
  const { vehicleId } = params;

  await trpc.vehicle.getVehicleById.prefetch(vehicleId);
  await trpc.serviceRecord.getVehicleServiceRecords.prefetch(vehicleId);

  return (
    <HydrateClient>
      <VehiclePage vehicleId={vehicleId} />
    </HydrateClient>
  );
};

export default Vehicle;
