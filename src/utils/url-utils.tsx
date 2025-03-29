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
  return Object.keys(routeMapping).find((route) => {
    if (!route.includes('?')) {
      return pathname === route;
    }

    const regex = new RegExp(
      `^${route.split('?')[0].replace(':id', '[^/]+')}$`,
    );
    return regex.test(pathname);
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
