import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PageContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

const PageContainer = ({ children, scrollable = true }: PageContainerProps) => {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-52px)]">
          <div className="h-full p-4 md:px-6">{children}</div>
        </ScrollArea>
      ) : (
        <div className="h-full p-4 md:px-6">{children}</div>
      )}
    </>
  );
};

export default PageContainer;
