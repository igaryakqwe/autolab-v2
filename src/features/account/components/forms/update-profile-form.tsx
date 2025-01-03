'use client';

import { useState, useEffect, FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import AvatarUpload from '@/components/avatar-upload';
import { cn } from '@/utils/style-utils';
import { uk } from 'date-fns/locale/uk';
import { fillProfileSchema, TUpdateProfileData } from '@/types/account';
import { api } from '@/lib/trpc/client';
import { toast } from 'sonner';
import RequestError from '@/server/common/request-error';
import useAuth from '@/hooks/use-auth';
import { uploadImageToS3 } from '@/server/api/actions/account-actions';

interface UpdateProfileFormProps {
  setProgress: (progress: number) => void;
}

const UpdateProfileForm: FC<UpdateProfileFormProps> = ({ setProgress }) => {
  const { user, update } = useAuth();
  const [avatar, setAvatar] = useState<File | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<TUpdateProfileData>({
    resolver: zodResolver(fillProfileSchema),
    defaultValues: {
      firstName: user?.firstName ?? undefined,
      lastName: user?.lastName ?? undefined,
      middleName: user?.middleName ?? undefined,
      gender: user?.gender ?? undefined,
      birthDate: user?.birthDate ? new Date(user?.birthDate) : undefined,
      phone: user?.phone ?? undefined,
    },
  });

  const watchAllFields = watch();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const updateProfileMutation = api.account.updateUserInfo.useMutation();

  useEffect(() => {
    const calculateProgress = () => {
      const fields = ['firstName', 'lastName', 'phone', 'gender', 'birthDate'];
      const filledFields = fields.filter(
        (field) => !!watchAllFields[field as keyof TUpdateProfileData],
      );
      const avatarField = user?.image ? 1 : 0;
      return ((filledFields.length + avatarField) / (fields.length + 1)) * 100;
    };

    setProgress(calculateProgress());
  }, [watchAllFields, avatar]);

  const onSubmit = async (data: TUpdateProfileData) => {
    try {
      let imageUrl = user?.image;

      if (avatar) {
        const formData = new FormData();
        formData.append('id', user?.id as string);
        formData.append('file', avatar);
        const result = await uploadImageToS3(formData);
        imageUrl = result.url;
      }

      await updateProfileMutation.mutateAsync({
        ...data,
        image: imageUrl as string,
      });
      await update({ user: { ...user, ...data, image: imageUrl } });
      toast.success('Дані успішно збережені');
    } catch (error) {
      toast.error('Помилка при збереженні даних', {
        description: (error as RequestError).message,
      });
    }
  };

  return (
    <DndContext sensors={sensors}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-8">
          <div className="md:col-span-1 space-y-3">
            <div className="flex flex-col items-center space-y-4">
              <AvatarUpload
                initialAvatar={user?.image as string}
                onAvatarChange={(file) => setAvatar(file)}
              />
              <p className="text-sm text-muted-foreground text-center">
                Перетягніть нове зображення або клікніть, щоб вибрати файл
              </p>
            </div>
            <div className="space-y-1">
              <Label>Стать</Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="MALE" id="male" />
                      <Label htmlFor="male">Чоловіча</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="FEMALE" id="female" />
                      <Label htmlFor="female">Жіноча</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.gender && (
                <p className="text-sm text-red-500">{errors.gender.message}</p>
              )}
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="firstName"
                    label="Імʼя"
                    placeholder="Введіть імʼя..."
                    error={errors.firstName?.message || ''}
                    {...field}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="lastName"
                    label="Прізвище"
                    placeholder="Введіть прізвище..."
                    error={errors.lastName?.message || ''}
                    {...field}
                  />
                )}
              />
            </div>
            <Controller
              name="middleName"
              control={control}
              render={({ field }) => (
                <Input
                  id="middleName"
                  label="По-батькові"
                  placeholder="Введіть по-батькові (необовʼязково)"
                  error={errors.middleName?.message || ''}
                  {...field}
                />
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    id="phone"
                    label="Номер телефону"
                    type="tel"
                    placeholder="+380XXXXXXXXX"
                    error={errors.phone?.message || ''}
                    {...field}
                  />
                )}
              />
              <div className="space-y-1">
                <Label>Дата народження</Label>
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="lg"
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, 'PP', { locale: uk })
                          ) : (
                            <span>Оберіть дату</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          locale={uk}
                          captionLayout="dropdown"
                          selected={field.value || new Date('2000-01-01')}
                          onSelect={field.onChange}
                          fromYear={1960}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.birthDate && (
                  <p className="text-sm text-red-500">
                    {errors.birthDate.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <Button isLoading={isSubmitting} type="submit" className="w-full">
          Зберегти зміни
        </Button>
      </form>
    </DndContext>
  );
};

export default UpdateProfileForm;
