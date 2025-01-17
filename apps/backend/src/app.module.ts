import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { SupabaseService } from './supabase/supabase.service';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace las variables accesibles globalmente
    }),
    UsersModule,
    TransactionsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SupabaseService
  ],
})
export class AppModule { }
