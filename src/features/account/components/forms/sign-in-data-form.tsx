import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInDataSchema, TUpdateSignInData } from '@/types/account';

const SignInDataForm = () => {
  const usernameEmailForm = useForm<TUpdateSignInData>({
    resolver: zodResolver(signInDataSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  const onSubmit = (data: TUpdateSignInData) => {
    console.log('Username and Email:', data);
  };

  return (
    <form
      onSubmit={usernameEmailForm.handleSubmit(onSubmit)}
      className="space-y-6 w-full"
    >
      <div className="space-y-6">
        <Controller
          name="username"
          control={usernameEmailForm.control}
          render={({ field }) => (
            <Input
              id="username"
              label="Ім'я користувача"
              placeholder="user123"
              error={usernameEmailForm.formState.errors.username?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="email"
          control={usernameEmailForm.control}
          render={({ field }) => (
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="user123@gmail.com"
              error={usernameEmailForm.formState.errors.email?.message}
              {...field}
            />
          )}
        />
      </div>

      <Button type="submit" className="w-full">
        Зберегти зміни
      </Button>
    </form>
  );
};

export default SignInDataForm;
