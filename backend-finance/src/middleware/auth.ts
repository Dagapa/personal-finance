import { supabase } from '../config/supabase';
import { Database } from '../types/database';

import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: Database['public']['Tables']['users']['Row'];
}

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'No se proporcionó token de autorización' });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    // Obtener datos del usuario de nuestra tabla users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    req.user = userData;
    next();
  } catch (error) {
    res.status(401).json({ 
      error: error instanceof Error ? error.message : 'Error de autenticación'
    });
  }
};