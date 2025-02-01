import Link, { LinkProps } from 'next/link';
import { OrganizationRoutes } from '@/constants/routes';
import { forwardRef, PropsWithChildren } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';

interface OrganizationLinkProps extends PropsWithChildren<LinkProps> {
  href: OrganizationRoutes;
}

const OrganizationLink = forwardRef<HTMLAnchorElement, OrganizationLinkProps>(
  ({ href, children, ...props }, ref) => {
    const { storedValue: organizationId } = useLocalStorage(
      'selectedOrganization',
      '',
    );

    const organizationRoute = href.replace(':id', organizationId);

    return (
      <Link href={organizationRoute} ref={ref} {...props}>
        {children}
      </Link>
    );
  },
);

OrganizationLink.displayName = 'OrganizationLink';

export default OrganizationLink;
