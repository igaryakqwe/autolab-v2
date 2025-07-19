import { api } from '@/lib/trpc/client';

const useCreateClientMutation = () => {
  const mutation = api.clients.create.useMutation();

  return mutation;
};

export default useCreateClientMutation;
