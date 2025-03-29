'use client';
import { usePathname } from 'next/navigation';
import { getDashboardHeading } from '@/utils/url-utils';

export const Heading = () => {
  const pathname = usePathname();
  const headingData = getDashboardHeading(pathname);

  if (!headingData) return null;

  const { title, description } = headingData;

  return (
    <div className="grid gap-1 mb-2">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-base text-muted-foreground">{description}</p>
      )}
      <div className="w-full h-[1px] bg-muted" />
    </div>
  );
};
