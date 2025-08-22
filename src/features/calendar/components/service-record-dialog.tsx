'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PropsWithChildren } from 'react';
import useCalendarDialogStore from '@/features/calendar/stores/use-calendar-dialog.store';

const ServiceRecordDialog = ({ children }: PropsWithChildren) => {
  const open = useCalendarDialogStore((state) => state.open);
  const setOpen = useCalendarDialogStore((state) => state.setOpen);
  const isEdit = useCalendarDialogStore((state) => state.isEdit);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
