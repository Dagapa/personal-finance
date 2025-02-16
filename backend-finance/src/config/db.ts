import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env['SUPABASE_URL']!;
const supabaseKey = process.env['SUPABASE_KEY']!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;