import { Service } from '@/types/service';

export const filterServices = (
  search: string,
  services?: Service[],
): Service[] => {
  if (!services) return [];

  return services.filter(
    (service) =>
      service.title.toLowerCase().includes(search.toLowerCase()) ||
      service.description?.toLowerCase().includes(search.toLowerCase()) ||
      service.duration.toString().includes(search),
  );
};

export default filterServices;
