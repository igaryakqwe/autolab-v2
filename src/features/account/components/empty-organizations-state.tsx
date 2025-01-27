import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, PlusIcon } from 'lucide-react';
import CreateOrganizationDialog from '@/features/account/components/create-organization-dialog';

const EmptyOrganizationsState = () => {
  return (
    <Card className="h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center mb-6">
        <Building2 className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">Немає організацій</h3>
      <p className="text-muted-foreground mb-6">
        Ви ще не створили жодної організації. Почніть з створення вашої першої
        організації.
      </p>
      <CreateOrganizationDialog>
        <Button icon={<PlusIcon className="mr-2 h-4 w-4" />}>
          Створити організацію
        </Button>
      </CreateOrganizationDialog>
    </Card>
  );
};

export default EmptyOrganizationsState;
