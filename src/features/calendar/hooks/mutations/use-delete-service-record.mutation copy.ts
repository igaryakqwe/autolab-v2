import { api } from '@/lib/trpc/client';
import { toast } from '@/utils/toast-utils';
import useCalendarDialogStore from '@/features/calendar/stores/use-calendar-dialog.store';

const useDeleteServiceRecordMutation = () => {
  const utils = api.useUtils();
  const setOpenDialog = useCalendarDialogStore((state) => state.setOpen);

  const { mutate, isPending, error } =
    api.serviceRecord.deleteServiceRecord.useMutation({
      onSuccess: async () => {
        toast('Запис успішно видалений').success();
        await utils.serviceRecord.getOrganizationServiceRecords.invalidate();
        await utils.serviceRecord.getVehicleServiceRecords.invalidate();
        setOpenDialog(false);
      },
      onError: () => {
        toast('Помилка видалення запису').error();
      },
    });

  return { deleteServiceRecord: mutate, isDeleting: isPending, error };
};

export default useDeleteServiceRecordMutation;
