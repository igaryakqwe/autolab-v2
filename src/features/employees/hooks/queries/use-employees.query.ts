import { api } from '@/lib/trpc/client';

const useEmployeesQuery = (organizationId: string) => {
  const {
    data = [],
    isLoading,
    error,
  } = api.employee.getAll.useQuery(organizationId, {
    enabled: !!organizationId,
  });

  return {
    employees: data,
    isLoading,
    error,
  };
};

export default useEmployeesQuery;
