import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import ConfirmationDialog from '@/components/alert-dialog';
import { api } from '@/lib/trpc/client';
import { handleError, tryCatch } from '@/utils/error-utils';
import { toast } from '@/utils/toast-utils';

interface DeleteModalProps {
  selectedIds: string[];
  onDelete: () => void;
}

const DeleteManyModal = ({ selectedIds, onDelete }: DeleteModalProps) => {
  const utils = api.useUtils();
  const { isPending, mutateAsync: deleteServices } =
    api.service.deleteMany.useMutation();

  const handleSubmit = async () => {
    const { error } = await tryCatch(
      async () => await deleteServices(selectedIds),
    );

    if (error) {
      const e = handleError(error);
      toast(e).error();
      console.error(error);
      return;
    }

    await utils.service.findAll.invalidate();
    toast('Послуги успішно видалені').success();
    onDelete();
  };

  return (
    <ConfirmationDialog
      title="Ви впевнені?"
      description="Ви впевнені, що хочете видалити ці послуги?"
      onSubmit={handleSubmit}
      isLoading={isPending}
    >
      <Button className="ml-auto" variant="outline">
        <Trash
          className="-ms-1 me-2 opacity-60"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        Delete
        <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
          {selectedIds.length}
        </span>
      </Button>
    </ConfirmationDialog>
  );
};

export default DeleteManyModal;