'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, unstable_httpBatchStreamLink } from '@trpc/client';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { PropsWithChildren, useState } from 'react';
import { HTTPHeaders } from '@trpc/client';

import { type AppRouter } from '@/server/api/root';
import { createTRPCReact } from '@trpc/react-query';
import { getUrl, transformer } from '@/lib/trpc/shared';
import { createQueryClient } from '@/lib/trpc/shared';

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return createQueryClient();
  }
  return (clientQueryClientSingleton ??= createQueryClient());
};

export const api = createTRPCReact<AppRouter>();

export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;

const TRPCReactProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: getUrl(),
          headers: () => {
            const headers: HTTPHeaders = {
              'x-trpc-source': 'nextjs-react',
            };
            return headers;
          },
          transformer,
        }),
        unstable_httpBatchStreamLink({
          url: '/api/trpc/stream',
          headers: () => {
            const headers: HTTPHeaders = {
              'x-trpc-source': 'nextjs-react',
            };
            return headers;
          },
          transformer,
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </api.Provider>
    </QueryClientProvider>
  );
};

export default TRPCReactProvider;
