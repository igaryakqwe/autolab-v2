import { BadgeCheck, Settings } from 'lucide-react';
import { Routes } from '@/constants/routes';

const userNavigation = [
  {
    label: 'Профіль',
    icon: BadgeCheck,
    href: Routes.Account,
  },
  {
    label: 'Налаштування',
    icon: Settings,
    href: Routes.AccountSettings,
  },
];

export default userNavigation;
