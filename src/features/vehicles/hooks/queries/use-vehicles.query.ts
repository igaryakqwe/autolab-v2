import { api } from '@/lib/trpc/client';
import useOrganizationsStore from '@/store/use-organizations-store';

const useVehiclesQuery = () => {
  const { currentOrganization } = useOrganizationsStore();

  const {
    data: vehicles = [],
    isPending,
    error,
  } = api.vehicle.getVehiclesByOrganization.useQuery(
    currentOrganization ?? '',
    {
      enabled: !!currentOrganization,
    },
  );

  return { vehicles, isLoading: isPending, error };
};

export default useVehiclesQuery;
