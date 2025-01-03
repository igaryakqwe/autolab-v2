'use client';

import UserAvatar from '@/components/user-avatar';
import UserDropdown from '@/components/user-dropdown';
import { useSession } from 'next-auth/react';

const NavUserHeader = () => {
  const { data } = useSession();
  const user = data?.user;

  if (!user) return null;

  return (
    <UserDropdown>
      <UserAvatar
        image={user.image as string}
        email={user.email as string}
        className="rounded-full cursor-pointer"
      />
    </UserDropdown>
  );
};

export default NavUserHeader;
