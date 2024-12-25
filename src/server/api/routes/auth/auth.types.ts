import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const approveEmailSchema = z.object({
  email: z.string().email(),
  token: z.string(),
});
