import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Невірний формат email'),
  password: z.string().min(8, 'Пароль повинен містити мінімум 8 символів'),
});

export const signUpSchema = z.object({
  email: z.string().email('Невірний формат email'),
  password: z.string().min(8, 'Пароль повинен містити мінімум 8 символів'),
  confirmPassword: z
    .string()
    .min(8, 'Пароль повинен містити мінімум 8 символів'),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
export type SignUpFormInputs = z.infer<typeof signUpSchema>;
