'use client';

import DataTable from '@/components/table/data-table';
import useClientsQuery from '@/features/clients/hooks/use-clients-query';
import useOrganizationsStore from '@/store/use-organizations-store';
import { columns } from '@/features/clients/constants/columns';

const ClientsTable = () => {
  const { currentOrganization } = useOrganizationsStore();
  const { clients, isLoading } = useClientsQuery(currentOrganization!);

  return <DataTable data={clients} isLoading={isLoading} columns={columns} />;
};

export default ClientsTable;
