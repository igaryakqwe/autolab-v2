import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConfirmationDialog from '@/components/alert-dialog';
import { api } from '@/lib/trpc/client';
import { toast } from 'sonner';

interface DeleteManyButtonProps {
  selectedIds: string[];
  onDelete?: () => void;
}

const DeleteManyButton = ({ selectedIds, onDelete }: DeleteManyButtonProps) => {
  if (selectedIds.length === 0) return null;

  const utils = api.useUtils();
  const { isPending, mutateAsync } = api.employee.deleteMany.useMutation({
    onSuccess: async () => {
      await utils.employee.getAll.invalidate();
      onDelete?.();
    },
  });

  const handleSubmit = async () => {
    try {
      await mutateAsync(selectedIds);
      toast.success('Співробітники успішно видалені');
    } catch (e) {
      toast.error('Помилка при видаленні співробітників');
      console.error(e);
    }
  };

  return (
    <ConfirmationDialog
      title="Ви впевнені?"
      description="Ви впевнені, що хочете звільнити цих співробітників?"
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

export default DeleteManyButton;
