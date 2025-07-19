import { api } from '@/lib/trpc/client';

const useModelsQuery = (makeId?: string) => {
  const { data = [] } = api.vehicle.getModels.useQuery(
    makeId ? +makeId : undefined,
  );

  return { models: data };
};

export default useModelsQuery;
