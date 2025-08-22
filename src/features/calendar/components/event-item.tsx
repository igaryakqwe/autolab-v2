'use client';

import { useMemo } from 'react';
import type { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { differenceInMinutes, isPast } from 'date-fns';
import { type CalendarEvent } from '@/features/calendar/lib/types';
import {
  getBorderRadiusClasses,
  getEventColorClasses,
  isAllDayEvent,
} from '@/features/calendar/lib/utils';
import { cn } from '@/utils/style-utils';
import useCalendarDialogStore from '../stores/use-calendar-dialog.store';
import { getTime } from '@/utils/date.utils';

interface EventWrapperProps {
  event: CalendarEvent;
  isFirstDay?: boolean;
  isLastDay?: boolean;
  isDragging?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children: React.ReactNode;
  currentTime?: Date;
  dndListeners?: SyntheticListenerMap;
  dndAttributes?: DraggableAttributes;
  onMouseDown?: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
}

function EventWrapper({
  event,
  isFirstDay = true,
  isLastDay = true,
  isDragging,
  onClick,
  className,
  children,
  currentTime,
  dndListeners,
  dndAttributes,
  onMouseDown,
  onTouchStart,
}: EventWrapperProps) {
  const setIsEdit = useCalendarDialogStore((state) => state.setIsEdit);
  const setOpenDialog = useCalendarDialogStore((state) => state.setOpen);
  const setInitialValues = useCalendarDialogStore(
    (state) => state.setInitialValues,
  );

  const displayEnd = currentTime
    ? new Date(
        new Date(currentTime).getTime() +
          (new Date(event.endTime).getTime() -
            new Date(event.startTime).getTime()),
      )
    : new Date(event.endTime);

  const isEventInPast = isPast(displayEnd);

  const handleClick = (e: React.MouseEvent) => {
    setIsEdit(true);
    setOpenDialog(true);
    setInitialValues(event);
    onClick?.(e);
  };

  return (
    <button
      className={cn(
        'focus-visible:border-ring focus-visible:ring-ring/50 flex size-full overflow-hidden px-1 text-left font-medium backdrop-blur-md transition outline-none select-none focus-visible:ring-[3px] data-dragging:cursor-grabbing data-dragging:shadow-lg data-past-event:line-through sm:px-2',
        getEventColorClasses(event.status),
        getBorderRadiusClasses(isFirstDay, isLastDay),
        className,
      )}
      data-dragging={isDragging || undefined}
      data-past-event={isEventInPast || undefined}
      onClick={handleClick}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      {...dndListeners}
      {...dndAttributes}
    >
      {children}
    </button>
  );
}

interface EventItemProps {
  event: CalendarEvent;
  view: 'month' | 'week' | 'day' | 'agenda';
  isDragging?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  showTime?: boolean;
  currentTime?: Date;
  isFirstDay?: boolean;
  isLastDay?: boolean;
  children?: React.ReactNode;
  className?: string;
  dndListeners?: SyntheticListenerMap;
  dndAttributes?: DraggableAttributes;
  onMouseDown?: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
}

export function EventItem({
  event,
  view,
  isDragging,
  onClick,
  showTime,
  currentTime,
  isFirstDay = true,
  isLastDay = true,
  children,
  className,
  dndListeners,
  dndAttributes,
  onMouseDown,
  onTouchStart,
}: EventItemProps) {
  const eventColor = event.status;

  const displayStart = useMemo(() => {
    return currentTime || new Date(event.startTime);
  }, [currentTime, event.startTime]);

  const displayEnd = useMemo(() => {
    return currentTime
      ? new Date(
          new Date(currentTime).getTime() +
            (new Date(event.endTime).getTime() -
              new Date(event.startTime).getTime()),
        )
      : new Date(event.endTime);
  }, [currentTime, event.startTime, event.endTime]);

  const isAllDay = isAllDayEvent(displayStart, displayEnd);

  const durationMinutes = useMemo(() => {
    return differenceInMinutes(displayEnd, displayStart);
  }, [displayStart, displayEnd]);

  const getEventTime = () => {
    if (isAllDay) return 'День';

    return `${getTime(displayStart)} - ${getTime(displayEnd)}`;
  };

  if (view === 'month') {
    return (
      <EventWrapper
        event={event}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
        isDragging={isDragging}
        onClick={onClick}
        className={cn(
          'mt-[var(--event-gap)] h-[var(--event-height)] items-center text-[10px] sm:text-xs',
          className,
        )}
        currentTime={currentTime}
        dndListeners={dndListeners}
        dndAttributes={dndAttributes}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {children || (
          <span className="truncate">
            {!isAllDay && (
              <span className="truncate font-normal opacity-70 sm:text-[11px]">
                {getTime(displayStart)}{' '}
              </span>
            )}
            {event.vehicle.make} - {event.vehicle.model}
          </span>
        )}
      </EventWrapper>
    );
  }

  if (view === 'week' || view === 'day') {
    return (
      <EventWrapper
        event={event}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
        isDragging={isDragging}
        onClick={onClick}
        className={cn(
          'py-1 z-10 shadow-sm',
          durationMinutes < 45 ? 'items-center' : 'flex-col',
          view === 'week' ? 'text-[10px] sm:text-xs' : 'text-xs',
          'hover:scale-[1.01] hover:shadow-lg hover:z-20',
          className,
        )}
        currentTime={currentTime}
        dndListeners={dndListeners}
        dndAttributes={dndAttributes}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {durationMinutes < 45 ? (
          <div className="truncate">
            {event.vehicle.make} - {event.vehicle.model}{' '}
            {showTime && (
              <span className="opacity-70">{getTime(displayStart)}</span>
            )}
          </div>
        ) : (
          <>
            <div className="truncate font-medium">
              {event.vehicle.make} - {event.vehicle.model}
            </div>
            {showTime && (
              <div className="truncate font-normal opacity-70 sm:text-[11px]">
                {getEventTime()}
              </div>
            )}
          </>
        )}
      </EventWrapper>
    );
  }

  return (
    <button
      className={cn(
        'focus-visible:border-ring focus-visible:ring-ring/50 flex w-full flex-col gap-1 rounded p-2 text-left transition outline-none focus-visible:ring-[3px] data-past-event:line-through data-past-event:opacity-90',
        getEventColorClasses(eventColor),
        'hover:shadow-lg hover:z-20',
        className,
      )}
      data-past-event={isPast(new Date(event.endTime)) || undefined}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      {...dndListeners}
      {...dndAttributes}
    >
      <div className="text-sm font-medium">
        {event.vehicle.make} - {event.vehicle.model}
      </div>
      <div className="text-xs opacity-70">
        {isAllDay ? (
          <span>All day</span>
        ) : (
          <span className="uppercase">
            {getTime(displayStart)} - {getTime(displayEnd)}
          </span>
        )}
      </div>
    </button>
  );
}
