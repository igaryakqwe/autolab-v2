import { UpdateServiceRecordDto } from '@/server/api/routers/service-record/service-record.dto';
import { create } from 'zustand';

interface UseCalendarDialogState {
  isEdit: boolean;
  open: boolean;
  initialValues: UpdateServiceRecordDto | undefined;
}

interface UseCalendarDialogActions {
  setOpen: (open: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
  setInitialValues: (initialValues: UpdateServiceRecordDto | undefined) => void;
}

const initialState: UseCalendarDialogState = {
  isEdit: false,
  open: false,
  initialValues: undefined,
};

const useCalendarDialogStore = create<
  UseCalendarDialogState & UseCalendarDialogActions
>((set) => ({
  ...initialState,
  setOpen: (open: boolean) => set({ open }),
  setIsEdit: (isEdit: boolean) => set({ isEdit }),
  setInitialValues: (initialValues: UpdateServiceRecordDto | undefined) =>
    set({ initialValues }),
}));

export default useCalendarDialogStore;
