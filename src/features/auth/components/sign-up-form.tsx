'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormInputs, signUpSchema } from '@/types/auth';
import { api } from '@/lib/trpc/client';
import RequestError from '@/server/common/request-error';
import { toast } from 'sonner';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
  });

  const signUpMutation = api.auth.register.useMutation();

  const onSubmit = async (data: SignUpFormInputs) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { message: 'Паролі не співпадають' });
      return;
    }

    try {
      await signUpMutation.mutateAsync(data);
      toast.success('Ви успішно зареєструвались!', {
        description: 'Перевірте свою пошту для підтвердження',
      });
    } catch (error) {
      toast.error('Помилка реєстрації', {
        description: (error as RequestError).message,
      });
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="email"
        label="Електронна пошта"
        type="email"
        placeholder="m@example.com"
        error={errors?.email?.message}
        {...register('email')}
      />
      <Input
        id="password"
        label="Пароль"
        type="password"
        placeholder="Пароль"
        password
        error={errors?.password?.message}
        {...register('password')}
      />
      <Input
        id="confirmPassword"
        label="Підтвердження паролю"
        type="password"
        placeholder="Підтвердження паролю"
        password
        error={errors?.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Button
        size="lg"
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
        icon={<ArrowRight className="size-4" />}
      >
        Реєстрація
      </Button>
    </form>
  );
};

export default SignUpForm;
