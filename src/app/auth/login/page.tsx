import { LoginForm } from '@/components/login-form';
import ThemeSwitcher from '@/components/theme-switcher';
import Logo from '@/components/logo';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <ThemeSwitcher className="absolute top-8 right-8" />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[350px]">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden m-6 rounded-[12px] bg-muted lg:block">
        <Image
          src="/images/background.png"
          alt="Image"
          className="absolute inset-0 rounded-[12px] h-full w-full dark:brightness-75 object-cover"
          layout="fill"
        />
      </div>
    </div>
  );
}
