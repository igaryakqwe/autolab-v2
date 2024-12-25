'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Loader2, CheckCircle, X, ArrowRight } from 'lucide-react';
import { Routes } from '@/constants/routes';
import { api } from '@/lib/trpc/client';
import { useQueryState } from 'nuqs';
import { toast } from 'sonner';
import RequestError from '@/server/common/request-error';

const SignUpApprovePage = () => {
  const [email] = useQueryState('email');
  const [token] = useQueryState('token');
  const [isLoading, setIsLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(false);

  const verifyEmail = api.auth.approveEmail.useMutation();
  const sendApprovalEmail = api.auth.sendApprovalEmail.useMutation();

  const approveEmail = useCallback(async () => {
    if (!email || !token) return;
    try {
      setIsLoading(true);
      await verifyEmail.mutateAsync({
        email,
        token,
      });
      setIsApproved(true);
    } catch (error) {
      toast.error('Помилка при підтвердженні пошти', {
        description: (error as RequestError)?.message,
      });
    }
    setIsLoading(false);
  }, []);

  const handleResendEmail = async () => {
    if (!email) return;
    try {
      await sendApprovalEmail.mutateAsync(email);
      toast.success('Лист з підтвердженням відправлено');
    } catch (error) {
      toast.error('Помилка при відправці листа', {
        description: (error as RequestError)?.message,
      });
    }
  };

  useEffect(() => {
    approveEmail();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Підтвердження реєстрації
          </CardTitle>
        </CardHeader>
        <CardContent className="flex pt-0 text-center flex-col items-center justify-center">
          {isLoading ? (
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          ) : isApproved ? (
            <>
              <CheckCircle className="h-12 w-12 text-green-600" />
              <h2 className="mt-4 text-xl font-semibold text-green-600">
                Пошту підтверджено!
              </h2>
              <p className="mt-2 text-gray-600">
                Тепер ви можете увійти в особистий кабінет.
              </p>
            </>
          ) : (
            <>
              <X className="h-12 w-12 text-red-600" />
              <p className="mt-2 text-gray-600">
                Трапилась помилка при підтвердженні пошти.
              </p>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {!isLoading && isApproved && (
            <Link className={buttonVariants()} href={Routes.SignIn} passHref>
              На сторінку входу
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          {!isLoading && !isApproved && (
            <Button onClick={handleResendEmail}>Повторити спробу</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpApprovePage;
