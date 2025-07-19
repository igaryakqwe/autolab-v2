'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Car,
  User,
  Wrench,
  Phone,
  Settings,
  CheckIcon,
  CalendarIcon,
  ClockIcon,
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/utils/style-utils';
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
import LicencePlate from '@/features/vehicles/components/licence-plate';

const vehicleData = {
  type: 'АВТОМОБІЛЬ',
  make: 'Chevrolet',
  model: 'Malibu',
  year: 2021,
  licensePlate: 'АА1234ВВ',
  vin: '1G1ZD5ST5MF123456',
  engine: '1.5L Turbo',
  engineVolume: 1.5,
  bodyStyle: 'Седан',
  client: {
    firstName: 'Олександр',
    lastName: 'Петренко',
    middleName: 'Іванович',
    phone: '+380 67 123 45 67',
  },
  serviceRecords: [
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

const VehiclePage = () => {
  return (
    <div className="h-fit">
      <div className="mb-4">
        <div className="flex items-center flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Image
              src="/icons/chevrolet.svg"
              alt={`Логотип ${vehicleData.make}`}
              width={75}
              height={75}
              className="rounded-lg bg-white p-2 shadow-sm border"
            />
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {vehicleData.year} {vehicleData.make} {vehicleData.model}
              </h1>
              <div className="flex items-center gap-4 mt-1">
                {vehicleData.licensePlate && (
                  <LicencePlate plateNumber={vehicleData.licensePlate} />
                )}
                <Badge variant="secondary" className="font-medium">
                  {vehicleData.type}
                </Badge>
              </div>
            </div>
          </div>
          <div className="ml-auto">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Settings className="h-4 w-4" />
              Керувати
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-6 w-full lg:flex-nowrap flex-wrap">
        <div className="flex flex-col gap-6 w-full">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Car className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                Технічні характеристики
              </CardTitle>
              <CardDescription>
                Технічні деталі та ідентифікація
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Марка і модель
                    </p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {vehicleData.make} {vehicleData.model}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Рік випуску
                    </p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {vehicleData.year}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Тип кузова
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {vehicleData.bodyStyle || 'Не вказано'}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Двигун
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {vehicleData.engine || 'Не вказано'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Об&apos;єм двигуна
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {vehicleData.engineVolume
                        ? `${vehicleData.engineVolume}л`
                        : 'Не вказано'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Номерний знак
                    </p>
                    <p className="text-sm font-mono text-slate-700 dark:text-slate-300">
                      {vehicleData.licensePlate || 'Не вказано'}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Ідентифікаційний номер транспортного засобу
                </p>
                <p className="text-sm font-mono bg-slate-100 dark:bg-slate-800 p-3 rounded-lg border">
                  {vehicleData.vin || 'Не вказано'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                  <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                Власник автомобіля
              </CardTitle>
              <CardDescription>Контактна інформація клієнта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <UserAvatar
                  size={20}
                  className="w-16 h-16"
                  email={vehicleData.client.phone}
                />
                <div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {vehicleData.client.lastName} {vehicleData.client.firstName}{' '}
                    {vehicleData.client.middleName}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {vehicleData.client.phone}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
              {vehicleData.serviceRecords.map((record, index) => {
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
                            isPending &&
                              'bg-amber-500 border-amber-500 text-white',
                          )}
                        >
                          {isCompleted && <CheckIcon size={12} />}
                          {isInProgress && <ClockIcon size={12} />}
                          {isPending && <CalendarIcon size={12} />}
                        </TimelineIndicator>
                        {index < vehicleData.serviceRecords.length - 1 && (
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
      </div>
    </div>
  );
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

export default VehiclePage;
