import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FC } from 'react';
import { cn } from '@/utils/style-utils';
import { Building2 } from 'lucide-react';

interface OrganizationLogoProps {
  image?: string;
  name: string;
  className?: string;
}

const OrganizationLogo: FC<OrganizationLogoProps> = ({
  image,
  name,
  className,
}) => {
  return (
    <Avatar className={cn('h-9 w-9 rounded-lg', className)}>
      <AvatarImage src={image as string} alt={name} />
      <AvatarFallback className={cn('h-9 w-9 rounded-lg', className)}>
        <Building2
          size={16}
          strokeWidth={2}
          className="opacity-60"
          aria-hidden="true"
        />
      </AvatarFallback>
    </Avatar>
  );
};

export default OrganizationLogo;
