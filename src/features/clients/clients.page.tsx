'use client';

import DataTableSearch from '@/components/table/data-table-search';
import AddClientModal from '@/features/clients/components/add-client-modal';
import ClientsTable from '@/features/clients/components/clients-table';

const ClientsPage = () => {
  return (
    <div className="space-y-3">
      <div className="flex mt-2 gap-3 flex-wrap justify-between">
        <div className="flex w-full justify-between gap-3">
          <DataTableSearch />
          <AddClientModal />
        </div>
      </div>
      <ClientsTable />
    </div>
  );
};

export default ClientsPage;
