'use client';

import { FC, PropsWithChildren, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreateOrganizationForm from '@/features/account/components/forms/create-organization-form';

const CreateOrganizationDialog: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Створити нову організацію</DialogTitle>
          <DialogDescription>
            Заповніть деталі, щоб створити нову організацію.
          </DialogDescription>
        </DialogHeader>
        <CreateOrganizationForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrganizationDialog;
