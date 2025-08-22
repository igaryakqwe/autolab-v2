'use client';

import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { uk } from 'date-fns/locale';

import { EventCalendar } from '@/features/calendar/components/event-calendar';
import { api } from '@/lib/trpc/client';
import useOrganizationsStore from '@/store/use-organizations-store';
import { parseAsIsoDate, useQueryState } from 'nuqs';

const CalendarPage = () => {
  const { currentOrganization } = useOrganizationsStore();
  const [date, setDate] = useQueryState(
    'currentDate',
    parseAsIsoDate.withDefault(new Date()),
  );
  const { data: serviceRecords } =
    api.serviceRecord.getOrganizationServiceRecords.useQuery(
      currentOrganization!,
      {
        select: (data) => data.filter((event) => event.status !== 'CANCELLED'),
      },
    );

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <CalendarUI
        locale={uk}
        mode="single"
        selected={date}
        onSelect={(value) => setDate(value!)}
        className="rounded-lg hidden lg:block border shadow-sm h-fit w-fit"
        captionLayout="dropdown"
      />
      <div className="w-full">
        <EventCalendar events={serviceRecords} />
      </div>
    </div>
  );
};

export default CalendarPage;
