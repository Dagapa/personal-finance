import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class UsersService {
  constructor(private readonly supabaseService: SupabaseService) { }

  async createUser(email: string, password: string, name: string) {
    const supabase = this.supabaseService.getClient();

    // Crear un nuevo usuario en Supabase Auth
    const { data: user, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      throw new BadRequestException(`Auth Error: ${authError.message}`);
    }

    // Crear el perfil del usuario en la tabla "users"
    const { error: dbError } = await supabase.from('users').insert([
      {
        id: user.user?.id,
        email,
        name,
      },
    ]);

    if (dbError) {
      throw new BadRequestException(`DB Error: ${dbError.message}`);
    }

    return {
      message: 'User created successfully',
      user: { email, name },
    };
  }
}
