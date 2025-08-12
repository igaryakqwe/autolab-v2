import { Badge } from '@/components/ui/badge';
import { Service } from '@/types/service';
import { formatShortDuration } from '@/utils/date.utils';
import { Clock } from 'lucide-react';

interface ServiceInfoCardProps {
  service: Service;
}

const ServiceInfoCard = ({ service }: ServiceInfoCardProps) => {
  const { title, description, price, duration } = service;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-bold">{title}</h3>
        <Badge className="ml-2 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {formatShortDuration(duration)}
        </Badge>
      </div>
      {description && <h4>{description}</h4>}
      <div className="flex items-center">
        <Badge
          variant="outline"
          className="flex items-center gap-1.5 border-green-200 bg-green-50 px-3 py-1.5 text-green-700"
        >
          <span className="text-sm font-semibold">{price.toFixed(2)} грн</span>
        </Badge>
      </div>
    </div>
  );
};

export default ServiceInfoCard;
