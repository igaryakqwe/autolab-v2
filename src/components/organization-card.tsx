import { OrganizationInfo } from '@/types/organization';
import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Briefcase,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  UserCircle,
  Users,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import OrganizationLogo from '@/components/organization-logo';
import { roleMapper } from '@/constants/role-mapper';

interface OrganizationCardProps {
  organization: OrganizationInfo;
}

const OrganizationCard: FC<OrganizationCardProps> = ({ organization }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="p-4 pb-3">
        <CardTitle className="flex items-center gap-2">
          <OrganizationLogo
            name={organization.name}
            image={organization.logo as string}
          />
          <span className="text-lg font-semibold">{organization.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 px-4 flex-grow flex flex-col justify-between">
        <div className="pl-0.5 space-y-2">
          <Badge className="font-medium">
            <UserCircle className="h-3 w-3 mr-1" />
            {roleMapper[organization.userPosition]}
          </Badge>
          {organization.address && (
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate text-sm">{organization.address}</span>
            </p>
          )}
          {organization.phone && (
            <p className="text-sm flex items-center gap-2">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{organization.phone}</span>
            </p>
          )}
          {organization.email && (
            <p className="text-sm flex items-center gap-2">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{organization.email}</span>
            </p>
          )}
          {organization.website && (
            <p className="text-sm flex items-center gap-2">
              <Globe className="h-4 w-4 flex-shrink-0" />
              <a
                href={organization.website}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-blue-500 hover:underline"
              >
                {organization.website}
              </a>
            </p>
          )}
        </div>
        <div className="mt-3 flex gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {organization.employeesCount}
                </Badge>
              </TooltipTrigger>
              <TooltipContent variant="secondary">
                <p>Працівники</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {organization.servicesCount}
                </Badge>
              </TooltipTrigger>
              <TooltipContent variant="secondary">
                <p>Послуги</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {organization.serviceRecordsCount}
                </Badge>
              </TooltipTrigger>
              <TooltipContent variant="secondary">
                <p>Записи</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;
