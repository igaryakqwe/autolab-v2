import { Card } from '@/components/ui/card';
import OrganizationCard from '@/components/organization-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import useOrganizationsStore from '@/store/use-organizations-store';
import LoadingSpinner from '@/components/ui/loading-spinner';
import dynamic from 'next/dynamic';
import EmptyOrganizationsState from '@/features/account/components/empty-organizations-state';

const CreateOrganizationDialog = dynamic(
  () => import('@/features/account/components/create-organization-dialog'),
  {
    ssr: false,
  },
);

const OrganizationsTab = () => {
  const { organizations, isLoading } = useOrganizationsStore();

  return (
    <Card className="h-full flex flex-col">
      <div className="flex justify-between items-center p-6">
        <h2 className="text-xl font-semibold">Організації</h2>
        <CreateOrganizationDialog>
          <Button icon={<PlusIcon className="mr-2 h-4 w-4" />}>Створити</Button>
        </CreateOrganizationDialog>
      </div>
      <ScrollArea className="flex-grow p-6 pt-0">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : organizations && organizations.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {organizations.map((organization) => (
              <OrganizationCard
                organization={organization}
                key={organization.id}
              />
            ))}
          </div>
        ) : (
          <EmptyOrganizationsState />
        )}
      </ScrollArea>
    </Card>
  );
};

export default OrganizationsTab;
