'use client';

import { useEffect, useRef } from 'react';

import React, { useMemo } from 'react';
import {
  addHours,
  areIntervalsOverlapping,
  differenceInMinutes,
  eachHourOfInterval,
  getHours,
  getMinutes,
  isSameDay,
  startOfDay,
} from 'date-fns';

import { EventItem } from '@/features/calendar/components/event-item';
import { isAllDayEvent, isMultiDayEvent } from '@/features/calendar/lib/utils';
import { useCurrentTimeIndicator } from '@/features/calendar/hooks/use-current-time-indicator';
import {
  EndHour,
  StartHour,
  WeekCellsHeight,
} from '@/features/calendar/lib/constants';
import { cn } from '@/utils/style-utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getTime } from '@/utils/date.utils';
import { CalendarEvent } from '@/features/calendar/lib/types';
import { DraggableEvent } from '@/features/calendar/components/draggable-event';
import { DroppableCell } from '@/features/calendar/components/droppable-cell';

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
}

interface PositionedEvent {
  event: CalendarEvent;
  top: number;
  height: number;
  left: number;
  width: number;
  zIndex: number;
}

export function DayView({ currentDate, events }: DayViewProps) {
  const hours = useMemo(() => {
    const dayStart = startOfDay(currentDate);
    return eachHourOfInterval({
      start: addHours(dayStart, StartHour),
      end: addHours(dayStart, EndHour - 1),
    });
  }, [currentDate]);

  const dayEvents = useMemo(() => {
    return events
      .filter((event) => {
        const eventStart = new Date(event.startTime);
        const eventEnd = new Date(event.endTime);
        return (
          isSameDay(currentDate, eventStart) ||
          isSameDay(currentDate, eventEnd) ||
          (currentDate > eventStart && currentDate < eventEnd)
        );
      })
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      );
  }, [currentDate, events]);

  // Filter all-day events
  const allDayEvents = useMemo(() => {
    return dayEvents.filter((event) => {
      const isAllDay = isAllDayEvent(event.startTime, event.endTime);
      // Include explicitly marked all-day events or multi-day events
      return isAllDay || isMultiDayEvent(event);
    });
  }, [dayEvents]);

  // Get only single-day time-based events
  const timeEvents = useMemo(() => {
    return dayEvents.filter((event) => {
      const isAllDay = isAllDayEvent(event.startTime, event.endTime);
      // Exclude all-day events and multi-day events
      return !isAllDay && !isMultiDayEvent(event);
    });
  }, [dayEvents]);

  // Process events to calculate positions
  const positionedEvents = useMemo(() => {
    const result: PositionedEvent[] = [];
    const dayStart = startOfDay(currentDate);

    // Sort events by start time and duration
    const sortedEvents = [...timeEvents].sort((a, b) => {
      const aStart = new Date(a.startTime);
      const bStart = new Date(b.startTime);
      const aEnd = new Date(a.endTime);
      const bEnd = new Date(b.endTime);

      // First sort by start time
      if (aStart < bStart) return -1;
      if (aStart > bStart) return 1;

      // If start times are equal, sort by duration (longer events first)
      const aDuration = differenceInMinutes(aEnd, aStart);
      const bDuration = differenceInMinutes(bEnd, bStart);
      return bDuration - aDuration;
    });

    // Track columns for overlapping events
    const columns: { event: CalendarEvent; end: Date }[][] = [];

    sortedEvents.forEach((event) => {
      const eventStart = new Date(event.startTime);
      const eventEnd = new Date(event.endTime);

      // Adjust start and end times if they're outside this day
      const adjustedStart = isSameDay(currentDate, eventStart)
        ? eventStart
        : dayStart;
      const adjustedEnd = isSameDay(currentDate, eventEnd)
        ? eventEnd
        : addHours(dayStart, 24);

      // Calculate top position and height
      const startHour =
        getHours(adjustedStart) + getMinutes(adjustedStart) / 60;
      const endHour = getHours(adjustedEnd) + getMinutes(adjustedEnd) / 60;
      const top = (startHour - StartHour) * WeekCellsHeight;
      const height = (endHour - startHour) * WeekCellsHeight;

      // Find a column for this event
      let columnIndex = 0;
      let placed = false;

      while (!placed) {
        const col = columns[columnIndex] || [];
        if (col.length === 0) {
          columns[columnIndex] = col;
          placed = true;
        } else {
          const overlaps = col.some((c) =>
            areIntervalsOverlapping(
              { start: adjustedStart, end: adjustedEnd },
              {
                start: new Date(c.event.startTime),
                end: new Date(c.event.endTime),
              },
            ),
          );
          if (!overlaps) {
            placed = true;
          } else {
            columnIndex++;
          }
        }
      }

      // Ensure column is initialized before pushing
      const currentColumn = columns[columnIndex] || [];
      columns[columnIndex] = currentColumn;
      currentColumn.push({ event, end: adjustedEnd });

      // First column takes full width, others are indented by 10% and take 90% width
      const width = columnIndex === 0 ? 1 : 0.9;
      const left = columnIndex === 0 ? 0 : columnIndex * 0.1;

      result.push({
        event,
        top,
        height,
        left,
        width,
        zIndex: 10 + columnIndex, // Higher columns get higher z-index
      });
    });

    return result;
  }, [currentDate, timeEvents]);

  const showAllDaySection = allDayEvents.length > 0;
  const { currentTimePosition, currentTimeVisible } = useCurrentTimeIndicator(
    currentDate,
    'day',
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initialize scroll position to 8 AM
  useEffect(() => {
    const scrollToEightAM = () => {
      if (scrollContainerRef.current) {
        const targetHour = 8;
        // Calculate position: (target hour - start hour) * cell height
        const targetTop = (targetHour - StartHour) * WeekCellsHeight;

        // Use requestAnimationFrame to ensure the scroll area is properly rendered
        requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = targetTop;
          }
        });
      }
    };

    // Small delay to ensure all components are mounted
    const timeoutId = setTimeout(scrollToEightAM, 100);

    return () => clearTimeout(timeoutId);
  }, [currentDate]); // Re-run when currentDate changes

  return (
    <div data-slot="day-view" className="contents">
      <ScrollArea className="h-[calc(100vh-12.5rem)]" ref={scrollContainerRef}>
        {showAllDaySection && (
          <div className="border-border/70 bg-muted/50 border-t">
            <div className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr]">
              <div className="relative">
                <span className="text-muted-foreground/70 absolute bottom-0 left-0 h-6 w-16 max-w-full pe-2 text-right text-[10px] sm:pe-4 sm:text-xs" />
              </div>
              <div className="border-border/70 relative border-r p-1 last:border-r-0">
                {allDayEvents.map((event) => {
                  const eventStart = new Date(event.startTime);
                  const eventEnd = new Date(event.endTime);
                  const isFirstDay = isSameDay(currentDate, eventStart);
                  const isLastDay = isSameDay(currentDate, eventEnd);

                  return (
                    <EventItem
                      key={`spanning-${event.id}`}
                      event={event}
                      view="month"
                      isFirstDay={isFirstDay}
                      isLastDay={isLastDay}
                    >
                      {/* Always show the title in day view for better usability */}
                      <div>
                        {event.vehicle.make} - {event.vehicle.model}
                      </div>
                    </EventItem>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="border-border/70 rounded-sm grid flex-1 grid-cols-[3rem_1fr] overflow-hidden border-t sm:grid-cols-[4rem_1fr]">
          <div>
            {hours.map((hour, index) => (
              <div
                key={hour.toString()}
                className="border-border/70 relative h-[var(--week-cells-height)] border-b last:border-b-0"
              >
                {index > 0 && (
                  <span className="bg-background text-muted-foreground/70 absolute -top-3 left-0 flex h-6 w-16 max-w-full items-center justify-end pe-2 text-[10px] sm:pe-4 sm:text-xs">
                    {getTime(hour)}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="relative">
            {/* Positioned events */}
            {positionedEvents.map((positionedEvent) => (
              <div
                key={positionedEvent.event.id}
                className="absolute z-10 px-0.5"
                style={{
                  top: `${positionedEvent.top}px`,
                  height: `${positionedEvent.height}px`,
                  left: `${positionedEvent.left * 100}%`,
                  width: `${positionedEvent.width * 100}%`,
                  zIndex: positionedEvent.zIndex,
                }}
              >
                <div className="size-full">
                  <DraggableEvent
                    event={positionedEvent.event}
                    view="day"
                    showTime
                    height={positionedEvent.height}
                  />
                </div>
              </div>
            ))}

            {/* Current time indicator */}
            {currentTimeVisible && (
              <div
                className="pointer-events-none absolute right-0 left-0 z-20"
                style={{ top: `${currentTimePosition}%` }}
              >
                <div className="relative flex items-center">
                  <div className="bg-primary absolute -left-1 h-2 w-2 rounded-full"></div>
                  <div className="bg-primary h-[2px] w-full"></div>
                </div>
              </div>
            )}

            {/* Time grid */}
            {hours.map((hour) => {
              const hourValue = getHours(hour);
              return (
                <div
                  key={hour.toString()}
                  className="border-border/70 relative h-[var(--week-cells-height)] border-b last:border-b-0"
                >
                  {/* Quarter-hour intervals */}
                  {[0, 1, 2, 3].map((quarter) => {
                    const quarterHourTime = hourValue + quarter * 0.25;
                    return (
                      <DroppableCell
                        key={`${hour.toString()}-${quarter}`}
                        id={`day-cell-${currentDate.toISOString()}-${quarterHourTime}`}
                        date={currentDate}
                        time={quarterHourTime}
                        className={cn(
                          'absolute h-[calc(var(--week-cells-height)/4)] w-full',
                          quarter === 0 && 'top-0',
                          quarter === 1 &&
                            'top-[calc(var(--week-cells-height)/4)]',
                          quarter === 2 &&
                            'top-[calc(var(--week-cells-height)/4*2)]',
                          quarter === 3 &&
                            'top-[calc(var(--week-cells-height)/4*3)]',
                        )}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
