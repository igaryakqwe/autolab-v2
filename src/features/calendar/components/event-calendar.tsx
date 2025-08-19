'use client';

import { useEffect, useMemo, useState } from 'react';
import { RiCalendarCheckLine } from '@remixicon/react';
import { addDays, addMonths, addWeeks, subMonths, subWeeks } from 'date-fns';
import { getViewTitle } from '@/features/calendar/lib/utils';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from 'lucide-react';
import { cn } from '@/utils/style-utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AgendaDaysToShow,
  EventGap,
  EventHeight,
  VIEW_TYPE,
  WeekCellsHeight,
} from '@/features/calendar/lib/constants';
import { CalendarEvent, CalendarView } from '@/features/calendar/lib/types';
import { CalendarDndProvider } from '@/features/calendar/components/calendar-dnd-context';
import { MonthView } from '@/features/calendar/components/month-view';
import { WeekView } from '@/features/calendar/components/week-view';
import { DayView } from '@/features/calendar/components/day-view';
import { AgendaView } from '@/features/calendar/components/agenda-view';
import ServiceRecordDialog from './service-record-dialog';
import ServiceRecordForm from './service-record-form';
import useCreateServiceRecordMutation from '../hooks/mutations/use-create-service-record.mutation';
import { CreateServiceRecordDto } from '@/server/api/routers/service-record/service-record.dto';

export interface EventCalendarProps {
  events?: CalendarEvent[];
  onEventAdd?: (event: CalendarEvent) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
  className?: string;
  initialView?: CalendarView;
}

export function EventCalendar({
  events = [],
  className,
  initialView = 'month',
}: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>(initialView);
  const { createServiceRecord, isCreating } = useCreateServiceRecordMutation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'm':
          setView('month');
          break;
        case 'w':
          setView('week');
          break;
        case 'd':
          setView('day');
          break;
        case 'a':
          setView('agenda');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handlePrevious = () => {
    if (view === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (view === 'week') {
      setCurrentDate(subWeeks(currentDate, 1));
    } else if (view === 'day') {
      setCurrentDate(addDays(currentDate, -1));
    } else if (view === 'agenda') {
      setCurrentDate(addDays(currentDate, -AgendaDaysToShow));
    }
  };

  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (view === 'week') {
      setCurrentDate(addWeeks(currentDate, 1));
    } else if (view === 'day') {
      setCurrentDate(addDays(currentDate, 1));
    } else if (view === 'agenda') {
      setCurrentDate(addDays(currentDate, AgendaDaysToShow));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleEventSelect = (event: CreateServiceRecordDto) => {
    console.log('Event selected:', event);
  };

  const handleEventCreate = (data: CreateServiceRecordDto) => {
    createServiceRecord(data);
  };

  const handleEventUpdate = () => {};

  const viewTitle = useMemo(
    () => getViewTitle(view, currentDate),
    [view, currentDate],
  );

  return (
    <div
      className="flex flex-col rounded-lg border has-data-[slot=month-view]:flex-1"
      style={
        {
          '--event-height': `${EventHeight}px`,
          '--event-gap': `${EventGap}px`,
          '--week-cells-height': `${WeekCellsHeight}px`,
        } as React.CSSProperties
      }
    >
      <CalendarDndProvider onEventUpdate={handleEventUpdate}>
        <div
          className={cn(
            'flex items-center justify-between p-2 sm:p-4',
            className,
          )}
        >
          <div className="flex items-center gap-1 sm:gap-4">
            <Button
              variant="outline"
              size="icon"
              className="max-[479px]:aspect-square max-[479px]:p-0!"
              onClick={handleToday}
            >
              <RiCalendarCheckLine size={16} aria-hidden="true" />
            </Button>
            <div className="flex items-center sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                aria-label="Previous"
              >
                <ChevronLeftIcon size={16} aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                aria-label="Next"
              >
                <ChevronRightIcon size={16} aria-hidden="true" />
              </Button>
            </div>
            <h2 className="text-sm capitalize font-semibold sm:text-lg md:text-xl">
              {viewTitle}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1.5 max-[479px]:h-8">
                  <span>
                    <span className="min-[480px]:hidden" aria-hidden="true">
                      {VIEW_TYPE[view].charAt(0).toUpperCase()}
                    </span>
                    <span className="max-[479px]:sr-only capitalize">
                      {VIEW_TYPE[view]}
                    </span>
                  </span>
                  <ChevronDownIcon
                    className="-me-1 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-32">
                {Object.entries(VIEW_TYPE).map(([key, value]) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => setView(key as CalendarView)}
                  >
                    {value}
                    <DropdownMenuShortcut>
                      {key.charAt(0).toUpperCase()}
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <ServiceRecordDialog
              trigger={
                <Button
                  className="max-sm:hidden max-[479px]:aspect-square max-[479px]:p-0!"
                  icon={<PlusIcon size={16} aria-hidden="true" />}
                >
                  <span className="max-sm:sr-only">Додати</span>
                </Button>
              }
            >
              <ServiceRecordForm
                onSubmit={handleEventCreate}
                isLoading={isCreating}
              />
            </ServiceRecordDialog>
          </div>
        </div>

        <div className="flex w-full flex-1 flex-col">
          {view === 'month' && (
            <MonthView
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
              onEventCreate={handleEventCreate}
            />
          )}
          {view === 'week' && (
            <WeekView
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
              onEventCreate={handleEventCreate}
            />
          )}
          {view === 'day' && (
            <DayView
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
              onEventCreate={handleEventCreate}
            />
          )}
          {view === 'agenda' && (
            <AgendaView
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
            />
          )}
        </div>
      </CalendarDndProvider>
    </div>
  );
}
