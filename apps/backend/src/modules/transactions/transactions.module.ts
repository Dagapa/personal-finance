import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { TransactionsController } from './transactions.controller';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, SupabaseService],
})
export class TransactionsModule {}
