import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    const SUPABASE_URL = this.configService.get<string>('SUPABASE_URL');
    const SUPABASE_KEY = this.configService.get<string>('SUPABASE_KEY');

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      throw new Error('Supabase URL or Key is missing in environment variables');
    }

    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
