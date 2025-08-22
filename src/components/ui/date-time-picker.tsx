'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { cn } from '@/utils/style-utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { uk } from 'date-fns/locale';

export interface DateTimePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  label?: string;
  error?: string;
  control?: Control<TFieldValues>;
  name?: TName;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  dateFormat?: string;
  disabled?: boolean;
  minuteStep?: number;
  className?: string;
  triggerClassName?: string;
  popoverClassName?: string;
}

export function DateTimePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  error,
  control,
  name,
  value: externalValue,
  onChange: externalOnChange,
  placeholder = 'Select date and time',
  dateFormat = 'dd/MM/yyyy HH:mm',
  disabled = false,
  minuteStep = 5,
  className,
  triggerClassName,
  popoverClassName,
}: DateTimePickerProps<TFieldValues, TName>) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    externalValue,
  );
  const [isOpen, setIsOpen] = React.useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from(
    { length: 60 / minuteStep },
    (_, i) => i * minuteStep,
  );

  const handleDateSelect = (
    selectedDate: Date | undefined,
    onChange?: (date: Date | undefined) => void,
  ) => {
    if (selectedDate) {
      const newDate = internalDate ? new Date(internalDate) : new Date();
      newDate.setFullYear(selectedDate.getFullYear());
      newDate.setMonth(selectedDate.getMonth());
      newDate.setDate(selectedDate.getDate());

      if (onChange) {
        onChange(newDate);
      } else {
        setInternalDate(newDate);
        externalOnChange?.(newDate);
      }
    }
  };

  const handleTimeChange = (
    type: 'hour' | 'minute',
    timeValue: string,
    currentDate: Date | undefined,
    onChange?: (date: Date | undefined) => void,
  ) => {
    if (currentDate) {
      const newDate = new Date(currentDate);
      if (type === 'hour') {
        newDate.setHours(parseInt(timeValue));
      } else if (type === 'minute') {
        newDate.setMinutes(parseInt(timeValue));
      }

      if (onChange) {
        onChange(newDate);
      } else {
        setInternalDate(newDate);
        externalOnChange?.(newDate);
      }
    } else {
      const now = new Date();
      if (type === 'hour') {
        now.setHours(parseInt(timeValue));
      } else if (type === 'minute') {
        now.setMinutes(parseInt(timeValue));
      }

      if (onChange) {
        onChange(now);
      } else {
        setInternalDate(now);
        externalOnChange?.(now);
      }
    }
  };

  const DateTimePickerContent = ({
    date,
    onChange,
  }: {
    date: Date | undefined;
    onChange: (date: Date | undefined) => void;
  }) => (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id={name}
            variant="outline"
            disabled={disabled}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              triggerClassName,
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, dateFormat, { locale: uk })
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-auto p-0', popoverClassName)}>
          <div className="sm:flex">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) =>
                handleDateSelect(selectedDate, onChange)
              }
              disabled={disabled}
              initialFocus
              locale={uk}
            />
            <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {hours.map((hour) => (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        date && date.getHours() === hour ? 'default' : 'ghost'
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() =>
                        handleTimeChange(
                          'hour',
                          hour.toString(),
                          date,
                          onChange,
                        )
                      }
                      disabled={disabled}
                    >
                      {hour.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {minutes.map((minute) => (
                    <Button
                      key={minute}
                      size="icon"
                      variant={
                        date && date.getMinutes() === minute
                          ? 'default'
                          : 'ghost'
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() =>
                        handleTimeChange(
                          'minute',
                          minute.toString(),
                          date,
                          onChange,
                        )
                      }
                      disabled={disabled}
                    >
                      {minute.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );

  if (control && name) {
    return (
      <div className={className}>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <DateTimePickerContent
              date={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <DateTimePickerContent
        date={internalDate}
        onChange={(date) => {
          setInternalDate(date);
          externalOnChange?.(date);
        }}
      />
    </div>
  );
}
