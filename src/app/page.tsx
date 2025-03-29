import { Routes } from '@/constants/routes';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
      <Link
        className={buttonVariants({ variant: 'default' })}
        href={Routes.Dashboard}
      >
        Dashboard
      </Link>
    </div>
  );
}
