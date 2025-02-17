import { z } from 'zod';
import { Database } from './database';

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2)
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export type SignUpDTO = z.infer<typeof SignUpSchema>;
export type SignInDTO = z.infer<typeof SignInSchema>;
export type UserResponse = Database['public']['Tables']['users']['Row'];