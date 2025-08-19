'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PropsWithChildren } from 'react';
import useCalendarDialogStore from '@/features/calendar/stores/use-calendar-dialog.store';

interface ServiceRecordDialogProps extends PropsWithChildren {
  trigger: React.ReactNode;
  isEdit?: boolean;
}

const ServiceRecordDialog = ({
  trigger,
  children,
  isEdit,
}: ServiceRecordDialogProps) => {
  const open = useCalendarDialogStore((state) => state.open);
  const setOpen = useCalendarDialogStore((state) => state.setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Редагування запису' : 'Додати запис'}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRecordDialog;
