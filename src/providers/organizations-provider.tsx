'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { api } from '@/lib/trpc/client';
import useOrganizationsStore, {
  hydrateStore,
} from '@/store/use-organizations-store';

const OrganizationsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { organizations, setLoading } = useOrganizationsStore();

  const { data, isLoading } = api.organization.getMy.useQuery();

  useEffect(() => {
    setLoading(isLoading);
    if (data && !isLoading && !organizations.length) {
      hydrateStore(data);
    }
  }, [data, isLoading, organizations, setLoading]);

  return children;
};

export default OrganizationsProvider;
