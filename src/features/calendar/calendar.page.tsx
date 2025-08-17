'use client';

import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { uk } from 'date-fns/locale';
import { useState } from 'react';

import { EventCalendar } from '@/features/calendar/components/event-calendar';
import { CalendarEvent } from '@/features/calendar/lib/types';
import { api } from '@/lib/trpc/client';
import useOrganizationsStore from '@/store/use-organizations-store';

const CalendarPage = () => {
  const { currentOrganization } = useOrganizationsStore();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data: events } =
    api.serviceRecord.getOrganizationServiceRecords.useQuery(
      currentOrganization!,
    );

  const handleEventAdd = (event: CalendarEvent) => {
    console.log(event);
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    console.log(updatedEvent);
  };

  const handleEventDelete = (eventId: string) => {
    console.log(eventId);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <CalendarUI
        locale={uk}
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg hidden lg:block border shadow-sm h-fit w-fit"
        captionLayout="dropdown"
      />
      <div className="w-full">
        <EventCalendar
          events={events}
          onEventAdd={handleEventAdd}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
