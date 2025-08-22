import { format, formatDuration as formatDurationFn } from 'date-fns';
import { uk } from 'date-fns/locale';

export const formatDuration = (duration: number) => {
  return formatDurationFn(
    {
      hours: Math.floor(duration / 60),
      minutes: duration % 60,
    },
    { locale: uk },
  );
};

export const formatShortDuration = (duration: number) => {
  const formatted = formatDuration(duration);

  return formatted
    .replace('години', 'год')
    .replace('година', 'год')
    .replace('годин', 'год')
    .replace('хвилини', 'хв')
    .replace('хвилина', 'хв')
    .replace('хвилин', 'хв');
};

export const formatDate = (date: Date): string => {
  return format(date, 'dd MMMM yyyy', { locale: uk });
};

export const formatMonthYear = (date: Date) =>
  format(date, 'LLLL yyyy', { locale: uk });

export const formatMonth = (date: Date) => format(date, 'MMM', { locale: uk });

export const formatDayDate = (date: Date) =>
  format(date, 'EEEEEE', { locale: uk });

export const getTime = (date: Date): string => {
  return date.toLocaleTimeString('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};
