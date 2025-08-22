import { create } from 'zustand';

interface CalendarState {
  currentDate: Date;
}

interface CalendarActions {
  setCurrentDate: (date: Date) => void;
}

const initialState: CalendarState = {
  currentDate: new Date(),
};

const useCalendarStore = create<CalendarState & CalendarActions>((set) => ({
  ...initialState,
  setCurrentDate: (date: Date) => set({ currentDate: date }),
}));

export default useCalendarStore;
