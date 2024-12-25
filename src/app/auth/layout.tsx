import { PropsWithChildren } from 'react';
import Image from 'next/image';
import Logo from '@/components/logo';
import ThemeSwitcher from '@/components/theme-switcher';
import * as React from 'react';

const AuthLayout = async ({ children }: PropsWithChildren) => {
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
      </div>
      <div className="relative flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <ThemeSwitcher className="absolute top-8 right-8" />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[350px]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
