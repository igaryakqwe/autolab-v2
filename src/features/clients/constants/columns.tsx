import { Checkbox } from '@/components/ui/checkbox';
import { Client } from '@/types/client';
import { formatName } from '@/utils/string-utils';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Client>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'fullName',
    header: 'ПІБ',
    cell: ({ row }) => {
      const { firstName, lastName, middleName } = row.original;
      return formatName(firstName, lastName, middleName);
    },
  },
  {
    accessorKey: 'phone',
    header: 'Телефон',
    cell: ({ row }) => {
      const { phone } = row.original;
      return <Badge>{phone}</Badge>;
    },
  },
];
