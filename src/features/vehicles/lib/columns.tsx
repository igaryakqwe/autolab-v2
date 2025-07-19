import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { Vehicle } from '@/types/models/vehicle';
import LicencePlate from '@/features/vehicles/components/licence-plate';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Routes } from '@/constants/routes';
import { Eye } from 'lucide-react';

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
    cell: ({ row }) => {
      const vehicleId = row.original.id;
      const vehicleLink = Routes.Vehicle.replace(':id', vehicleId);
      return (
        <div className="flex space-x-2">
          <Link
            className={buttonVariants({ size: 'icon', variant: 'secondary' })}
            href={vehicleLink}
          >
            <Eye className="h-4 w-4" />
          </Link>
          {/* <ServiceInfoModal service={row.original} /> */}
          {/* <EditServiceModal service={row.original} /> */}
        </div>
      );
    },
  },
];

export default vehiclesColumns;
