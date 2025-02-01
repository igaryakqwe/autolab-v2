import { Building2, CarFront, User, Wrench } from 'lucide-react';
import ProfileTab from '@/features/account/components/tabs/profile-tab';
import AccountTab from '@/features/account/components/tabs/account-tab';
import OrganizationsTab from '@/features/account/components/tabs/organizations-tab';

export const profileTabs = [
  {
    id: 'profile',
    label: 'Профіль',
    icon: User,
    content: ProfileTab,
  },
  {
    id: 'account',
    label: 'Аккаунт',
    icon: Wrench,
    content: AccountTab,
  },
  {
    id: 'organizations',
    label: 'Організації',
    icon: Building2,
    content: OrganizationsTab,
  },
  {
    id: 'vehicles',
    label: 'Транспорт',
    icon: CarFront,
    content: 'Vehicle settings',
  },
];
