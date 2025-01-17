import { TransactionsService } from './transactions.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get(':userId')
  async getTransactionsByUser(@Param('userId') userId: string) {
    return this.transactionsService.getTransactionsByUser(userId);
  }

  @Post()
  async createTransaction(
    @Body('userId') userId: string,
    @Body('type') type: 'income' | 'expense',
    @Body('amount') amount: number,
    @Body('category') category: string,
    @Body('description') description: string,
    @Body('transactionDate') transactionDate: string,
  ) {
    return this.transactionsService.createTransaction(
      userId,
      type,
      amount,
      category,
      description,
      transactionDate,
    );
  }

}
