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
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Routes } from '@/constants/routes';
import {
  ErrorCodes,
  ErrorMessages,
} from '@/server/common/enums/error-codes.enum';
import { api } from '@/lib/trpc/client';
import { useQueryState } from 'nuqs';

const SignInForm = () => {
  const [error] = useQueryState('error');
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const sendEmailMutation = api.auth.sendApprovalEmail.useMutation();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await signIn('credentials', {
        ...data,
        callbackUrl: Routes.Dashboard,
        redirect: false,
      });

      if (res?.error) {
        throw res;
      }

      toast.success('Ви успішно увійшли');
      replace(Routes.Dashboard);
    } catch (error) {
      if ((error as RequestError)?.code === ErrorCodes.USER_NOT_VERIFIED) {
        await sendEmailMutation.mutateAsync(data.email);
      }

      const message = ErrorMessages[(error as RequestError)?.code];
      toast.error('Помилка входу', {
        description: message,
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
      {error === 'OAuthAccountNotLinked' && (
        <div className="text-center text-sm text-red-500">
          Користувач з такою поштою вже існує
        </div>
      )}
    </form>
  );
};

export default SignInForm;
