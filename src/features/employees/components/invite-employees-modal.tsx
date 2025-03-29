'use client';

import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import UserCard from '@/components/user-card';
import { api } from '@/lib/trpc/client';
import { cn } from '@/utils/style-utils';
import { User } from '@prisma/client';
import { Loader2, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import useDebounce from '@/hooks/use-debounce';
import useOrganizationsStore from '@/store/use-organizations-store';
import { tryCatch } from '@/utils/error-utils';
import { toast } from '@/utils/toast-utils';

const InviteEmployeesModal = () => {
  const { currentOrganization } = useOrganizationsStore();
  const [emailOrUsername, setEmailOrUsername] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const debouncedEmailOrUsername = useDebounce(emailOrUsername, 500);

  const { data: users, isLoading } = api.employee.getByEmailOrUsername.useQuery(
    debouncedEmailOrUsername,
  );
  const utils = api.useUtils();
  const { mutateAsync: inviteEmployee, isPending } =
    api.employee.inviteEmployee.useMutation();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailOrUsername(e.target.value);
  };

  const handleAdd = async () => {
    if (selectedUser) {
      const { error } = await tryCatch(async () => {
        await inviteEmployee({
          userId: selectedUser.id,
          organizationId: currentOrganization as string,
        });
      });

      if (error) {
        toast('Помилка при додаванні співробітника').error();
      }

      toast('Співробітник успішно доданий').success();
      utils.employee.getAll.invalidate();
    }
    setSelectedUser(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button icon={<PlusIcon />}>Додати</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader className="space-y-3">
          <DialogTitle>Додати співробітників</DialogTitle>
          <DialogDescription>
            Додайте співробітників до вашої організації
          </DialogDescription>
          <Input
            label="Email / Ім'я користувача"
            placeholder="example@gmail.com"
            value={emailOrUsername}
            onChange={handleSearch}
          />
          {isLoading && (
            <div className="mt-2 border rounded-md p-2 max-h-[200px] overflow-y-auto">
              <Loader2 className="animate-spin" />
            </div>
          )}
          {users && users?.length > 0 && (
            <div className="mt-2 mx-auto w-full rounded-md max-h-[200px] overflow-y-auto">
              {users?.map((user) => {
                const isSelected = selectedUser?.id === user.id;
                return (
                  <div
                    key={user.id}
                    className={cn(
                      `flex p-1 w-full items-center justify-between border border-transparent rounded-md cursor-pointer`,
                      isSelected && 'border-primary',
                    )}
                    onClick={() => setSelectedUser(user as User)}
                  >
                    <UserCard className="w-full flex-1" user={user as User} />

                  </div>
                );
              })}
            </div>
          )}
          <Button
            isLoading={isPending}
            disabled={!selectedUser || isPending}
            onClick={handleAdd}
          >
            Додати
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InviteEmployeesModal;
