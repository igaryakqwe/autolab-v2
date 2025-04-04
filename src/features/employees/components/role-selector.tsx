import { DataTableFilterBox } from '@/components/table/data-table-filter-box';
import { rolesOptions } from '@/features/employees/constants/roles-options';

const RoleSelector = () => {
  return (
    <DataTableFilterBox searchKey="role" title="Роль" options={rolesOptions} />
  );
};

export default RoleSelector;
