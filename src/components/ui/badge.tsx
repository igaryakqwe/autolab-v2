import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/style-utils';

const badgeVariants = cva(
  'inline-flex items-center rounded border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
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

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
