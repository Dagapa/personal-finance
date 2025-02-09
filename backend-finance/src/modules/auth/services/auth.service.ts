import { User } from '../models/user.model';
import { config } from '../../../config/env';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = createClient(config.SUPABASE_URL, config.SUPABASE_KEY);

export const authService = {
  signUp: async (email: string, password: string): Promise<User> => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('User not found');

    return {
      id: data.user.id,
      email: data.user.email!,
      createdAt: new Date(data.user.created_at!),
    };
  },

  signIn: async (email: string, password: string): Promise<User> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('User not found');

    return {
      id: data.user.id,
      email: data.user.email!,
      createdAt: new Date(data.user.created_at!),
    };
  },
};