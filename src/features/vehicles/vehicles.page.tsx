import DataTableSearch from '@/components/table/data-table-search';
import VehicleModal from '@/features/vehicles/components/vehicle-modal';
import VehiclesTable from '@/features/vehicles/components/vehicles-table';

const VehiclesPage = async () => {
  // const d = await trpc.vehicle.getModels.query();
  // writeFileSync('src/data/models.json', JSON.stringify(d, null, 2));

  return (
    <div className="space-y-3">
      <div className="flex mt-2 gap-3 flex-wrap justify-between">
        <div className="flex w-full justify-between gap-3">
          <DataTableSearch />
          <VehicleModal />
        </div>
      </div>
      <VehiclesTable />
    </div>
  );
};

export default VehiclesPage;
