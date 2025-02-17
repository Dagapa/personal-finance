import { supabase } from '../config/supabase';
import { SignUpDTO, SignInDTO, SignUpSchema, SignInSchema } from '../types/auth';

import z from 'zod';
import { Request, Response } from 'express';

export const signUp = async (req: Request<{}, {}, SignUpDTO>, res: Response) => {
  try {
    const validatedData = SignUpSchema.parse(req.body);
    
    // Primero creamos el usuario en la tabla users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          email: validatedData.email,
          name: validatedData.name
        }
      ])
      .select()
      .single();

    if (userError) {
      // Si el error es de unique constraint en email
      if (userError.code === '23505') {
        return res.status(400).json({ 
          error: 'El email ya está registrado' 
        });
      }
      throw userError;
    }

    // Luego creamos la autenticación
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          id: userData.id, // Vinculamos con el id del usuario creado
          name: validatedData.name
        }
      }
    });

    if (authError) {
      // Si hay error en auth, eliminamos el usuario creado
      await supabase
        .from('users')
        .delete()
        .eq('id', userData.id);
      throw authError;
    }

    res.status(201).json({
      message: 'Usuario registrado exitosamente. Por favor verifica tu email.',
      user: userData
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
    const validatedData = SignInSchema.parse(req.body);

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password
    });

    if (authError) throw authError;

    // Obtener los datos del usuario de nuestra tabla users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', validatedData.email)
      .single();

    if (userError) throw userError;

    res.json({
      session: authData.session,
      user: userData
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