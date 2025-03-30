import { api } from "@/lib/trpc/client";

const useServicesQuery = (organizationId: string) => {
  const { data, isLoading, error } = api.service.findAll.useQuery(organizationId);

  return { data, isLoading, error };
};

export default useServicesQuery;
