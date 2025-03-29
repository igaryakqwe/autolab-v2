import { ColumnDef } from '@tanstack/react-table';
import { Employee } from '@/types/employee';
import UserAvatar from '@/components/user-avatar';
import { formatName } from '@/utils/string-utils';
import { Badge } from '@/components/ui/badge';
import { roleMapper } from '@/constants/role-mapper';
import { EmployeeRole } from '@/types/organization';
import { Checkbox } from '@/components/ui/checkbox';

export const employeeColumns: ColumnDef<Employee>[] = [
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
    accessorKey: 'image',
    header: '',
    cell: ({ row }) => (
      <UserAvatar email={row.original.email} image={row.original.image} />
    ),
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
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Роль',
    cell: ({ row }) => {
      const role = row.original.role as EmployeeRole;
      return <Badge>{roleMapper[role]}</Badge>;
    },
  },
];
