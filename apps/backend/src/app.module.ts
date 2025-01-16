import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace las variables accesibles globalmente
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SupabaseService
  ],
})
export class AppModule { }
