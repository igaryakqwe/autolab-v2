import { api } from '@/lib/trpc/client';
import { toast } from '@/utils/toast-utils';
import useCalendarDialogStore from '@/features/calendar/stores/use-calendar-dialog.store';

const useCreateServiceRecordMutation = () => {
  const utils = api.useUtils();
  const setOpenDialog = useCalendarDialogStore((state) => state.setOpen);

  const { mutate, isPending, error } =
    api.serviceRecord.createServiceRecord.useMutation({
      onSuccess: async () => {
        toast('Запис успішно створений').success();
        await utils.serviceRecord.getOrganizationServiceRecords.invalidate();
        await utils.serviceRecord.getVehicleServiceRecords.invalidate();
        setOpenDialog(false);
      },
      onError: () => {
        toast('Помилка створення запису').error();
      },
    });

  return { createServiceRecord: mutate, isCreating: isPending, error };
};

export default useCreateServiceRecordMutation;
