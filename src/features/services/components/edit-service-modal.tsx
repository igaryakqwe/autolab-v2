import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  UpdateServiceDto,
  updateServiceDto,
} from '@/server/api/routers/service/dto/service.dto';
import { useState } from 'react';
import { toast } from '@/utils/toast-utils';
import { api } from '@/lib/trpc/client';
import { handleError, tryCatch } from '@/utils/error-utils';
import { EditIcon } from 'lucide-react';
import { Service } from '@/types/service';
import ConfirmationDialog from '@/components/alert-dialog';

interface EditServiceModalProps {
  service: Service;
}

const EditServiceModal = ({ service }: EditServiceModalProps) => {
  const [open, setOpen] = useState(false);
  const { id, ...defaultValues } = service;

  const { register, formState, reset, handleSubmit } =
    useForm<UpdateServiceDto>({
      resolver: zodResolver(updateServiceDto),
      defaultValues,
    });

  const utils = api.useUtils();
  const { mutateAsync: createService, isPending } =
    api.service.update.useMutation();
  const { mutateAsync: deleteService, isPending: isDeleting } =
    api.service.delete.useMutation();

  const onSubmit = async (data: UpdateServiceDto) => {
    const { error } = await tryCatch(
      async () =>
        await createService({
          service: data,
          id,
        }),
    );

    if (error) {
      const e = handleError(error);
      toast(e).success();
      console.error(e);
      return;
    }

    await utils.service.findAll.invalidate();
    toast('Послугу успішно оновлено').success();
    reset();
    setOpen(false);
  };

  const handleDelete = async () => {
    const { error } = await tryCatch(async () => await deleteService(id));

    if (error) {
      const e = handleError(error);
      toast(e).success();
      console.error(e);
      return;
    }

    await utils.service.findAll.invalidate();
    toast('Послугу успішно видалено').success();
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Створити нову послугу</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Назва"
            id="title"
            placeholder="Назва послуги"
            error={formState.errors.title?.message}
            {...register('title')}
          />

          <Textarea
            label="Опис"
            id="description"
            placeholder="Опис послуги"
            className="resize-none min-h-[100px]"
            error={formState.errors.description?.message}
            {...register('description')}
          />

          <Input
            label="Ціна (грн)"
            id="price"
            type="text"
            inputMode="decimal"
            step="0.01"
            placeholder="0.00"
            error={formState.errors.price?.message}
            {...register('price', {
              setValueAs: (v) => (v === '' ? undefined : Number.parseFloat(v)),
            })}
          />

          <Input
            label="Тривалість (хв)"
            id="duration"
            type="text"
            inputMode="numeric"
            placeholder="60"
            error={formState.errors.duration?.message}
            {...register('duration', {
              setValueAs: (v) =>
                v === '' ? undefined : Number.parseInt(v, 10),
            })}
          />

          <div className="flex justify-between space-x-2 pt-4">
            <ConfirmationDialog
              title="Ви впевнені?"
              description="Ви впевнені, що хочете видалити цю послугу?"
              onSubmit={handleDelete}
              isLoading={isDeleting}
            >
              <Button variant="secondary">Видалити</Button>
            </ConfirmationDialog>
            <div className="space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  reset();
                }}
              >
                Скасувати
              </Button>
              <Button isLoading={isPending} type="submit">
                Створити
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditServiceModal;
