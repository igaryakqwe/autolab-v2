import { CheckIcon, ClockIcon, CalculatorIcon, XIcon } from 'lucide-react';

export const STATUS_MAPPER = {
  COMPLETED: {
    className: 'bg-emerald-500/65 border-emerald-500/65 text-white',
    icon: CheckIcon,
    label: 'Завершено',
  },
  IN_PROGRESS: {
    className: 'bg-blue-500/65 border-blue-500/65 text-white',
    icon: ClockIcon,
    label: 'В процесі виконання',
  },
  PENDING: {
    className: 'bg-amber-500/65 border-amber-500/65 text-white',
    icon: CalculatorIcon,
    label: 'Заплановано',
  },
  CANCELLED: {
    className: 'bg-red-500/65 border-red-500/65 text-white',
    icon: XIcon,
    label: 'Відмінено',
  },
};
