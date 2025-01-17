import { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import LogoUpload from '@/components/logo-upload';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { uploadOrganizationLogo } from '@/server/api/actions/account-actions';
import * as z from 'zod';
import { organizationSchema } from '@/types/organization';
import { api } from '@/lib/trpc/client';
import RequestError from '@/server/common/request-error';
import CreateOrganizationMap from '@/features/account/components/create-organization-map';
import useOrganizationsStore from '@/store/use-organizations-store';

type TCreateOrganizationData = z.infer<typeof organizationSchema>;

interface CreateOrganizationFormProps {
  onClose: () => void;
}

const CreateOrganizationForm: FC<CreateOrganizationFormProps> = ({
  onClose,
}) => {
  const { organizations, setOrganizations } = useOrganizationsStore();
  const [logo, setLogo] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TCreateOrganizationData>({
    resolver: zodResolver(organizationSchema),
  });

  const createOrganization = api.organization.create.useMutation();

  const handleLocationSelect = (
    lat: number,
    lng: number,
    selectedAddress: string,
  ) => {
    setValue('latitude', lat);
    setValue('longitude', lng);
    setValue('address', selectedAddress);
  };

  const handleLogoChange = (file: File | null) => {
    setLogo(file);
  };

  const onSubmit = async (data: TCreateOrganizationData) => {
    try {
      let logoUrl;

      if (logo) {
        const formData = new FormData();
        formData.append('id', crypto.randomUUID());
        formData.append('file', logo);
        const result = await uploadOrganizationLogo(formData);
        logoUrl = result.url;
      }

      const res = await createOrganization.mutateAsync({
        ...data,
        logo: logoUrl,
      });

      setOrganizations([...organizations, res]);
      onClose();
      toast.success('Організацію успішно створено');
    } catch (error) {
      toast.error('Помилка при створенні організації', {
        description: (error as RequestError).message,
      });
    }
  };

  return (
    <ScrollArea className="max-h-[80vh] overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 px-3 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 mt-3.5">
              <div className="flex justify-center">
                <LogoUpload onLogoChange={handleLogoChange} />
              </div>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Назва"
                    error={errors.name?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Телефон"
                    error={errors.phone?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    type="email"
                    label="Email"
                    error={errors.email?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="website"
                control={control}
                render={({ field }) => (
                  <Input
                    type="url"
                    label="Веб-сайт"
                    error={errors.website?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <div>
              <div className="space-y-2">
                <Label>Адреса</Label>
                <CreateOrganizationMap
                  onLocationSelect={handleLocationSelect}
                  className="h-[250px] rounded-md border border-input"
                />
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="min-h-8 text-center text-sm truncate">
                          {field.value || ''}
                        </p>
                      </TooltipTrigger>
                      {field.value && (
                        <TooltipContent variant="outline">
                          <p>{field.value}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  )}
                />
              </div>

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    label="Опис"
                    className="h-32 resize-none"
                    error={errors.description?.message}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end px-3 py-4">
          <Button type="submit" isLoading={isSubmitting}>
            Зберегти організацію
          </Button>
        </div>
      </form>
    </ScrollArea>
  );
};

export default CreateOrganizationForm;
