import Image from 'next/image';
import * as React from 'react';

const Logo = () => {
  return (
    <>
      <Image src="/icons/autolab.svg" alt="Logo" width={32} height={32} />
      <div className="grid flex-1 text-left text-xl uppercase italic leading-tight">
        <span className="truncate font-bold">Autolab</span>
      </div>
    </>
  );
};

export default Logo;
