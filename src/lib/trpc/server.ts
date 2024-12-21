import 'server-only';

import { cache } from 'react';
import { headers } from 'next/headers';
import { createTRPCContext } from './trpc';
import { appRouter, AppRouter } from './root';
import { createTRPCClient, httpLink, TRPCClientError } from '@trpc/client';
import { getUrl, transformer } from '@/lib/trpc/shared';
import { observable } from '@trpc/server/observable';
import { callProcedure } from '@trpc/server';
import { TRPCErrorResponse } from '@trpc/server/rpc';

const createContext = cache(async () => {
  const heads = new Headers(headers());
  heads.set('x-trpc-source', 'rsc');

  return await createTRPCContext({
    headers: heads,
  });
});

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpLink({
      url: getUrl(),
      transformer,
    }),
    /**
     * Custom RSC link that lets us invoke procedures without using http requests. Since Server
     * Components always run on the server, we can just call the procedure as a function.
     */
    () =>
      ({ op }) =>
        observable((observer) => {
          createContext()
            .then((ctx) => {
              return callProcedure({
                procedures: appRouter._def.procedures,
                path: op.path,
                input: op.input,
                signal: op.signal ?? undefined,
                getRawInput: async () => op.input,
                ctx,
                type: op.type,
              });
            })
            .then((data) => {
              observer.next({ result: { data } });
              observer.complete();
            })
            .catch((cause: TRPCErrorResponse) => {
              observer.error(TRPCClientError.from(cause));
            });
        }),
  ],
});
