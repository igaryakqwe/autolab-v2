import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { changePasswordSchema, TUpdatePasswordData } from '@/types/account';

const ChangePasswordForm = () => {
  const passwordForm = useForm<TUpdatePasswordData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const handlePasswordSubmit = (data: TUpdatePasswordData) => {
    console.log('Password:', data);
  };

  return (
    <form
      onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
      className="space-y-6 w-full"
    >
      <div className="space-y-6">
        <Controller
          name="currentPassword"
          control={passwordForm.control}
          render={({ field }) => (
            <Input
              id="currentPassword"
              type="password"
              password
              label="Поточний пароль"
              error={passwordForm.formState.errors.currentPassword?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="newPassword"
          control={passwordForm.control}
          render={({ field }) => (
            <Input
              id="newPassword"
              type="password"
              label="Новий пароль"
              error={passwordForm.formState.errors.newPassword?.message}
              password
              {...field}
            />
          )}
        />

        <Controller
          name="confirmNewPassword"
          control={passwordForm.control}
          render={({ field }) => (
            <Input
              id="confirmNewPassword"
              type="password"
              label="Підтвердження нового пароля"
              password
              error={passwordForm.formState.errors.confirmNewPassword?.message}
              {...field}
            />
          )}
        />
      </div>
      <Button type="submit" className="w-full">
        Змінити пароль
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
