'use client';

import DataTable from '@/components/table/data-table';
import vehiclesColumns from '@/features/vehicles/lib/columns';
import useVehiclesQuery from '@/features/vehicles/hooks/queries/use-vehicles.query';

const VehicleTable = () => {
  const { vehicles, isLoading } = useVehiclesQuery();

  return (
    <DataTable
      data={vehicles}
      isLoading={isLoading}
      columns={vehiclesColumns}
    />
  );
};

export default VehicleTable;
