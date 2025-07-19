'use client';

import VehicleHeader from '@/features/vehicles/components/vehicle-header';
import VehicleSpecifications from '@/features/vehicles/components/vehicle-specifications';
import VehicleOwner from '@/features/vehicles/components/vehicle-owner';
import ServiceHistory from '@/features/vehicles/components/service-history';

const VehiclePage = () => {
  return (
    <div className="h-fit">
      <VehicleHeader />

      <div className="flex gap-6 w-full lg:flex-nowrap flex-wrap">
        <div className="flex flex-col gap-6 w-full">
          <VehicleSpecifications />
          <VehicleOwner />
        </div>
        <ServiceHistory />
      </div>
    </div>
  );
};

export default VehiclePage;
