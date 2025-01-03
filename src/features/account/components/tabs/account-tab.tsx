import { Card } from '@/components/ui/card';
import SignInDataForm from '@/features/account/components/forms/sign-in-data-form';
import ChangePasswordForm from '@/features/account/components/forms/change-password-form';

const AccountTab = () => {
  return (
    <Card className="p-6">
      <div className="flex md:flex-row flex-col w-full gap-6">
        <SignInDataForm />
        <div className="bg-muted-foreground h-full w-[2px] self-baseline" />
        <ChangePasswordForm />
      </div>
    </Card>
  );
};

export default AccountTab;
