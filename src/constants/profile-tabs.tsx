import { Building2, CarFront, User, Wrench } from 'lucide-react';
import ProfileTab from '@/features/account/components/tabs/profile-tab';
import AccountTab from '@/features/account/components/tabs/account-tab';
import OrganisationsTab from '@/features/account/components/tabs/organisations-tab';

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
    content: OrganisationsTab,
  },
  {
    id: 'vehicles',
    label: 'Транспорт',
    icon: CarFront,
    content: 'Vehicle settings',
  },
];
