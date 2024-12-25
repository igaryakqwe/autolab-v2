import { PropsWithChildren } from 'react';
import ThemeProvider from '@/providers/theme-provider';
import TRPCReactProvider from '@/lib/trpc/client';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import KeyboardProvider from '@/providers/keyboard-provider';

const Providers = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <NuqsAdapter>
        <TRPCReactProvider>
          <KeyboardProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </KeyboardProvider>
        </TRPCReactProvider>
      </NuqsAdapter>
    </SessionProvider>
  );
};

export default Providers;
