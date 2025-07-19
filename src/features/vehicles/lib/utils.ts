import { ComboboxOption } from '@/components/ui/combobox';
import { env } from '@/lib/env';

export const findElementInOptions = (id: string, options: ComboboxOption[]) => {
  return options.find((option) => option.value === id)?.label;
};

export const createVehicleSlug = (make: string) => {
  return make.toLowerCase().replace(/\s+/g, '');
};

export const getVehicleImage = (make: string) => {
  return `${env.NEXT_PUBLIC_SIMPLE_ICONS_URL}/${createVehicleSlug(make)}`;
};
