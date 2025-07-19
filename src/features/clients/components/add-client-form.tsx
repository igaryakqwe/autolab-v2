'use client';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createClientDto,
  CreateClientDto,
} from '@/server/api/routers/client/dto/client.dto';
import { Button } from '@/components/ui/button';

interface AddClientFormProps {
  organizationId: string;
  onSubmit?: (data: CreateClientDto) => void;
}

const AddClientForm = ({ onSubmit, organizationId }: AddClientFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateClientDto>({
    resolver: zodResolver(createClientDto),
    defaultValues: {
      organizationId,
    },
  });

  const onClientSubmit = (data: CreateClientDto) => {
    onSubmit?.(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onClientSubmit)}
      className="p-1 space-y-4 flex flex-col"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Ім'я"
          placeholder="Ім'я"
          error={errors.client?.firstName?.message}
          {...register('client.firstName')}
        />

        <Input
          label="Прізвище"
          placeholder="Прізвище"
          error={errors.client?.lastName?.message}
          {...register('client.lastName')}
        />

        <Input
          label="По батькові"
          placeholder="По батькові"
          error={errors.client?.middleName?.message}
          {...register('client.middleName')}
        />

        <Input
          label="Номер телефону"
          placeholder="Номер телефону"
          error={errors.client?.phone?.message}
          {...register('client.phone')}
        />
      </div>
      <input type="hidden" {...register('organizationId')} />
      <Button type="submit" isLoading={isSubmitting} className="self-end">
        Додати
      </Button>
    </form>
  );
};

export default AddClientForm;
