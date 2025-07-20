'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import VehicleForm from '@/features/vehicles/components/vehicle-form';
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from '@/components/ui/stepper';
import AddClientForm from '@/features/clients/components/add-client-form';
import VehicleOverview from './vehicle-overview';
import useVehicleFormStore from '../store/use-vehicle-form.store';
import { CreateVehicleDto } from '@/server/api/routers/vehicle/dto/vehicle.dto';
import { CreateClientDto } from '@/server/api/routers/client/dto/client.dto';
import useOrganizationsStore from '@/store/use-organizations-store';
import useCreateClientMutation from '@/features/clients/hooks/mutations/use-create-client.mutation';

const steps = [1, 2, 3];

const VehicleModal = () => {
  const { currentOrganization } = useOrganizationsStore();
  const step = useVehicleFormStore((state) => state.step);
  const setStep = useVehicleFormStore((state) => state.setStep);
  const vehicle = useVehicleFormStore((state) => state.vehicle);
  const setVehicle = useVehicleFormStore((state) => state.setVehicle);
  const client = useVehicleFormStore((state) => state.client);
  const setClient = useVehicleFormStore((state) => state.setClient);

  const createClientMutation = useCreateClientMutation();

  const handleNextStep = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  // const handlePrevStep = () => {
  //   if (step > 1) {
  //     setStep(step - 1);
  //   }
  // };

  const handleVehicleSubmit = async (
    vehicle: Omit<CreateVehicleDto, 'clientId' | 'userId'>,
  ) => {
    setVehicle(vehicle);
    handleNextStep();
  };

  const handleClientSubmit = async (data: CreateClientDto) => {
    const client = await createClientMutation.mutateAsync({
      ...data,
      organizationId: currentOrganization!,
    });

    if (!client) {
      return;
    }

    setClient(client);
    handleNextStep();
  };

  const formSteps = [
    <VehicleForm key={0} onSubmit={handleVehicleSubmit} />,
    <AddClientForm
      key={1}
      organizationId={currentOrganization!}
      onSubmit={handleClientSubmit}
    />,
    <VehicleOverview
      key={2}
      // onSubmit={handleVehicleSubmit}
      client={client}
      vehicle={vehicle}
    />,
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button icon={<PlusIcon />}>Додати</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <DialogTitle>Додати авто</DialogTitle>
        <DialogDescription>Введіть дані авто</DialogDescription>
        <div className="w-1/2 my-3 mb-4 mx-auto">
          <Stepper value={step} onValueChange={setStep}>
            {steps.map((step) => (
              <StepperItem key={step} step={step} className="w-full last:w-fit">
                <StepperTrigger asChild>
                  <StepperIndicator />
                </StepperTrigger>
                {step < steps.length && <StepperSeparator />}
              </StepperItem>
            ))}
          </Stepper>
        </div>
        {formSteps[step - 1]}
      </DialogContent>
    </Dialog>
  );
};

export default VehicleModal;
