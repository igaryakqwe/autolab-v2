import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FC } from 'react';
import { cn } from '@/utils/style-utils';
import { UserRound } from 'lucide-react';

interface UserAvatarProps {
  image?: string | null;
  email: string;
  className?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ image, email, className }) => {
  return (
    <Avatar className={cn('h-8 w-8 rounded-full', className)}>
      <AvatarImage src={image as string} alt={email} />
      <AvatarFallback className={cn('h-8 w-8 rounded-full', className)}>
        <UserRound
          size={16}
          strokeWidth={2}
          className="opacity-60"
          aria-hidden="true"
        />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
