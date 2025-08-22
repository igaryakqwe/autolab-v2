import { api } from '@/lib/trpc/client';
import { toast } from '@/utils/toast-utils';
import useCalendarDialogStore from '@/features/calendar/stores/use-calendar-dialog.store';

const useUpdateServiceRecordMutation = () => {
  const utils = api.useUtils();
  const setOpenDialog = useCalendarDialogStore((state) => state.setOpen);
  const setIsEdit = useCalendarDialogStore((state) => state.setIsEdit);

  const { mutate, isPending, error } =
    api.serviceRecord.updateServiceRecord.useMutation({
      async onMutate(updatedRecord) {
        const previousOrgRecords =
          utils.serviceRecord.getOrganizationServiceRecords.getData();

        utils.serviceRecord.getOrganizationServiceRecords.setData(
          updatedRecord.organizationId!,
          (old) => {
            if (!old) return old;
            return old.map((record) =>
              record.id === updatedRecord.id
                ? { ...record, ...updatedRecord }
                : record,
            );
          },
        );
        return { previousOrgRecords };
      },
      onSuccess: async () => {
        toast('Запис успішно оновлено').success();
        setOpenDialog(false);
      },
      onError: (err, variables, context) => {
        if (context?.previousOrgRecords) {
          utils.serviceRecord.getOrganizationServiceRecords.setData(
            variables.organizationId!,
            context.previousOrgRecords,
          );
        }
        toast('Помилка оновлення запису').error();
      },
      onSettled: () => {
        void utils.serviceRecord.getOrganizationServiceRecords.invalidate();
        void utils.serviceRecord.getVehicleServiceRecords.invalidate();
        setIsEdit(false);
      },
    });

  return { updateServiceRecord: mutate, isUpdating: isPending, error };
};

export default useUpdateServiceRecordMutation;
