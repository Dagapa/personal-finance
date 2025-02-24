import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { SignUpDTO, SignInDTO, SignUpSchema, SignInSchema } from '../types/auth';
import z from 'zod';

export const signUp = async (req: Request<{}, {}, SignUpDTO>, res: Response) => {
  console.log('Registrando usuario...');

  try {
    // Validar datos de entrada
    const validatedData = SignUpSchema.parse(req.body);
    
    // Registrar usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          full_name: validatedData.full_name
        }
      }
    });

    if (authError) throw authError;

    // Crear perfil de usuario en la tabla users
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email: validatedData.email,
            full_name: validatedData.full_name
          }
        ]);

      if (profileError) throw profileError;
    }

    res.status(201).json({
      message: 'Usuario registrado exitosamente. Por favor verifica tu email.',
      user: authData.user
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }
};

export const signIn = async (req: Request<{}, {}, SignInDTO>, res: Response) => {
  try {
    // Validar datos de entrada
    const validatedData = SignInSchema.parse(req.body);

    // Iniciar sesión con Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password
    });

    if (error) throw error;

    res.json({
      session: data.session,
      user: data.user
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }
};
