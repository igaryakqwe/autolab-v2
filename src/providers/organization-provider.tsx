'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useQueryState } from 'nuqs';
import useOrganizationsStore from '@/store/use-organizations-store';

const OrganizationProvider = ({ children }: PropsWithChildren) => {
  const [, setOrgId] = useQueryState('organizationId');

  const { currentOrganization } = useOrganizationsStore();

  useEffect(() => {
    setOrgId(currentOrganization);
  }, [currentOrganization]);

  return children;
};

export default OrganizationProvider;
