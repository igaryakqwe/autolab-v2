'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/components/ui/sidebar';
import UserAvatar from '@/components/user-avatar';
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import userNavigation from '@/constants/user-navigation';
import Link from 'next/link';

const UserDropdown = ({ children }: PropsWithChildren) => {
  const { isMobile } = useSidebar();

  const { data } = useSession();
  const user = data?.user;

  const fullName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.name;

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={isMobile ? 'bottom' : 'right'}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserAvatar
              image={user.image as string}
              email={user.email as string}
              className="rounded-lg"
            />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{fullName}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {userNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem asChild key={item.label}>
                <Link href={item.href}>
                  <Icon />
                  {item.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut />
          Вихід
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
