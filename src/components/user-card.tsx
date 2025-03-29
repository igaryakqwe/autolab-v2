import { cn } from '@/utils/style-utils';
import * as React from 'react';
import UserAvatar from './user-avatar';
import { User } from '@prisma/client';

interface UserCardProps {
  user: User;
  className?: string;
}

const UserCard = ({ user, className }: UserCardProps) => {
  return (
    <div
      className={cn(
        className,
        'flex items-center gap-2 px-1 py-1.5 text-left text-sm',
      )}
    >
      <UserAvatar image={user.image as string} email={user.email as string} />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{user.name}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </div>
  );
};

export default UserCard;
