'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { routeMapping } from '@/constants/breadcrumbs';
import { isMatchedBreadcrumb } from '@/utils/url-utils';

const useBreadcrumbs = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useMemo(() => {
    const currentPath =
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

    const matchedRoute = isMatchedBreadcrumb(pathname);

    if (matchedRoute) {
      const segments = pathname.split('/').filter(Boolean);
      const dynamicSegment = segments[segments.length - 1];
      return routeMapping[matchedRoute].map((breadcrumb) => {
        if (breadcrumb.link === '') {
          return {
            ...breadcrumb,
            icon: breadcrumb.icon,
            link: currentPath,
            title: dynamicSegment,
          };
        }
        return breadcrumb;
      });
    }

    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        link: path,
        icon: routeMapping[path]?.[index]?.icon,
      };
    });
  }, [pathname, searchParams]);
};

export default useBreadcrumbs;
