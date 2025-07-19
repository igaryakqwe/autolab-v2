import {
  CreateVehicleDto,
  CreateVehicleSchema,
} from '@/server/api/routers/vehicle/dto/vehicle.dto';
import { useForm } from 'react-hook-form';
import { ComboboxFormField } from '@/components/ui/combobox';
import makeOptions from '@/data/makes.json';
import bodystylesOptions from '@/data/bodystyles.json';
import fuelsOptions from '@/data/fuels.json';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useModelsQuery from '@/features/vehicles/hooks/queries/use-models.query';
import { findElementInOptions } from '@/features/vehicles/lib/utils';
import { VehicleFormValues } from '@/features/vehicles/lib/types';

interface VehicleFormProps {
  vehicle?: CreateVehicleDto;
  onSubmit: (vehicle: VehicleFormValues) => void;
}

const VehicleForm = ({ vehicle, onSubmit }: VehicleFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm<VehicleFormValues>({
    defaultValues: vehicle,
  });

  const make = watch('make') ?? vehicle?.make;
  const { models } = useModelsQuery(make);

  const onVehicleSubmit = (data: VehicleFormValues) => {
    const vehicle = {
      ...data,
      make: findElementInOptions(data.make, makeOptions),
      model: findElementInOptions(data.model, models) ?? 'Lacetti',
      bodyStyle: findElementInOptions(data.bodyStyle, bodystylesOptions),
      engine: findElementInOptions(data.engine, fuelsOptions),
    };

    const validateVehicle = CreateVehicleSchema.omit({
      clientId: true,
      userId: true,
    }).safeParse(vehicle);

    if (!validateVehicle.success) {
      setError('root', {
        type: 'manual',
        message: validateVehicle.error.errors[0].message,
      });
      return;
    }

    onSubmit(validateVehicle.data);
  };

  return (
    <form
      className="flex flex-col mx-1"
      onSubmit={handleSubmit(onVehicleSubmit)}
    >
      <div className="grid gap-y-2 gap-x-3 grid-cols-1 md:grid-cols-2">
        <Input
          className="h-9"
          label="Державний номер"
          placeholder="Державний номер"
          {...register('licensePlate')}
        />
        <Input
          className="h-9"
          label="VIN"
          placeholder="VIN"
          {...register('vin')}
        />
        <ComboboxFormField
          control={control}
          label="Марка"
          placeholder="Оберіть марку"
          options={makeOptions}
          className="w-full"
          {...register('make')}
        />
        <ComboboxFormField
          control={control}
          label="Модель"
          placeholder="Оберіть модель"
          options={models}
          className="w-full"
          {...register('model')}
        />
        <ComboboxFormField
          control={control}
          label="Тип кузова"
          placeholder="Оберіть тип кузова"
          options={bodystylesOptions}
          className="w-full"
          {...register('bodyStyle')}
        />
        <Input
          className="h-9"
          label="Рік випуску"
          placeholder="Рік випуску"
          type="number"
          inputMode="numeric"
          {...register('year')}
        />
        <ComboboxFormField
          control={control}
          label="Тип двигуна"
          placeholder="Оберіть тип двигуна"
          options={fuelsOptions}
          className="w-full"
          {...register('engine')}
        />
        <Input
          className="h-9"
          label="Об'єм двигуна"
          placeholder="Об'єм двигуна (л)"
          {...register('engineVolume')}
        />
      </div>
      {errors.root && <p className="text-red-500">{errors.root.message}</p>}
      <Button className="self-end mt-3">Додати</Button>
    </form>
  );
};

export default VehicleForm;
