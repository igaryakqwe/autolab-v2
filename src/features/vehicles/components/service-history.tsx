import OrganizationLogo from '@/components/organization-logo';
import SectionHeader from '@/components/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from '@/components/ui/timeline';
import UserAvatar from '@/components/user-avatar';
import { ServiceRecord } from '@/types/models/vehicle';
import { formatCurrency } from '@/utils/currency.utils';
import { formatDate, formatShortDuration } from '@/utils/date.utils';
import { formatName } from '@/utils/string-utils';
import { cn } from '@/utils/style-utils';
import { WrenchIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { STATUS_MAPPER } from '@/features/vehicles/lib/constants';
import { differenceInMinutes } from 'date-fns';
import ServiceRecordDialog from '@/features/calendar/components/service-record-dialog';
import ServiceRecordForm from '@/features/calendar/components/service-record-form';
import useCreateServiceRecordMutation from '@/features/calendar/hooks/mutations/use-create-service-record.mutation';
import {
  CreateServiceRecordDto,
  CreateServiceRecordSchema,
  UpdateServiceRecordDto,
} from '@/server/api/routers/service-record/service-record.dto';
import useCalendarDialogStore from '@/features/calendar/stores/use-calendar-dialog.store';
import { toast } from '@/utils/toast-utils';

export type ServiceHistoryProps = {
  vehicleId: string;
  records: ServiceRecord[];
};

const ServiceHistory = ({ vehicleId, records }: ServiceHistoryProps) => {
  const { createServiceRecord, isCreating } = useCreateServiceRecordMutation();

  const setIsOpen = useCalendarDialogStore((state) => state.setOpen);
  const setInitialValues = useCalendarDialogStore(
    (state) => state.setInitialValues,
  );
  const setIsEdit = useCalendarDialogStore((state) => state.setIsEdit);

  const handleEventCreate = (
    data: CreateServiceRecordDto | UpdateServiceRecordDto,
  ) => {
    const parsedData = CreateServiceRecordSchema.safeParse(data);
    if (!parsedData.success) {
      toast(parsedData.error.message).error();
      return;
    }
    createServiceRecord(parsedData.data);
  };

  const handleCreateClick = () => {
    setIsOpen(true);
    setIsEdit(false);
    setInitialValues({
      vehicleId,
    });
  };

  if (!records.length) {
    return (
      <Card className="w-full">
        <SectionHeader
          title="Історія обслуговування"
          description="Хронологія технічного обслуговування та ремонту"
          icon={
            <div className="p-2 w-fit bg-orange-100 dark:bg-orange-900 rounded-lg">
              <WrenchIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          }
        >
          <Button
            className="max-sm:hidden max-[479px]:aspect-square max-[479px]:p-0!"
            icon={<PlusIcon size={16} aria-hidden="true" />}
            onClick={handleCreateClick}
          >
            <span className="max-sm:sr-only">Додати</span>
          </Button>
        </SectionHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <p className="text-slate-500">Немає обслуговувань</p>
          </div>
        </CardContent>
        <ServiceRecordDialog>
          <ServiceRecordForm
            initialData={{
              vehicleId,
            }}
            onSubmit={handleEventCreate}
            isLoading={isCreating}
          />
        </ServiceRecordDialog>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <SectionHeader
        title="Історія обслуговування"
        description="Хронологія технічного обслуговування та ремонту"
        icon={
          <div className="p-2 w-fit bg-orange-100 dark:bg-orange-900 rounded-lg">
            <WrenchIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
        }
      >
        <Button
          className="max-sm:hidden max-[479px]:aspect-square max-[479px]:p-0!"
          icon={<PlusIcon size={16} aria-hidden="true" />}
          onClick={handleCreateClick}
        >
          <span className="max-sm:sr-only">Додати</span>
        </Button>
      </SectionHeader>
      <CardContent>
        <ScrollArea className="h-[37rem]">
          <Timeline className="mx-1" defaultValue={2}>
            {records.map((record, index) => {
              const Icon = STATUS_MAPPER[record.status].icon;
              return (
                <TimelineItem key={record.id} step={index + 1} className="pb-8">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <TimelineIndicator
                        className={cn(
                          'flex size-6 items-center z-10 outline outline-background justify-center shrink-0',
                          STATUS_MAPPER[record.status].className,
                        )}
                      >
                        <Icon size={12} />
                      </TimelineIndicator>
                      {index < records.length - 1 && (
                        <TimelineSeparator className="top-5 bg-border z-0" />
                      )}
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <TimelineTitle className="text-slate-900 dark:text-slate-100 text-lg font-semibold">
                            {STATUS_MAPPER[record.status].label}
                          </TimelineTitle>
                          <TimelineDate className="text-slate-500 text-sm mt-1">
                            {record.endTime ? (
                              <>
                                {formatDate(record.endTime)} • Тривалість:{' '}
                                {formatShortDuration(
                                  differenceInMinutes(
                                    record.endTime,
                                    record.startTime,
                                  ),
                                )}
                              </>
                            ) : (
                              <>{formatDate(record.startTime)}</>
                            )}
                          </TimelineDate>
                        </div>
                        {record.totalPrice && (
                          <div className="text-right">
                            <div className="font-bold text-slate-900 dark:text-slate-100 text-xl">
                              {formatCurrency(record.totalPrice)}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 text-sm">
                          Виконані послуги:
                        </h4>
                        <div className="space-y-2">
                          {record.services.map((service) => (
                            <div
                              key={service.id}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-slate-700 dark:text-slate-300">
                                {service.title}
                              </span>
                              <span className="font-medium text-slate-900 dark:text-slate-100">
                                {formatCurrency(service.price)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <UserAvatar
                            image={record.employee.image || '/placeholder.svg'}
                            email={`${record.employee.firstName} ${record.employee.lastName}`}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                                {formatName(
                                  record.employee.firstName,
                                  record.employee.lastName,
                                  record.employee.middleName,
                                )}
                              </span>
                            </div>
                            {record.employee.phone && (
                              <span className="text-xs text-slate-500">
                                {record.employee.phone}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <OrganizationLogo
                            image={record.organization.logo ?? undefined}
                            name={record.organization.name}
                          />
                          <span className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                            {record.organization.name}
                          </span>
                        </div>
                      </div>

                      <TimelineContent className="text-slate-700 dark:text-slate-300 text-sm bg-white dark:bg-slate-900 p-4 rounded-lg border">
                        <strong className="text-slate-900 dark:text-slate-100">
                          Примітки:
                        </strong>
                        <br />
                        {record.notes || 'Примітки відсутні'}
                      </TimelineContent>
                    </div>
                  </div>
                </TimelineItem>
              );
            })}
          </Timeline>
        </ScrollArea>
      </CardContent>
      <ServiceRecordDialog>
        <ServiceRecordForm
          initialData={{
            vehicleId,
          }}
          onSubmit={handleEventCreate}
          isLoading={isCreating}
        />
      </ServiceRecordDialog>
    </Card>
  );
};

export default ServiceHistory;
