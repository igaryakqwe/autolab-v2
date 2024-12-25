'use client';
import { KBarProvider } from 'kbar';
import { PropsWithChildren } from 'react';

const KeyboardProvider = ({ children }: PropsWithChildren) => {
  return <KBarProvider>{children}</KBarProvider>;
};

export default KeyboardProvider;
