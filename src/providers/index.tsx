import { PropsWithChildren } from 'react';
import ThemeProvider from '@/providers/theme-provider';
import TRPCReactProvider from '@/lib/trpc/client';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const Providers = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <NuqsAdapter>
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
      </NuqsAdapter>
    </SessionProvider>
  );
};

export default Providers;
