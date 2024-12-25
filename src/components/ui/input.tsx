import * as React from 'react';
import { cn } from '@/utils/style-utils';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
  password?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, password, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    return (
      <div className="space-y-1">
        {label && <Label>{label}</Label>}
        <div className="relative">
          <input
            type={password && isVisible ? 'text' : password ? 'password' : type}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              password ? 'pe-9' : '',
              className,
            )}
            ref={ref}
            {...props}
          />
          {password && (
            <Button
              size="icon"
              variant="link"
              className="absolute inset-y-0 end-0 flex h-full w-10 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              onClick={toggleVisibility}
              aria-label={isVisible ? 'Hide password' : 'Show password'}
              aria-pressed={isVisible}
              aria-controls="password"
            >
              {isVisible ? (
                <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
              ) : (
                <Eye size={16} strokeWidth={2} aria-hidden="true" />
              )}
            </Button>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
