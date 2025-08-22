import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Service } from '@/types/service';
import { formatShortDuration } from '@/utils/date.utils';
import { ColumnDef } from '@tanstack/react-table';
import ServiceInfoModal from '@/features/services/components/service-info-modal';
import EditServiceModal from '@/features/services/components/edit-service-modal';

const servicesColumns: ColumnDef<Service>[] = [
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
    header: 'Назва',
    accessorKey: 'title',
    cell: ({ row }) => {
      return <span className="text-sm font-medium">{row.original.title}</span>;
    },
  },
  {
    header: 'Опис',
    accessorKey: 'description',
    cell: ({ row }) => {
      return (
        <div className="max-w-[600px] overflow-hidden">
          <span className="text-sm truncate block">
            {row.original.description}
          </span>
        </div>
      );
    },
  },
  {
    header: 'Ціна',
    accessorKey: 'price',
    cell: ({ row }) => {
      return (
        <Badge className="whitespace-nowrap" variant="green">
          {row.original.price.toFixed(2)} грн
        </Badge>
      );
    },
  },
  {
    header: 'Тривалість',
    accessorKey: 'duration',
    cell: ({ row }) => {
      return <span>{formatShortDuration(row.original.duration)}</span>;
    },
  },
  {
    header: 'Дії',
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <ServiceInfoModal service={row.original} />
          <EditServiceModal service={row.original} />
        </div>
      );
    },
  },
];

export default servicesColumns;
