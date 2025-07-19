'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useId, useMemo, useRef, useState, useEffect } from 'react';
import {
  useController,
  Control,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import {
  useVirtualizer,
  VirtualItem,
  Virtualizer,
} from '@tanstack/react-virtual';

import { cn } from '@/utils/style-utils';
import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandList } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from './label';

export type ComboboxOption = {
  label: string;
  value: unknown;
};

type ComboboxFormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  description?: string;
  options: ComboboxOption[];
  emptyMessage?: string;
  searchPlaceholder?: string;
  className?: string;
  error?: string;
  maxHeight?: number;
  itemHeight?: number;
  overscan?: number;
};

export function ComboboxFormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  placeholder = 'Select an option',
  description,
  options,
  emptyMessage = 'No options found.',
  searchPlaceholder = 'Search...',
  className,
  error,
  maxHeight = 300,
  itemHeight = 36,
  overscan = 5,
}: ComboboxFormFieldProps<TFieldValues, TName>) {
  const id = useId();
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);

  const { field, fieldState } = useController({
    name,
    control,
  });

  const errorMessage = error || fieldState.error?.message;

  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;

    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [options, searchValue]);

  const containerHeight = Math.min(
    maxHeight,
    filteredOptions.length * itemHeight,
  );

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan,
  });

  useEffect(() => {
    if (isOpen && filteredOptions.length > 0) {
      const checkAndMeasure = () => {
        if (parentRef.current) {
          virtualizer.measure();
        } else {
          requestAnimationFrame(checkAndMeasure);
        }
      };

      const timer = setTimeout(checkAndMeasure, 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen, filteredOptions.length, virtualizer]);

  const handleSelect = (optionValue: unknown) => {
    field.onChange(optionValue);
    setIsOpen(false);
    setSearchValue('');
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSearchValue('');
    }
  };

  return (
    <div className={cn('space-y-1', className)}>
      <Label htmlFor={id}>{label}</Label>
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            value={undefined}
            className={cn(
              'w-full justify-between',
              !field.value && 'text-muted-foreground',
            )}
            aria-invalid={!!errorMessage}
            aria-expanded={isOpen}
          >
            {field.value
              ? options.find((option) => option.value === field.value)?.label
              : placeholder}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start" sideOffset={4}>
          <Command shouldFilter={false} className="overflow-hidden">
            <CommandInput
              placeholder={searchPlaceholder}
              className="h-9"
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList className="max-h-[300px] overflow-hidden">
              {filteredOptions.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </div>
              ) : (
                <div
                  ref={parentRef}
                  style={{
                    height: containerHeight,
                    minHeight: itemHeight,
                  }}
                >
                  <div
                    style={{
                      height: virtualizer.getTotalSize(),
                      width: '100%',
                      position: 'relative',
                    }}
                  >
                    {virtualizer.getVirtualItems().map((virtualItem) => {
                      const option = filteredOptions[virtualItem.index];
                      if (!option) return null;

                      const isSelected = option.value === field.value;

                      return (
                        <ComboboxItem
                          key={`${virtualItem.key}-${option.value}`}
                          option={option}
                          isSelected={isSelected}
                          virtualItem={virtualItem}
                          handleSelect={handleSelect}
                          virtualizer={
                            virtualizer as unknown as Virtualizer<
                              HTMLDivElement,
                              HTMLDivElement
                            >
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {errorMessage && (
        <p className="text-sm font-medium text-destructive">{errorMessage}</p>
      )}
    </div>
  );
}

interface ComboboxItemProps {
  option: ComboboxOption;
  isSelected: boolean;
  virtualItem: VirtualItem;
  handleSelect: (value: unknown) => void;
  virtualizer: Virtualizer<HTMLDivElement, HTMLDivElement>;
}

const ComboboxItem = ({
  option,
  isSelected,
  virtualItem,
  handleSelect,
  virtualizer,
}: ComboboxItemProps) => {
  return (
    <div
      data-index={virtualItem.index}
      ref={virtualizer.measureElement}
      className={cn(
        'absolute top-0 left-0 w-full flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        isSelected ? 'bg-accent text-accent-foreground' : '',
      )}
      style={{
        height: virtualItem.size,
        transform: `translateY(${virtualItem.start}px)`,
      }}
      onClick={() => handleSelect(option.value)}
      onMouseDown={(e) => e.preventDefault()}
    >
      <Check
        className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')}
      />
      {option.label}
    </div>
  );
};
