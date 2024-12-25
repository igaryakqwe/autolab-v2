'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormInputs, loginSchema } from '@/types/auth';
import RequestError from '@/server/common/request-error';
import {
  ErrorCodes,
  ErrorMessages,
} from '@/server/common/enums/error-codes.enum';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Routes } from '@/constants/routes';

const SignInForm = () => {
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await signIn('credentials', {
        ...data,
        callbackUrl: Routes.Dashboard,
        redirect: false,
      });

      console.log(res);

      if (res?.error) {
        throw new RequestError({
          code: ErrorCodes.INVALID_CREDENTIALS,
          message: ErrorMessages.INVALID_CREDENTIALS,
        });
      }

      toast.success('Ви успішно увійшли');
      replace(Routes.Dashboard);
    } catch (error) {
      toast.error('Помилка входу', {
        description: (error as RequestError).message,
      });
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="m@example.com"
        error={errors?.email?.message}
        {...register('email')}
      />
      <div className="grid gap-1">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <a
            href="#"
            className="ml-auto text-sm underline-offset-4 hover:underline"
          >
            Забули пароль?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          password
          error={errors?.password?.message}
          {...register('password')}
        />
      </div>
      <Button
        size="lg"
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
        icon={<ArrowRight className="size-4" />}
      >
        Увійти
      </Button>
    </form>
  );
};

export default SignInForm;
