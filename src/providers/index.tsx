import { PropsWithChildren } from 'react';
import ThemeProvider from '@/providers/theme-provider';
import TRPCReactProvider from '@/lib/trpc/client';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </TRPCReactProvider>
  );
};

export default Providers;
