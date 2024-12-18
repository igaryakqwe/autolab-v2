import { cn } from '@/utils/style-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Вхід</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Введіть дані користувача та пароль
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Забули пароль?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button size="lg" type="submit" className="w-full">
          <ArrowRight className="size-4" />
          Увійти
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="uppercase relative z-10 bg-background px-2 text-muted-foreground">
            Або
          </span>
        </div>
        <Button size="lg" variant="outline" className="w-full">
          <Image
            src="/icons/google.svg"
            alt="google"
            className="size-4"
            width={16}
            height={16}
          />
          Увійти через Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Не маєте аккаунту?{' '}
        <a href="#" className="underline underline-offset-4">
          Зареєструватись
        </a>
      </div>
    </form>
  );
}
