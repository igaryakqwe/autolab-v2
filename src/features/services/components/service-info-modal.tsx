import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { InfoIcon } from 'lucide-react';
import ServiceInfoCard from '@/features/services/components/service-info-card';
import { Service } from '@/types/service';

interface ServiceInfoModalProps {
  service: Service;
}

const ServiceInfoModal = ({ service }: ServiceInfoModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary" size="icon">
          <InfoIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <ServiceInfoCard service={service} />
      </DialogContent>
    </Dialog>
  );
};

export default ServiceInfoModal;
