import { api } from '@/lib/trpc/client';

const useClientsQuery = (organizationId: string) => {
  const {
    data: clients = [],
    isLoading,
    error,
  } = api.clients.findAll.useQuery(organizationId);

  return {
    clients,
    isLoading,
    error,
  };
};

export default useClientsQuery;
