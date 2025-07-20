import { Card, CardContent } from '@/components/ui/card';
import { Phone, User } from 'lucide-react';
import UserAvatar from '@/components/user-avatar';
import SectionHeader from '@/components/section-header';

export type VehicleOwnerProps = {
  image?: string | null;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  phone: string | null;
};

const VehicleOwner = ({
  firstName,
  lastName,
  middleName,
  phone,
  image,
}: VehicleOwnerProps) => {
  return (
    <Card className="h-fit">
      <SectionHeader
        title="Власник автомобіля"
        description="Контактна інформація клієнта"
        icon={
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
            <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
        }
      />

      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <UserAvatar
            size={20}
            image={image}
            className="w-16 h-16"
            email={phone ?? ''}
          />
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {lastName ?? ''} {firstName ?? ''} {middleName ?? ''}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{phone ?? 'N/A'}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleOwner;
