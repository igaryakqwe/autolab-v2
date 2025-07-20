import { api } from '@/lib/trpc/client';

const useVehicleServiceRecordsQuery = (vehicleId: string) => {
  const {
    data = [],
    isLoading,
    error,
  } = api.serviceRecord.getVehicleServiceRecords.useQuery(vehicleId, {
    enabled: !!vehicleId,
  });

  return { serviceRecords: data, isLoading, error };
};

export default useVehicleServiceRecordsQuery;
