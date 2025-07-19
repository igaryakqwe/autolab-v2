import { create } from 'zustand/react';
import { VehicleFormValues } from '../lib/types';
import { Client } from '@/types/client';

interface VehicleFormStore {
  step: number;
  setStep: (step: number) => void;
  vehicle: VehicleFormValues | null;
  setVehicle: (vehicle: VehicleFormValues) => void;
  client: Client | null;
  setClient: (client: Client) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  reset: () => void;
}

export const initialVehicleFormState = {
  step: 1,
  vehicle: null,
  client: null,
  isLoading: false,
};

const useVehicleFormStore = create<VehicleFormStore>((set) => ({
  ...initialVehicleFormState,
  setStep: (step: number) => set({ step }),
  setVehicle: (vehicle: VehicleFormValues) => set({ vehicle }),
  setClient: (client: Client) => set({ client }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  reset: () => set(initialVehicleFormState),
}));

export default useVehicleFormStore;
