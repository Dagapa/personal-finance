import { z } from 'zod';

export const TransactionSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  type: z.enum(['income', 'expense']),
  amount: z.number().positive().multipleOf(0.01),
  category: z.string().min(1),
  description: z.string().nullable(),
  transaction_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // formato YYYY-MM-DD
  created_at: z.string().nullable()
});

export const CreateTransactionSchema = TransactionSchema.omit({
  id: true,
  created_at: true
}).extend({
  description: z.string().nullable().optional(),
  created_at: z.string().nullable().optional()
});

export const UpdateTransactionSchema = TransactionSchema.partial().omit({
  id: true,
  user_id: true
});

export type Transaction = z.infer<typeof TransactionSchema>;
export type CreateTransactionDTO = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransactionDTO = z.infer<typeof UpdateTransactionSchema>;