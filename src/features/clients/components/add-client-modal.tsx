import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import AddClientForm from './add-client-form';
import useOrganizationsStore from '@/store/use-organizations-store';
import { CreateClientDto } from '@/server/api/routers/client/dto/client.dto';
import useCreateClientMutation from '@/features/clients/hooks/mutations/use-create-client.mutation';

const AddClientModal = () => {
  const { currentOrganization } = useOrganizationsStore();
  const createClientMutation = useCreateClientMutation();

  const handleClientSubmit = (data: CreateClientDto) => {
    createClientMutation.mutate({
      ...data,
      organizationId: currentOrganization!,
    });
  };

  if (!currentOrganization) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button icon={<PlusIcon />}>Додати</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogTitle>Додати клієнта</DialogTitle>
        <DialogDescription>Введіть дані клієнта</DialogDescription>
        <AddClientForm
          organizationId={currentOrganization!}
          onSubmit={handleClientSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddClientModal;
