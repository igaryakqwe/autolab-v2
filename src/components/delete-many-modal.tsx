import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import ConfirmationDialog from '@/components/alert-dialog';

interface DeleteModalProps {
  title: string;
  description: string;
  count: number;
  onDelete: () => void;
  isLoading?: boolean;
}

const DeleteManyModal = ({
  title,
  description,
  count,
  onDelete,
  isLoading = false,
}: DeleteModalProps) => {
  return (
    <ConfirmationDialog
      title={title}
      description={description}
      isLoading={isLoading}
      onSubmit={onDelete}
    >
      <Button className="ml-auto" variant="outline">
        <Trash
          className="-ms-1 me-2 opacity-60"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        Видалити
        <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
          {count}
        </span>
      </Button>
    </ConfirmationDialog>
  );
};

export default DeleteManyModal;
