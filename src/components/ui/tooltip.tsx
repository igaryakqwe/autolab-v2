'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/utils/style-utils';
import { cva, type VariantProps } from 'class-variance-authority';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const tooltipVariants = cva(
  'z-50 font-medium overflow-hidden rounded-md px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'border bg-background text-foreground',
        blue: 'border-transparent bg-blue-600 text-white hover:bg-blue-700',
        green: 'border-transparent bg-green-600 text-white hover:bg-green-700',
        red: 'border-transparent bg-red-600 text-white hover:bg-red-700',
        yellow:
          'border-transparent bg-yellow-600 text-white hover:bg-yellow-700',
        purple:
          'border-transparent bg-purple-600 text-white hover:bg-purple-700',
        pink: 'border-transparent bg-pink-600 text-white hover:bg-pink-700',
        indigo:
          'border-transparent bg-indigo-600 text-white hover:bg-indigo-700',
        teal: 'border-transparent bg-teal-600 text-white hover:bg-teal-700',
        orange:
          'border-transparent bg-orange-600 text-white hover:bg-orange-700',
        cyan: 'border-transparent bg-cyan-600 text-white hover:bg-cyan-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface TooltipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipVariants> {}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipProps & React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, variant, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(tooltipVariants({ variant }), className)}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
