export const config = {
  SUPABASE_URL: process.env['SUPABASE_URL']!,
  SUPABASE_KEY: process.env['SUPABASE_KEY']!,
  JWT_SECRET: process.env['JWT_SECRET']!,
  PORT: parseInt(process.env['PORT']!, 10) || 3000,
};
