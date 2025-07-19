import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Phone, User } from 'lucide-react';
import UserAvatar from '@/components/user-avatar';

export const owner: VehicleOwnerProps = {
  firstName: 'Олександр',
  lastName: 'Петренко',
  middleName: 'Іванович',
  phone: '+380 67 123 45 67',
};

export type VehicleOwnerProps = {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
};

const VehicleOwner = () => {
  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
            <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          Власник автомобіля
        </CardTitle>
        <CardDescription>Контактна інформація клієнта</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <UserAvatar size={20} className="w-16 h-16" email={owner.phone} />
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {owner.lastName} {owner.firstName} {owner.middleName}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {owner.phone}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleOwner;
