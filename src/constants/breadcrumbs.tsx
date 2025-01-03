import { ReactNode } from 'react';
import { Home } from 'lucide-react';
import { Routes } from './routes';

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
  '/dashboard/employees': [
    dashboardBreadcrumbs,
    { title: 'Працівники', link: '/dashboard/employees' },
  ],
};
