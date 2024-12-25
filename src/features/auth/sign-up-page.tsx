import AuthDivider from '@/features/auth/components/auth-divider';
import SignInWithGoogle from '@/features/auth/components/sign-in-with-google';
import SignUpForm from '@/features/auth/components/sign-up-form';
import { Routes } from '@/constants/routes';

const SignUpPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Реєстрація</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Введіть дані користувача та пароль
        </p>
      </div>
      <div className="grid gap-6">
        <SignUpForm />
        <AuthDivider />
        <SignInWithGoogle />
      </div>
      <div className="text-center text-sm">
        Вже маєте аккаунт?{' '}
        <a href={Routes.SignIn} className="underline underline-offset-4">
          Увійти
        </a>
      </div>
    </div>
  );
};

export default SignUpPage;
