import { cn } from '@/utils/style-utils';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <Loader2 className={cn('text-primary w-10 h-10 animate-spin', className)} />
  );
};

export default LoadingSpinner;
