import VehiclePage from '@/features/vehicles/vehicle.page';

interface VehicleProps {
  params: {
    vehicleId: string;
  };
}

const Vehicle = ({ params }: VehicleProps) => {
  const { vehicleId } = params;
  console.log(vehicleId);
  return <VehiclePage />;
};

export default Vehicle;
