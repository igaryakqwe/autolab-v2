import { api } from '@/lib/trpc/client';
import { toast } from '@/utils/toast-utils';

const useCreateVehicleMutation = () => {
  const utils = api.useUtils();
  const { mutate, isPending, error } = api.vehicle.createVehicle.useMutation({
    onSuccess: async () => {
      toast('Авто успішно створено');
      await utils.vehicle.getVehiclesByOrganization.invalidate();
    },
    onError: () => {
      toast('Помилка створення авто');
    },
  });

  return {
    createVehicle: mutate,
    isCreating: isPending,
    error,
  };
};

export default useCreateVehicleMutation;
