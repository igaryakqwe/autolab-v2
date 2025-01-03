'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { routeMapping } from '@/constants/breadcrumbs';

const useBreadcrumbs = () => {
  const pathname = usePathname();

  return useMemo(() => {
    const matchedRoute = Object.keys(routeMapping).find((route) => {
      const regex = new RegExp(`^${route.replace('*', '[^/]+')}$`);
      return regex.test(pathname);
    });

    if (matchedRoute) {
      const segments = pathname.split('/').filter(Boolean);
      const dynamicSegment = segments[segments.length - 1];
      return routeMapping[matchedRoute].map((breadcrumb) => {
        if (breadcrumb.link === '') {
          return {
            ...breadcrumb,
            icon: breadcrumb.icon,
            link: pathname,
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
  }, [pathname]);
};

export default useBreadcrumbs;
