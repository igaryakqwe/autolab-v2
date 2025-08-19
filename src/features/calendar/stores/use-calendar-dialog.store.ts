import { create } from 'zustand';

interface UseCalendarDialogStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const useCalendarDialogStore = create<UseCalendarDialogStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

export default useCalendarDialogStore;
