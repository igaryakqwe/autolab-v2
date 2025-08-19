'use client';

import DataTableSearch from '@/components/table/data-table-search';
import { useState } from 'react';
import servicesColumns from './constants/columns';
import DataTable from '@/components/table/data-table';
import useServicesQuery from './hooks/queries/use-services.query';
import useOrganizationsStore from '@/store/use-organizations-store';
import { filterServices } from './utils/filter-services';
import { parseAsString, useQueryState } from 'nuqs';
import { Service } from '@/types/service';
import dynamic from 'next/dynamic';

const CreateServiceModal = dynamic(
  () => import('@/features/services/components/create-service-modal'),
  {
    ssr: false,
  },
);

const DeleteManyModal = dynamic(
  () => import('@/features/services/components/delete-many-modal'),
  {
    ssr: false,
  },
);

const ServicesPage = () => {
  const { currentOrganization } = useOrganizationsStore();
  const [search] = useQueryState('search', parseAsString.withDefault(''));
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { services, isLoading } = useServicesQuery(
    currentOrganization as string,
  );

  const filteredData = filterServices(search, services);

  const handleSelect = (services: Service[]) => {
    const ids = services.map((service) => service.id);
    setSelectedIds(ids);
  };

  const handleDelete = () => {
    setSelectedIds([]);
  };

  return (
    <div className="space-y-3">
      <div className="flex mt-2 gap-3 flex-wrap justify-between">
        <div className="flex gap-3">
          <DataTableSearch />
        </div>
        <div className="flex gap-3">
          {selectedIds.length > 0 && (
            <DeleteManyModal
              selectedIds={selectedIds}
              onDelete={handleDelete}
            />
          )}
          <CreateServiceModal />
        </div>
      </div>
      <DataTable
        columns={servicesColumns}
        data={filteredData}
        isLoading={isLoading}
        onSelectionChange={(selectedRows) => handleSelect(selectedRows)}
      />
    </div>
  );
};

export default ServicesPage;
