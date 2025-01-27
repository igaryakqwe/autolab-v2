import type { Metadata } from 'next';
import '@/theme/globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Providers from '@/providers';
import { Toaster } from 'sonner';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: {
    template: '%s | Autolab',
    default: 'Головна',
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased max-h-screen`}
      >
        <NextTopLoader showSpinner={false} color="#f6450e" />
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
