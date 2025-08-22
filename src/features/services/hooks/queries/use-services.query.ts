import { api } from '@/lib/trpc/client';

const useServicesQuery = (organizationId: string) => {
  const {
    data: services = [],
    isLoading,
    error,
  } = api.service.findAll.useQuery(organizationId);

  return { services, isLoading, error };
};

export default useServicesQuery;
