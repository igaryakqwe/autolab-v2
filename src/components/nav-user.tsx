'use client';

import { ChevronsUpDown } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useSession } from 'next-auth/react';
import UserAvatar from '@/components/user-avatar';
import UserDropdown from '@/components/user-dropdown';

const NavUser = () => {
  const { data } = useSession();
  const user = data?.user;

  if (!user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserDropdown>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <UserAvatar
              image={user.image as string}
              email={user.email as string}
              className="rounded-lg"
            />
            <div className="grid flex-1 text-left text-sm leading-tight">
              {user.name && (
                <span className="truncate font-semibold">{user.name}</span>
              )}
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </SidebarMenuButton>
        </UserDropdown>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUser;
