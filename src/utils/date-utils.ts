import { differenceInMinutes } from 'date-fns';

export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours} год ${minutes} хв`;
  }

  if (hours > 0) {
    return `${hours} год`;
  }
  return `${minutes}хв`;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const calculateDurationHours = (
  start: Date | string,
  end: Date | string,
): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const minutes = differenceInMinutes(endDate, startDate);
  const hours = minutes / 60;

  return Math.round(hours * 10) / 10;
};
