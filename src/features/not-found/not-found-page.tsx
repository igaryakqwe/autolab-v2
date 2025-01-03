'use client';

import { Button } from '@/components/ui/button';
import { Home, Settings, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Routes } from '@/constants/routes';
import Logo from '@/components/logo';
import * as React from 'react';

const NotFoundPage = () => {
  const { back } = useRouter();
  return (
    <div className="relative">
      <div className="absolute top-7 left-7 pr-2 flex items-center justify-center gap-2 md:justify-start">
        <Logo />
      </div>
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-8 px-4">
          <div className="relative">
            <Settings className="w-32 h-32 text-gray-300 animate-spin-slow mx-auto" />
            <Settings className="w-16 h-16 text-gray-400 absolute top-0 right-1/4 animate-spin" />
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
            Щось пішло не так!
          </h1>
          <p className="text-md md:text-xl text-gray-600 max-w-md">
            Сторінку, яку ви шукаєте, не знайдено. Можливо, ви ввели неправильну
            адресу або сторінка була видалена
          </p>

          <div className="flex gap-4 justify-center">
            <Button onClick={back} variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Назад
            </Button>
            <Button>
              <Link className="flex gap-2 items-center" href={Routes.Home}>
                <Home className="w-4 h-4" />
                Головна сторінка
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
