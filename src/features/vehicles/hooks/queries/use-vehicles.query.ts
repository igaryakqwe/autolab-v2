import { api } from '@/lib/trpc/client';

const useVehiclesQuery = (organizationId: string) => {
  const {
    data: vehicles = [],
    isPending,
    error,
  } = api.vehicle.getVehiclesByOrganization.useQuery(organizationId, {
    enabled: !!organizationId,
  });

  return { vehicles, isLoading: isPending, error };
};

export default useVehiclesQuery;
