'use client';

import { api } from '@/lib/trpc/client';
import useOrganizationsStore from '@/store/use-organizations-store';
import DataTableSearch from '@/components/table/data-table-search';
import DataTable from '@/components/table/data-table';
import { employeesColumns } from '@/features/employees/constants/employees-columns';
import RoleSelector from '@/features/employees/components/role-selector';
import { useMemo, useState } from 'react';
import { filterEmployees } from '@/features/employees/utils/employees-filters';
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs';
import { Employee } from '@/types/employee';
import dynamic from 'next/dynamic';

const DeleteManyButton = dynamic(
  () => import('@/features/employees/components/delete-many-button'),
  { ssr: false },
);

const InviteEmployeesModal = dynamic(
  () => import('@/features/employees/components/invite-employees-modal'),
  { ssr: false },
);

const EmployeesPage = () => {
  const { currentOrganization } = useOrganizationsStore();
  const { data, isLoading } = api.employee.getAll.useQuery(
    currentOrganization as string,
  );

  const [states] = useQueryStates({
    search: parseAsString.withDefault(''),
    role: parseAsArrayOf(parseAsString).withDefault([]),
  });
  const { search, role } = states;

  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return filterEmployees(data, search, role);
  }, [data, search, role]);

  const selectedIds = useMemo(() => {
    return selectedEmployees.map((employee) => employee.id);
  }, [selectedEmployees]);

  const handleDelete = () => {
    setSelectedEmployees([]);
  };

  if (!data && !isLoading) return null;

  return (
    <div className="space-y-3">
      <div className="flex mt-2 gap-3 flex-wrap justify-between">
        <div className="flex gap-3">
          <DataTableSearch />
          <RoleSelector />
        </div>
        <div className="flex gap-3">
          {selectedIds.length > 0 && (
            <DeleteManyButton
              selectedIds={selectedIds}
              onDelete={handleDelete}
            />
          )}
          <InviteEmployeesModal />
        </div>
      </div>
      <DataTable
        columns={employeesColumns}
        data={filteredData}
        isLoading={isLoading}
        onSelectionChange={setSelectedEmployees}
      />
    </div>
  );
};

export default EmployeesPage;
