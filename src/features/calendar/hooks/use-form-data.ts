import { api } from '@/lib/trpc/client';
import useOrganizationsStore from '@/store/use-organizations-store';
import { formatCurrency } from '@/utils/currency.utils';
import { formatShortDuration } from '@/utils/date.utils';
import { useMemo } from 'react';

const useFormData = () => {
  const { currentOrganization } = useOrganizationsStore();

  const [vehicles, employees, services] = api.useQueries((t) => [
    t.vehicle.getVehiclesByOrganization(currentOrganization!),
    t.employee.getAll(currentOrganization!),
    t.service.findAll(currentOrganization!),
  ]);

  const vehiclesOptions = useMemo(() => {
    return (
      vehicles.data?.map((vehicle) => ({
        value: vehicle.id,
        label: `${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})`,
      })) || []
    );
  }, [vehicles.data]);

  const employeesOptions = useMemo(() => {
    return (
      employees.data?.map((employee) => ({
        value: employee.id,
        label: `${employee.firstName} ${employee.lastName}`,
      })) || []
    );
  }, [employees.data]);

  const servicesOptions = useMemo(() => {
    return (
      services.data?.map((service) => ({
        value: service.id,
        label: `${service.title} - ${formatCurrency(service.price)} (${formatShortDuration(service.duration)})`,
      })) || []
    );
  }, [services.data]);

  return {
    vehicles: vehiclesOptions,
    employees: employeesOptions,
    servicesOptions,
    services: services.data || [],
    isLoading: vehicles.isLoading || employees.isLoading || services.isLoading,
    error: vehicles.error || employees.error || services.error,
  };
};

export default useFormData;
