'use client';

import { Input } from '@/components/ui/input';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { cn } from '@/utils/style-utils';
import { ListFilter } from 'lucide-react';

const DataTableSearch = () => {
  const [, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [searchQuery, setSearchQuery] = useQueryState(
    'search',
    parseAsString.withDefault(''),
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  return (
    <div className="relative">
      <Input
        placeholder="Пошук"
        value={searchQuery ?? ''}
        onChange={(e) => handleSearch(e.target.value)}
        className={cn('w-full h-9 md:max-w-sm peer min-w-40 ps-9')}
        aria-label="Filter by name or email"
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <ListFilter size={16} strokeWidth={2} aria-hidden="true" />
      </div>
    </div>
  );
};

export default DataTableSearch;
