'use client';

import UserAvatar from '@/components/user-avatar';
import UserDropdown from '@/components/user-dropdown';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const NavUserHeader = () => {
  const { data } = useSession();
  const user = data?.user;

  if (!user) return null;

  return (
    <UserDropdown>
      <Button size="icon" variant="ghost" className="rounded-full h-fit">
        <UserAvatar
          image={user.image as string}
          email={user.email as string}
          className="rounded-full cursor-pointer"
        />
      </Button>
    </UserDropdown>
  );
};

export default NavUserHeader;
