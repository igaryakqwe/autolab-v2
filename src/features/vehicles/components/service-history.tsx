import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from '@/components/ui/timeline';
import { cn } from '@/utils/style-utils';
import { Wrench, CheckIcon, CalendarIcon, ClockIcon } from 'lucide-react';

export type ServiceRecord = {
  serviceName: string;
  startTime: string;
  endTime: string | null;
  status: 'ЗАВЕРШЕНО' | 'В_ПРОЦЕСІ' | 'ОЧІКУЄ';
  notes: string;
  totalPrice: number | null;
};

export type ServiceHistoryProps = {
  records: ServiceRecord[];
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
  }).format(amount);
};

export const history: ServiceHistoryProps = {
  records: [
    {
      serviceName: 'Заміна масла та фільтра',
      startTime: '2024-01-15T09:00:00Z',
      endTime: '2024-01-15T11:30:00Z',
      status: 'ЗАВЕРШЕНО',
      notes:
        'Планова заміна масла та фільтра. Перевірка тиску в шинах та рівня рідин.',
      totalPrice: 2200,
    },
    {
      serviceName:
        'Заміна гальмівних колодок та промивка гальмівної рідини. Ротація шин.',
      startTime: '2024-03-20T14:00:00Z',
      endTime: '2024-03-20T16:45:00Z',
      status: 'ЗАВЕРШЕНО',
      notes:
        'Заміна гальмівних колодок та промивка гальмівної рідини. Ротація шин.',
      totalPrice: 6800,
    },
    {
      serviceName: 'Річний огляд та технічне обслуговування',
      startTime: '2024-06-10T08:30:00Z',
      endTime: null,
      status: 'В_ПРОЦЕСІ',
      notes:
        'Річний огляд та технічне обслуговування. Перевірка роботи двигуна.',
      totalPrice: null,
    },
    {
      serviceName:
        'Заплановане обслуговування трансмісії та перевірка системи охолодження.',
      startTime: '2024-07-05T10:00:00Z',
      endTime: null,
      status: 'ОЧІКУЄ',
      notes:
        'Заплановане обслуговування трансмісії та перевірка системи охолодження.',
      totalPrice: null,
    },
  ],
};

const ServiceHistory = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
            <Wrench className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          Історія обслуговування
        </CardTitle>
        <CardDescription>
          Хронологія технічного обслуговування та ремонту
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Timeline defaultValue={2}>
          {history.records.map((record, index) => {
            const isCompleted = record.status === 'ЗАВЕРШЕНО';
            const isInProgress = record.status === 'В_ПРОЦЕСІ';
            const isPending = record.status === 'ОЧІКУЄ';

            return (
              <TimelineItem key={index} step={index + 1} className="pb-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <TimelineIndicator
                      className={cn(
                        'flex size-6 outline outline-background items-center justify-center shrink-0 z-10',
                        isCompleted &&
                          'bg-emerald-500 border-emerald-500 text-white',
                        isInProgress &&
                          'bg-blue-500 border-blue-500 text-white',
                        isPending && 'bg-amber-500 border-amber-500 text-white',
                      )}
                    >
                      {isCompleted && <CheckIcon size={12} />}
                      {isInProgress && <ClockIcon size={12} />}
                      {isPending && <CalendarIcon size={12} />}
                    </TimelineIndicator>
                    {index < history.records.length - 1 && (
                      <TimelineSeparator className="top-5 bg-border z-0" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 justify-between">
                        <TimelineTitle className="font-semibold text-md self-start">
                          {record.serviceName}
                        </TimelineTitle>
                        {record.totalPrice && (
                          <div className="text-right mt-2">
                            <div className="font-semibold text-lg">
                              {formatCurrency(record.totalPrice)}
                            </div>
                          </div>
                        )}
                      </div>
                      <TimelineDate className="text-muted-foreground text-sm">
                        {record.endTime ? (
                          <>
                            Завершено: {formatDate(record.endTime)}
                            <br />
                            Тривалість:{' '}
                            {Math.round(
                              (new Date(record.endTime).getTime() -
                                new Date(record.startTime).getTime()) /
                                (1000 * 60 * 60 * 100),
                            ) / 10}{' '}
                            годин
                          </>
                        ) : isInProgress ? (
                          'В процесі виконання'
                        ) : (
                          'Заплановано'
                        )}
                      </TimelineDate>
                    </div>
                    <TimelineContent className="text-muted-foreground text-sm">
                      {record.notes || 'Примітки відсутні'}
                    </TimelineContent>
                  </div>
                </div>
              </TimelineItem>
            );
          })}
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default ServiceHistory;
