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
  CreateServiceDto,
  createServiceDto,
} from '@/server/api/routers/service/dto/service.dto';
import { useState } from 'react';
import { toast } from '@/utils/toast-utils';
import { api } from '@/lib/trpc/client';
import { handleError, tryCatch } from '@/utils/error-utils';
import useOrganizationsStore from '@/store/use-organizations-store';
import { PlusIcon } from 'lucide-react';

const CreateServiceModal = () => {
  const [open, setOpen] = useState(false);
  const { currentOrganization } = useOrganizationsStore();

  const { register, formState, reset, handleSubmit } =
    useForm<CreateServiceDto>({
      resolver: zodResolver(createServiceDto),
      defaultValues: {
        title: '',
        description: '',
        price: undefined,
        duration: undefined,
      },
    });

  const utils = api.useUtils();
  const { mutateAsync: createService, isPending } =
    api.service.create.useMutation();

  const onSubmit = async (data: CreateServiceDto) => {
    const { error } = await tryCatch(
      async () =>
        await createService({
          service: data,
          organizationId: currentOrganization as string,
        }),
    );

    if (error) {
      const e = handleError(error);
      toast(e).success();
      console.error(e);
      return;
    }

    await utils.service.findAll.invalidate();
    toast('Послугу успішно створено').success();
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={<PlusIcon />}>Додати</Button>
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

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Відміна
            </Button>
            <Button isLoading={isPending} type="submit">
              Створити
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServiceModal;
