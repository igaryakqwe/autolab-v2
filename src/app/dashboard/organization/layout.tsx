import { PropsWithChildren } from 'react';
import OrganizationProvider from '@/providers/organization-provider';

const OrganizationLayout = ({ children }: PropsWithChildren) => {
  return <OrganizationProvider>{children}</OrganizationProvider>;
};

export default OrganizationLayout;
