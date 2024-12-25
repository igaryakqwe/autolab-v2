import AuthDivider from '@/features/auth/components/auth-divider';
import SignInWithGoogle from '@/features/auth/components/sign-in-with-google';
import SignInForm from '@/features/auth/components/sign-in-form';
import Link from 'next/link';
import { Routes } from '@/constants/routes';

const SignInPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Вхід</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Введіть дані користувача та пароль
        </p>
      </div>
      <div className="grid gap-6">
        <SignInForm />
        <AuthDivider />
        <SignInWithGoogle />
      </div>
      <div className="text-center text-sm">
        Не маєте аккаунту?{' '}
        <Link href={Routes.SignUp} className="underline underline-offset-4">
          Зареєструватись
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
