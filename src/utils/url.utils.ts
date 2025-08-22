import { routeMapping } from '@/constants/breadcrumbs';
import {
  DashboardHeading,
  dashboardHeadings,
  Route,
} from '@/constants/dashboard-headings';

const getMatchedRoute = (
  pathname: string,
  routeMapping: Record<string, unknown>,
): string | undefined => {
  if (routeMapping[pathname]) {
    return pathname;
  }

  return Object.keys(routeMapping).find((route) => {
    const routePattern = route.split('?')[0];

    if (routePattern.includes(':')) {
      const regex = new RegExp(`^${routePattern.replace(/:\w+/g, '[^/]+')}$`);
      if (regex.test(pathname)) {
        return true;
      }
    }

    if (route.includes('?')) {
      return routePattern === pathname;
    }

    return false;
  });
};

export const isMatchedBreadcrumb = (pathname: string): string | undefined => {
  return getMatchedRoute(pathname, routeMapping);
};

export const getDashboardHeading = (
  pathname: string,
): DashboardHeading | undefined => {
  const matchedRoute = getMatchedRoute(pathname, dashboardHeadings);
  return dashboardHeadings[matchedRoute as Route];
};
