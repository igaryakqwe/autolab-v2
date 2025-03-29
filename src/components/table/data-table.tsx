'use client';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
} from '@tanstack/react-table';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { DataTableSkeleton } from '@/components/table/data-table-skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/utils/style-utils';
import { useEffect, useState, useMemo } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  rowClassName?: (row: TData) => string;
  pageSizeOptions?: number[];
  onSelectionChange?: (selectedRows: TData[]) => void;
  onFilterChange?: (filters: ColumnFiltersState) => void;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  isLoading,
  rowClassName,
  pageSizeOptions = [10, 20, 30, 40, 50],
  onSelectionChange,
  onFilterChange,
}: DataTableProps<TData, TValue>) => {
  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withOptions({ shallow: false }).withDefault(1),
  );
  const [pageSize, setPageSize] = useQueryState(
    'limit',
    parseAsInteger
      .withOptions({ shallow: false, history: 'push' })
      .withDefault(10),
  );
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const paginationState = {
    pageIndex: currentPage - 1,
    pageSize: pageSize,
  };

  // Apply filters first
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return columnFilters.every((filter) => {
        const value = row[filter.id as keyof TData];
        if (filter.value === undefined || filter.value === null) return true;

        if (typeof value === 'string') {
          return value.toLowerCase().includes(String(filter.value).toLowerCase());
        }
        return value === filter.value;
      });
    });
  }, [data, columnFilters]);

  // Then apply pagination
  const paginatedData = useMemo(() => {
    const start = paginationState.pageIndex * paginationState.pageSize;
    const end = start + paginationState.pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, paginationState.pageIndex, paginationState.pageSize]);

  const table = useReactTable({
    data: paginatedData,
    columns,
    pageCount: Math.ceil(filteredData.length / pageSize),
    state: {
      pagination: paginationState,
      rowSelection,
      columnFilters,
    },
    onPaginationChange: (updater) => {
      const pagination =
        typeof updater === 'function' ? updater(paginationState) : updater;
      setCurrentPage(pagination.pageIndex + 1);
      setPageSize(pagination.pageSize);
    },
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: (updater) => {
      const filters =
        typeof updater === 'function' ? updater(columnFilters) : updater;
      setColumnFilters(filters);
      onFilterChange?.(filters);
      setCurrentPage(1); // Reset to first page when filters change
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    enableRowSelection: true,
  });

  useEffect(() => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);
    onSelectionChange?.(selectedRows);
  }, [rowSelection, table, onSelectionChange]);

  if (isLoading) return <DataTableSkeleton />;

  const totalItems = filteredData.length;

  return (
    <div className="flex flex-col justify-between h-full">
      <ScrollArea className="grid h-[calc(90vh-220px)] rounded-md border md:h-[calc(90dvh-240px)]">
        <Table className="relative h-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="h-10" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(rowClassName?.(row.original))}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-col items-center justify-end gap-2 space-x-2 pt-4 sm:flex-row">
        <div className="flex-1 mb-1.5 text-sm text-muted-foreground">
          {totalItems > 0 ? (
            <>
              Показується від{' '}
              {paginationState.pageIndex * paginationState.pageSize + 1} до{' '}
              {Math.min(
                (paginationState.pageIndex + 1) * paginationState.pageSize,
                totalItems,
              )}{' '}
              з {totalItems}
            </>
          ) : (
            'Не знайдено'
          )}
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <p className="whitespace-nowrap text-sm font-medium">
              Записів на сторінці
            </p>
            <Select
              value={`${paginationState.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={paginationState.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          {totalItems > 0 ? (
            <>
              Сторінка {paginationState.pageIndex + 1} з {table.getPageCount()}
            </>
          ) : (
            'Нема сторінок'
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
