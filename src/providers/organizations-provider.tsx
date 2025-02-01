'use client';

import { FC, PropsWithChildren, useEffect, useCallback } from 'react';
import { api } from '@/lib/trpc/client';
import useOrganizationsStore, {
  hydrateStore,
} from '@/store/use-organizations-store';
import useLocalStorage from '@/hooks/use-local-storage';

const OrganizationsProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    organizations,
    setLoading,
    currentOrganization,
    setCurrentOrganization,
  } = useOrganizationsStore();

  const { storedValue, setValue } = useLocalStorage<string>(
    'selectedOrganization',
    organizations[0]?.id,
  );

  const { data, isLoading } = api.organization.getMy.useQuery();

  const stableSetLoading = useCallback(setLoading, []);

  useEffect(() => {
    stableSetLoading(isLoading);
    if (data && !isLoading && !organizations.length) {
      hydrateStore(data);
    }
  }, [data, isLoading, organizations.length, stableSetLoading]);

  useEffect(() => {
    if (organizations.length) {
      if (!storedValue) {
        setValue(organizations[0]?.id);
      }
      if (!currentOrganization) {
        setCurrentOrganization(organizations[0]?.id);
      }
    }
  }, [organizations, storedValue, currentOrganization]);

  return children;
};

export default OrganizationsProvider;
