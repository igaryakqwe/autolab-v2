'use client';

import { useRef, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { differenceInDays } from 'date-fns';

import { CalendarEvent } from '@/features/calendar/lib/types';
import { EventItem } from '@/features/calendar/components/event-item';
import { useCalendarDnd } from '@/features/calendar/components/calendar-dnd-context';
import { isAllDayEvent } from '../lib/utils';

interface DraggableEventProps {
  event: CalendarEvent;
  view: 'month' | 'week' | 'day';
  showTime?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  height?: number;
  isMultiDay?: boolean;
  multiDayWidth?: number;
  isFirstDay?: boolean;
  isLastDay?: boolean;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function DraggableEvent({
  event,
  view,
  showTime,
  onClick,
  height,
  isMultiDay,
  multiDayWidth,
  isFirstDay = true,
  isLastDay = true,
  'aria-hidden': ariaHidden,
}: DraggableEventProps) {
  const { activeId } = useCalendarDnd();
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [dragHandlePosition, setDragHandlePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const allDay = isAllDayEvent(event.startTime, event.endTime);

  // Check if this is a multi-day event
  const eventStart = new Date(event.startTime);
  const eventEnd = new Date(event.endTime);
  const isMultiDayEvent =
    isMultiDay || allDay || differenceInDays(eventEnd, eventStart) >= 1;

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `${event.id}-${view}`,
      data: {
        event,
        view,
        height: height || elementRef.current?.offsetHeight || null,
        isMultiDay: isMultiDayEvent,
        multiDayWidth: multiDayWidth,
        dragHandlePosition,
        isFirstDay,
        isLastDay,
      },
    });

  // Handle mouse down to track where on the event the user clicked
  const handleMouseDown = (e: React.MouseEvent) => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setDragHandlePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Don't render if this event is being dragged
  if (isDragging || activeId === `${event.id}-${view}`) {
    return (
      <div
        ref={setNodeRef}
        className="opacity-0"
        style={{ height: height || 'auto' }}
      />
    );
  }

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        height: height || 'auto',
        width:
          isMultiDayEvent && multiDayWidth ? `${multiDayWidth}%` : undefined,
      }
    : {
        height: height || 'auto',
        width:
          isMultiDayEvent && multiDayWidth ? `${multiDayWidth}%` : undefined,
      };

  // Handle touch start to track where on the event the user touched
  const handleTouchStart = (e: React.TouchEvent) => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      if (touch) {
        setDragHandlePosition({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        });
      }
    }
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (elementRef) elementRef.current = node;
      }}
      style={style}
      className="touch-none"
    >
      <EventItem
        event={event}
        view={view}
        showTime={showTime}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
        isDragging={isDragging}
        onClick={onClick}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        dndListeners={listeners}
        dndAttributes={attributes}
        aria-hidden={ariaHidden}
      />
    </div>
  );
}
