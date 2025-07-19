import { api } from '@/lib/trpc/client';

const useVehicleQuery = (vehicleId: string) => {
  const { data, isLoading, error } = api.vehicle.getVehicleById.useQuery(
    vehicleId,
    {
      enabled: !!vehicleId,
    },
  );

  return { vehicle: data, isLoading, error };
};

export default useVehicleQuery;
