import { OrganizationRoutes, Routes } from '@/constants/routes';

export interface DashboardHeading {
  title: string;
  description: string;
}

export type Route = Routes | OrganizationRoutes;

export const dashboardHeadings = {
  [Routes.AccountSettings]: {
    title: 'Налаштування',
    description:
      'Тут ви можете ввести інформацію про себе, змінити пароль, створити організацію і додати авто',
  },
  [OrganizationRoutes.Home]: {
    title: 'Організація',
    description: 'Основна інформація про організацію',
  },
  [OrganizationRoutes.Employees]: {
    title: 'Працівники',
    description: 'Тут ви можете переглянути інформацію про працівників',
  },
  [OrganizationRoutes.Clients]: {
    title: 'Клієнти',
    description: 'Тут ви можете переглянути інформацію про клієнтів',
  },
  [OrganizationRoutes.Services]: {
    title: 'Послуги',
    description: 'Тут ви можете переглянути інформацію про послуги',
  },
  [OrganizationRoutes.Vehicles]: {
    title: 'Авто',
    description: 'Тут ви можете переглянути інформацію про авто',
  },
  [OrganizationRoutes.Calendar]: {
    title: 'Календар',
    description: 'Тут ви можете переглянути розклад роботи',
  },
} as Record<Route, DashboardHeading>;
