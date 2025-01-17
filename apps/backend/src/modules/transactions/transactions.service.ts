import { v4 as uuidv4, validate as isUUID } from 'uuid';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getTransactionsByUser(userId: string) {
    const supabase = this.supabaseService.getClient();

    // Validar que el user_id sea un UUID válido
    if (!isUUID(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    // Verificar que el usuario exista
    const { data: userExists, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (userError || !userExists) {
      throw new BadRequestException('User does not exist');
    }

    // Obtener todas las transacciones del usuario
    const { data: transactions, error: transactionsError } = await supabase
      .from('transactions')
      .select('id, type, amount, category, description, transaction_date, created_at')
      .eq('user_id', userId)
      .order('transaction_date', { ascending: false });

    if (transactionsError) {
      throw new InternalServerErrorException(`Error fetching transactions: ${transactionsError.message}`);
    }

    return transactions;
  }

  async createTransaction(
    userId: string,
    type: 'income' | 'expense',
    amount: number,
    category: string,
    description: string,
    transactionDate: string,
  ) {
    const supabase = this.supabaseService.getClient();

    // Validar que el user_id sea un UUID válido
    if (!isUUID(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    // Validar que el usuario exista en la tabla `users`
    const { data: userExists, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (userError || !userExists) {
      throw new BadRequestException('User does not exist');
    }

    // Validar que el tipo de transacción sea válido
    if (!['income', 'expense'].includes(type)) {
      throw new BadRequestException('Invalid transaction type');
    }

    // Validar que el monto sea mayor a 0
    if (amount <= 0) {
      throw new BadRequestException('Transaction amount must be greater than zero');
    }

    // Validar que la categoría no esté vacía
    if (!category || typeof category !== 'string') {
      throw new BadRequestException('Category is required');
    }

    // Validar que la fecha sea válida
    if (isNaN(Date.parse(transactionDate))) {
      throw new BadRequestException('Invalid transaction date');
    }

    // Generar un ID para la transacción (si es necesario)
    const transactionId = uuidv4();

    // Insertar la transacción en la tabla `transactions`
    const { error } = await supabase.from('transactions').insert([
      {
        id: transactionId, // Si la base de datos no genera IDs automáticamente
        user_id: userId,
        type,
        amount,
        category,
        description,
        transaction_date: transactionDate,
      },
    ]);

    if (error) {
      throw new InternalServerErrorException(`Error creating transaction: ${error.message}`);
    }

    return {
      message: 'Transaction created successfully',
      transactionId,
    };
  }
}
