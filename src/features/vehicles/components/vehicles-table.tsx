'use client';

import DataTable from '@/components/table/data-table';
import vehiclesColumns from '@/features/vehicles/lib/columns';
import useVehiclesQuery from '@/features/vehicles/hooks/queries/use-vehicles.query';
import useOrganizationsStore from '@/store/use-organizations-store';

const VehicleTable = () => {
  const { currentOrganization } = useOrganizationsStore();
  const { vehicles, isLoading } = useVehiclesQuery(currentOrganization!);

  return (
    <DataTable
      data={vehicles}
      isLoading={isLoading}
      columns={vehiclesColumns}
    />
  );
};

export default VehicleTable;
