import 'server-only';

import { cache } from 'react';
import { headers } from 'next/headers';
import { createTRPCContext } from '@/server/api/trpc';
import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { AppRouter, createCaller } from '@/server/api/root';
import { createQueryClient } from '@/lib/trpc/shared';

const createContext = cache(async () => {
  const heads = new Headers(headers());
  heads.set('x-trpc-source', 'rsc');

  return await createTRPCContext({
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
