'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Routes } from '@/constants/routes';

const SignInWithGoogle = () => {
  return (
    <Button
      onClick={async () => {
        await signIn('google', { callbackUrl: Routes.Dashboard });
      }}
      size="lg"
      variant="outline"
      className="w-full"
    >
      <Image
        src="/icons/google.svg"
        alt="google"
        className="size-4"
        width={16}
        height={16}
      />
      Увійти через Google
    </Button>
  );
};

export default SignInWithGoogle;
