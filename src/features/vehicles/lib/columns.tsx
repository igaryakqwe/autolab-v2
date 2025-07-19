import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { Vehicle } from '@/types/models/vehicle';
import LicencePlate from '@/features/vehicles/components/licence-plate';

const vehiclesColumns: ColumnDef<Vehicle>[] = [
  {
    id: 'select',
    accessorFn: (row) => row.id,
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
        onCheckedChange={row.getToggleSelectedHandler()}
      />
    ),
  },
  {
    header: 'Марка',
    accessorKey: 'make',
    cell: ({ row }) => {
      return <span className="text-sm font-medium">{row.original.make}</span>;
    },
  },
  {
    header: 'Модель',
    accessorKey: 'model',
    cell: ({ row }) => {
      return (
        <div className="max-w-[600px] overflow-hidden">
          <span className="text-sm truncate block">{row.original.model}</span>
        </div>
      );
    },
  },
  {
    header: 'Рік випуску',
    accessorKey: 'year',
    cell: ({ row }) => {
      return (
        <Badge className="whitespace-nowrap">{row.original.year} рік</Badge>
      );
    },
  },
  {
    header: 'Державний номер',
    accessorKey: 'licensePlate',
    cell: ({ row }) => {
      if (!row.original.licensePlate) {
        return <span className="text-sm text-gray-500">Не вказано</span>;
      }

      return (
        <div className="max-w-[600px] overflow-hidden">
          <span className="text-sm truncate block">
            <LicencePlate plateNumber={row.original.licensePlate} />
          </span>
        </div>
      );
    },
  },
  {
    header: 'Дії',
    cell: () => {
      return (
        <div className="flex space-x-2">
          {/* <ServiceInfoModal service={row.original} /> */}
          {/* <EditServiceModal service={row.original} /> */}
        </div>
      );
    },
  },
];

export default vehiclesColumns;
