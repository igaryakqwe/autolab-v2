import { LoginForm } from '@/components/login-form';
import ThemeSwitcher from '@/components/theme-switcher';
import Logo from '@/components/logo';
import Image from 'next/image';
import * as React from 'react';
import { trpc } from '@/lib/trpc/server';

export default function LoginPage() {
  const users = trpc.auth.getUsers.query();

  console.log(users);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden my-6 ml-6 rounded-[12px] bg-muted lg:block bg-gradient-to-b from-primary to-foreground/30">
        <Image
          src="/images/background.png"
          alt="Image"
          className="absolute opacity-80 inset-0 rounded-[12px] h-full w-full dark:brightness-75 object-cover"
          layout="fill"
        />
        <Image src="/icons/autolab.svg" alt="Logo" width={32} height={32} />
        <div className="grid flex-1 text-left text-background text-7xl uppercase italic leading-tight">
          <Image src="/icons/autolab.svg" alt="Logo" width={32} height={32} />
          <span className="truncate font-bold">Autolab</span>
        </div>
      </div>
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
    </div>
  );
}
