import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon: ReactNode;
  children?: ReactNode;
}

const SectionHeader = ({
  title,
  description,
  icon,
  children,
}: PageHeaderProps) => {
  return (
    <CardHeader className="pb-4 flex flex-row justify-between items-center flex-wrap">
      <div className="flex flex-col gap-2">
        <CardTitle className="flex gap-2 items-center text-slate-900 dark:text-slate-100">
          {icon}
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </div>
      {children}
    </CardHeader>
  );
};

export default SectionHeader;
