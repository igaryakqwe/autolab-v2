import { z } from 'zod';

export interface Account {
  id: string;
  email: string;
  name: string;
  image: string | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  birthDate: string | null;
  gender: Gender | null;
  phone: string | null;
}

export const fillProfileSchema = z.object({
  image: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  middleName: z.string().optional(),
  gender: z.string().optional(),
  birthDate: z
    .date()
    .refine((date) => date <= new Date())
    .optional(),
  phone: z.string().optional(),
});

export const signInDataSchema = z.object({
  username: z.string().nonempty("Ім'я користувача обов'язкове"),
  email: z
    .string()
    .nonempty("Email обов'язковий")
    .email('Невірний формат email'),
});

const changePasswordSchemaShape = {
  currentPassword: z.string().nonempty("Поточний пароль обов'язковий"),
  newPassword: z
    .string()
    .min(8, 'Пароль повинен містити щонайменше 8 символів'),
  confirmNewPassword: z
    .string()
    .nonempty("Підтвердження нового пароля обов'язкове"),
};

export const changePasswordSchema = z
  .object(changePasswordSchemaShape)
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmNewPassword'],
  });

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export type TUpdateProfileData = z.infer<typeof fillProfileSchema>;
export type TUpdateSignInData = z.infer<typeof signInDataSchema>;
export type TUpdatePasswordData = z.infer<typeof changePasswordSchema>;
