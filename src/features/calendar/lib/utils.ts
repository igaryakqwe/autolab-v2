import {
  isSameDay,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  addDays,
  format,
} from 'date-fns';
import { CalendarEvent, CalendarView } from '@/features/calendar/lib/types';
import { DAYS_IN_AGENDA } from '@/features/calendar/lib/constants';
import { formatMonth, formatMonthYear } from '@/utils/date.utils';
import { uk } from 'date-fns/locale/uk';
import { ServiceStatus } from '@/types/models/vehicle';
import { STATUS_MAPPER } from '@/features/vehicles/lib/constants';

export function getEventColorClasses(status: ServiceStatus): string {
  return STATUS_MAPPER[status].className;
}

/**
 * Get CSS classes for border radius based on event position in multi-day events
 */
export function getBorderRadiusClasses(
  isFirstDay: boolean,
  isLastDay: boolean,
): string {
  if (isFirstDay && isLastDay) {
    return 'rounded'; // Both ends rounded
  } else if (isFirstDay) {
    return 'rounded-l rounded-r-none'; // Only left end rounded
  } else if (isLastDay) {
    return 'rounded-r rounded-l-none'; // Only right end rounded
  } else {
    return 'rounded-none'; // No rounded corners
  }
}

/**
 * Check if an event is a multi-day event
 */
export function isMultiDayEvent(event: CalendarEvent): boolean {
  const eventStart = new Date(event.startTime);
  const eventEnd = new Date(event.endTime);
  const isAllDay = isAllDayEvent(eventStart, eventEnd);
  return isAllDay || eventStart.getDate() !== eventEnd.getDate();
}

/**
 * Filter events for a specific day
 */
export function getEventsForDay(
  events: CalendarEvent[],
  day: Date,
): CalendarEvent[] {
  return events
    .filter((event) => {
      const eventStart = new Date(event.startTime);
      return isSameDay(day, eventStart);
    })
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    );
}

/**
 * Sort events with multi-day events first, then by start time
 */
export function sortEvents(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort((a, b) => {
    const aIsMultiDay = isMultiDayEvent(a);
    const bIsMultiDay = isMultiDayEvent(b);

    if (aIsMultiDay && !bIsMultiDay) return -1;
    if (!aIsMultiDay && bIsMultiDay) return 1;

    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });
}

/**
 * Get multi-day events that span across a specific day (but don't start on that day)
 */
export function getSpanningEventsForDay(
  events: CalendarEvent[],
  day: Date,
): CalendarEvent[] {
  return events.filter((event) => {
    if (!isMultiDayEvent(event)) return false;

    const eventStart = new Date(event.startTime);
    const eventEnd = new Date(event.endTime);

    // Only include if it's not the start day but is either the end day or a middle day
    return (
      !isSameDay(day, eventStart) &&
      (isSameDay(day, eventEnd) || (day > eventStart && day < eventEnd))
    );
  });
}

/**
 * Get all events visible on a specific day (starting, ending, or spanning)
 */
export function getAllEventsForDay(
  events: CalendarEvent[],
  day: Date,
): CalendarEvent[] {
  return events.filter((event) => {
    const eventStart = new Date(event.startTime);
    const eventEnd = new Date(event.endTime);
    return (
      isSameDay(day, eventStart) ||
      isSameDay(day, eventEnd) ||
      (day > eventStart && day < eventEnd)
    );
  });
}

/**
 * Get all events for a day (for agenda view)
 */
export function getAgendaEventsForDay(
  events: CalendarEvent[],
  day: Date,
): CalendarEvent[] {
  return events
    .filter((event) => {
      const eventStart = new Date(event.startTime);
      const eventEnd = new Date(event.endTime);
      return (
        isSameDay(day, eventStart) ||
        isSameDay(day, eventEnd) ||
        (day > eventStart && day < eventEnd)
      );
    })
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    );
}

/**
 * Add hours to a date
 */
export function addHoursToDate(date: Date, hours: number): Date {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
}

const viewTitleFormatters: Record<CalendarView, (date: Date) => string> = {
  month: (date) => formatMonthYear(date),

  week: (date) => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const end = endOfWeek(date, { weekStartsOn: 0 });
    return isSameMonth(start, end)
      ? formatMonthYear(start)
      : `${formatMonth(start)} - ${formatMonthYear(end)}`;
  },

  day: (date) => format(date, 'EEEE, d MMMM yyyy', { locale: uk }),

  agenda: (date) => {
    const start = date;
    const end = addDays(date, DAYS_IN_AGENDA - 1);
    return isSameMonth(start, end)
      ? formatMonthYear(start)
      : `${formatMonth(start)} - ${formatMonthYear(end)}`;
  },
};

export const getViewTitle = (view: CalendarView, date: Date): string => {
  const formatter = viewTitleFormatters[view] || viewTitleFormatters.month;
  return formatter(date);
};

export const isAllDayEvent = (startTime: Date, endTime: Date): boolean => {
  if (!isSameDay(startTime, endTime)) {
    return false;
  }

  const isStartAtMidnight =
    startTime.getHours() === 0 &&
    startTime.getMinutes() === 0 &&
    startTime.getSeconds() === 0 &&
    startTime.getMilliseconds() === 0;

  const isEndAtMidnight =
    endTime.getHours() === 23 &&
    endTime.getMinutes() === 59 &&
    endTime.getSeconds() === 59;

  return isStartAtMidnight && isEndAtMidnight;
};
