'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  ComboboxFormField,
  MultiSelectCombobox,
} from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useOrganizationsStore from '@/store/use-organizations-store';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import useFormData from '@/features/calendar/hooks/use-form-data';
import { STATUS_MAPPER } from '@/features/vehicles/lib/constants';
import { cn } from '@/utils/style-utils';
import {
  CreateServiceRecordDto,
  CreateServiceRecordSchema,
  UpdateServiceRecordDto,
  UpdateServiceRecordSchema,
} from '@/server/api/routers/service-record/service-record.dto';
import { formatShortDuration } from '@/utils/date.utils';
import { formatCurrency } from '@/utils/currency.utils';
import { Textarea } from '@/components/ui/textarea';
import { ServiceStatus } from '@/types/models/vehicle';

interface ServiceRecordFormProps {
  onSubmit: (data: CreateServiceRecordDto | UpdateServiceRecordDto) => void;
  isLoading?: boolean;
  initialData?: UpdateServiceRecordDto;
}

const ServiceRecordForm = ({
  onSubmit,
  isLoading,
  initialData,
}: ServiceRecordFormProps) => {
  const { currentOrganization } = useOrganizationsStore();
  const form = useForm<CreateServiceRecordDto>({
    resolver: zodResolver(CreateServiceRecordSchema),
    defaultValues: {
      vehicleId: initialData?.vehicleId || '',
      employeeId: initialData?.employeeId || '',
      organizationId: currentOrganization!,
      services: initialData?.services || [],
      totalPrice: initialData?.totalPrice || 0,
      status: initialData?.status || 'PENDING',
      startTime: initialData?.startTime,
      endTime: initialData?.endTime,
      notes: initialData?.notes,
    },
  });

  const { vehicles, employees, services, servicesOptions } = useFormData();

  const watchedServices = useWatch({
    control: form.control,
    name: 'services',
  });

  const watchedStartTime = useWatch({
    control: form.control,
    name: 'startTime',
  });

  const { totalPrice, totalDuration } = useMemo(() => {
    const selectedServices = services.filter((service) =>
      watchedServices?.includes(service.id),
    );

    const price = selectedServices.reduce(
      (sum, service) => sum + service.price,
      0,
    );
    const duration = selectedServices.reduce(
      (sum, service) => sum + service.duration,
      0,
    );

    return { totalPrice: price, totalDuration: duration };
  }, [watchedServices]);

  useEffect(() => {
    form.setValue('totalPrice', Number(totalPrice.toFixed(2)));

    if (watchedStartTime && totalDuration > 0) {
      const endTime = new Date(
        watchedStartTime.getTime() + totalDuration * 60000,
      );
      form.setValue('endTime', endTime);
    }
  }, [totalPrice, totalDuration, watchedStartTime, form]);

  const submitForm = (
    data: CreateServiceRecordDto | UpdateServiceRecordDto,
  ) => {
    const parsedData = UpdateServiceRecordSchema.safeParse(data);
    if (parsedData.success) {
      onSubmit({ id: initialData?.id, ...parsedData.data });
    } else {
      onSubmit(data);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(submitForm)}
      className="space-y-2 my-2 mx-1"
    >
      <ComboboxFormField
        name="vehicleId"
        control={form.control}
        label="Транспортний засіб"
        placeholder="Оберіть транспортний засіб"
        options={vehicles}
        searchPlaceholder="Пошук транспортних засобів..."
      />

      <ComboboxFormField
        name="employeeId"
        control={form.control}
        label="Співробітник"
        placeholder="Оберіть співробітника"
        options={employees}
        searchPlaceholder="Пошук співробітників..."
      />

      <MultiSelectCombobox
        name="services"
        control={form.control}
        label="Послуги"
        placeholder="Оберіть послуги"
        options={servicesOptions}
        searchPlaceholder="Пошук послуг..."
      />

      <DateTimePicker
        label="Час початку"
        name="startTime"
        control={form.control}
        placeholder="Оберіть дату та час початку"
        dateFormat="PPP p"
      />

      <DateTimePicker
        label="Час закінчення"
        name="endTime"
        control={form.control}
        placeholder="Оберіть дату та час закінчення"
        dateFormat="PPP p"
      />

      <Input
        label="Загальна вартість"
        inputMode="numeric"
        className="bg-muted font-medium"
        {...form.register('totalPrice', {
          valueAsNumber: true,
        })}
        error={form.formState.errors.totalPrice?.message}
      />

      <div className="space-y-1">
        <Label>Статус</Label>
        <Select
          value={form.watch('status')}
          onValueChange={(value: ServiceStatus) =>
            form.setValue('status', value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Оберіть статус" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(STATUS_MAPPER).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                <div className="flex gap-2 items-center">
                  <div className={cn(value.className, 'p-1 rounded-full')}>
                    <value.icon className="size-3" />
                  </div>
                  <span className="font-medium">{value.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Textarea
        label="Примітки"
        {...form.register('notes')}
        error={form.formState.errors.notes?.message}
      />

      {watchedServices?.length > 0 && (
        <div className="p-4 bg-muted rounded-lg space-y-2">
          <h4 className="font-medium">Підсумок</h4>
          <div className="text-sm space-y-1">
            <p>Загальна тривалість: {formatShortDuration(totalDuration)}</p>
            <p>Загальна вартість: {formatCurrency(totalPrice)}</p>
            {watchedStartTime && form.watch('endTime') && (
              <p>
                Час: {format(watchedStartTime, 'HH:mm')} -{' '}
                {format(form.watch('endTime')!, 'HH:mm')}
              </p>
            )}
          </div>
        </div>
      )}

      <Button isLoading={isLoading} type="submit" className="w-full">
        Зберегти
      </Button>
    </form>
  );
};

export default ServiceRecordForm;
