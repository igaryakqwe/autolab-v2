'use client';

import VehicleHeader from '@/features/vehicles/components/vehicle-header';
import VehicleSpecifications from '@/features/vehicles/components/vehicle-specifications';
import VehicleOwner from '@/features/vehicles/components/vehicle-owner';
import ServiceHistory from '@/features/vehicles/components/service-history';
import useVehicleQuery from '@/features/vehicles/hooks/queries/use-vehicle.query';
import { notFound } from 'next/navigation';
import useVehicleServiceRecordsQuery from '@/features/vehicles/hooks/queries/use-vehicle-service-records.query';

interface VehiclePageProps {
  vehicleId: string;
}

const VehiclePage = ({ vehicleId }: VehiclePageProps) => {
  const { vehicle } = useVehicleQuery(vehicleId);
  const { serviceRecords } = useVehicleServiceRecordsQuery(vehicleId);

  const vehicleOwner = vehicle?.user || vehicle?.client;

  if (!vehicle || !serviceRecords || !vehicleOwner) return notFound();

  return (
    <div className="pb-6">
      <VehicleHeader {...vehicle} />

      <div className="flex gap-6 w-full lg:flex-nowrap flex-wrap">
        <div className="flex flex-col gap-6 w-full">
          <VehicleSpecifications {...vehicle} />
          <VehicleOwner {...vehicleOwner} />
        </div>
        <ServiceHistory records={serviceRecords} />
      </div>
    </div>
  );
};

export default VehiclePage;
