import { ComboboxOption } from '@/components/ui/combobox';

export const findElementInOptions = (id: string, options: ComboboxOption[]) => {
  return options.find((option) => option.value === id)?.label;
};
