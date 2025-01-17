import { Card } from '@/components/ui/card';
import OrganizationCard from '@/components/organization-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import CreateOrganizationDialog from '@/features/account/components/create-organization-dialog';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import useOrganizationsStore from '@/store/use-organizations-store';
import LoadingSpinner from '@/components/ui/loading-spinner';

const OrganisationsTab = () => {
  const { organizations, isLoading } = useOrganizationsStore();

  return (
    <Card className="h-full">
      <ScrollArea className="relative lg:h-[75dvh] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Організації</h2>
          <CreateOrganizationDialog>
            <Button icon={<PlusIcon className="mr-2 h-4 w-4" />}>
              Створити
            </Button>
          </CreateOrganizationDialog>
        </div>
        {isLoading && (
          <div className="h-full absolute top-1/2 left-1/2 -translate-x-1/2">
            <LoadingSpinner />
          </div>
        )}
        <div className="relative h-full grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {organizations?.map((organization) => (
            <OrganizationCard
              organization={organization}
              key={organization.id}
            />
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default OrganisationsTab;
