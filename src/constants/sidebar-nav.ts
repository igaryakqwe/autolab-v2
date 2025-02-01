import { CarFront, UserCircle, Users, Wrench } from 'lucide-react';
import { ElementType } from 'react';
import { OrganizationRoutes } from '@/constants/routes';

export interface NavLink {
  title: string;
  url: OrganizationRoutes;
  icon: ElementType;
  isActive?: boolean;
  items?: NavLink[];
}

export const organizationNav: NavLink[] = [
  {
    title: 'Працівники',
    url: OrganizationRoutes.Employees,
    icon: Users,
    isActive: true,
  },
  {
    title: 'Клієнти',
    url: OrganizationRoutes.Clients,
    icon: UserCircle,
  },
  {
    title: 'Послуги',
    url: OrganizationRoutes.Services,
    icon: Wrench,
  },
  {
    title: 'Авто',
    url: OrganizationRoutes.Vehicles,
    icon: CarFront,
  },
];
