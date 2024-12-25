import UserAvatar from '@/components/user-avatar';
import UserDropdown from '@/components/user-dropdown';
import { auth } from '@/auth';

const NavUserHeader = async () => {
  const sesseion = await auth();
  const user = sesseion?.user;

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
