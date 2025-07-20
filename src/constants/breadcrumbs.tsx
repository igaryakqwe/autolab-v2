import { ReactNode } from 'react';
import { Home } from 'lucide-react';
import { OrganizationRoutes, Routes } from './routes';

type BreadcrumbItem = {
  title?: string;
  link: string;
  icon?: ReactNode;
};

const dashboardBreadcrumbs: BreadcrumbItem = {
  icon: <Home size={16} />,
  link: Routes.Dashboard,
};

export const routeMapping: Record<string, BreadcrumbItem[]> = {
  [Routes.Dashboard]: [dashboardBreadcrumbs],
  [Routes.Account]: [
    dashboardBreadcrumbs,
    { title: 'Профіль', link: Routes.Account },
  ],
  [Routes.AccountSettings]: [
    dashboardBreadcrumbs,
    { title: 'Профіль', link: Routes.Account },
    { title: 'Налаштування', link: Routes.AccountSettings },
  ],
  [OrganizationRoutes.Employees]: [
    dashboardBreadcrumbs,
    { title: 'Організація', link: OrganizationRoutes.Home },
    { title: 'Працівники', link: OrganizationRoutes.Employees },
  ],
  [OrganizationRoutes.Clients]: [
    dashboardBreadcrumbs,
    { title: 'Організація', link: OrganizationRoutes.Home },
    { title: 'Клієнти', link: OrganizationRoutes.Clients },
  ],
  [OrganizationRoutes.Services]: [
    dashboardBreadcrumbs,
    { title: 'Організація', link: OrganizationRoutes.Home },
    { title: 'Послуги', link: OrganizationRoutes.Services },
  ],
  [OrganizationRoutes.Vehicles]: [
    dashboardBreadcrumbs,
    { title: 'Організація', link: OrganizationRoutes.Home },
    { title: 'Авто', link: OrganizationRoutes.Vehicles },
  ],
  [Routes.Vehicle]: [
    dashboardBreadcrumbs,
    { title: 'Авто', link: OrganizationRoutes.Vehicles },
  ],
};
