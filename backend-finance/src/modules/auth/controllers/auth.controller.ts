import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.signUp(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.signIn(email, password);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};