'use client';

import { useEffect, useMemo } from 'react';
import { RiCalendarCheckLine } from '@remixicon/react';
import { getViewTitle, viewHandlers } from '@/features/calendar/lib/utils';
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
  EventGap,
  EventHeight,
  KEYBOARD_SHORTCUTS,
  VIEW_TYPES,
  VIEW_TYPE,
  WeekCellsHeight,
} from '@/features/calendar/lib/constants';
import { CalendarEvent, CalendarView } from '@/features/calendar/lib/types';
import { CalendarDndProvider } from '@/features/calendar/components/calendar-dnd-context';
import { MonthView } from '@/features/calendar/components/month-view';
import { WeekView } from '@/features/calendar/components/week-view';
import { DayView } from '@/features/calendar/components/day-view';
import { AgendaView } from '@/features/calendar/components/agenda-view';
import ServiceRecordDialog from '@/features/calendar/components/service-record-dialog';
import ServiceRecordForm from '@/features/calendar/components/service-record-form';
import useCreateServiceRecordMutation from '@/features/calendar/hooks/mutations/use-create-service-record.mutation';
import {
  CreateServiceRecordDto,
  CreateServiceRecordSchema,
  UpdateServiceRecordDto,
} from '@/server/api/routers/service-record/service-record.dto';
import useCalendarDialogStore from '@/features/calendar/stores/use-calendar-dialog.store';
import { parseAsIsoDate, parseAsStringLiteral, useQueryState } from 'nuqs';
import useUpdateServiceRecordMutation from '../hooks/mutations/use-update-service-record.mutation copy 2';
import { toast } from '@/utils/toast-utils';

export interface EventCalendarProps {
  events?: CalendarEvent[];
  className?: string;
}

export function EventCalendar({ events = [], className }: EventCalendarProps) {
  const [view, setView] = useQueryState(
    'view',
    parseAsStringLiteral(VIEW_TYPES).withDefault('week'),
  );
  const [currentDate, setCurrentDate] = useQueryState(
    'currentDate',
    parseAsIsoDate.withDefault(new Date()),
  );
  const { createServiceRecord, isCreating } = useCreateServiceRecordMutation();
  const { updateServiceRecord } = useUpdateServiceRecordMutation();
  const dialogOpen = useCalendarDialogStore((state) => state.open);
  const setDialogOpen = useCalendarDialogStore((state) => state.setOpen);
  const initialValues = useCalendarDialogStore((state) => state.initialValues);
  const setInitialValues = useCalendarDialogStore(
    (state) => state.setInitialValues,
  );
  const isEdit = useCalendarDialogStore((state) => state.isEdit);
  const setIsEdit = useCalendarDialogStore((state) => state.setIsEdit);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (
        dialogOpen ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      ) {
        return;
      }

      if (Object.keys(KEYBOARD_SHORTCUTS).includes(key)) {
        setView(KEYBOARD_SHORTCUTS[key] as CalendarView);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handlePrevious = () => {
    setCurrentDate(viewHandlers[view].previous(currentDate));
  };

  const handleNext = () => {
    setCurrentDate(viewHandlers[view].next(currentDate));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleCreateClick = () => {
    setDialogOpen(true);
    setIsEdit(false);
    setInitialValues(undefined);
  };

  const handleEventSubmit = (
    data: CreateServiceRecordDto | UpdateServiceRecordDto,
  ) => {
    if (isEdit) {
      updateServiceRecord(data);
    } else {
      const parsedData = CreateServiceRecordSchema.safeParse(data);
      if (!parsedData.success) {
        toast(parsedData.error.message).error();
        return;
      }
      createServiceRecord(parsedData.data);
    }
  };

  const handleEventUpdate = (data: UpdateServiceRecordDto) => {
    updateServiceRecord(data);
  };

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
            <Button
              className="max-sm:hidden max-[479px]:aspect-square max-[479px]:p-0!"
              icon={<PlusIcon size={16} aria-hidden="true" />}
              onClick={handleCreateClick}
            >
              <span className="max-sm:sr-only">Додати</span>
            </Button>
          </div>
        </div>

        <div className="flex w-full flex-1 flex-col">
          {view === 'month' && (
            <MonthView currentDate={currentDate} events={events} />
          )}
          {view === 'week' && (
            <WeekView currentDate={currentDate} events={events} />
          )}
          {view === 'day' && (
            <DayView currentDate={currentDate} events={events} />
          )}
          {view === 'agenda' && (
            <AgendaView currentDate={currentDate} events={events} />
          )}
        </div>
      </CalendarDndProvider>
      <ServiceRecordDialog>
        <ServiceRecordForm
          onSubmit={handleEventSubmit}
          isLoading={isCreating}
          initialData={initialValues}
        />
      </ServiceRecordDialog>
    </div>
  );
}
