import { OrganizationRoutes, Routes } from '@/constants/routes';

export interface DashboardHeading {
  title: string;
  description: string;
}

export type Route = Routes | OrganizationRoutes;

export const dashboardHeadings = {
  [Routes.AccountSettings]: {
    title: 'Налаштування',
  },
  [OrganizationRoutes.Home]: {
    title: 'Організація',
  },
  [OrganizationRoutes.Employees]: {
    title: 'Працівники',
  },
  [OrganizationRoutes.Clients]: {
    title: 'Клієнти',
  },
  [OrganizationRoutes.Services]: {
    title: 'Послуги',
  },
  [OrganizationRoutes.Vehicles]: {
    title: 'Авто',
  },
  [OrganizationRoutes.Calendar]: {
    title: 'Календар',
  },
} as Record<Route, DashboardHeading>;
