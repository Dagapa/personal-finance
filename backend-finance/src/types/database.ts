export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: string
          amount: number
          description: string
          category: string
          type: 'ingreso' | 'gasto'
          created_at: string
        }
        Insert: {
          id?: string
          amount: number
          description: string
          category: string
          type: 'ingreso' | 'gasto'
          created_at?: string
        }
        Update: {
          id?: string
          amount?: number
          description?: string
          category?: string
          type?: 'ingreso' | 'gasto'
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// También podemos generar tipos específicos para las consultas de Supabase
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Tipos útiles para las operaciones de la tabla transactions
export type TransactionRow = Tables<'transactions'>
export type InsertTransaction = Database['public']['Tables']['transactions']['Insert']
export type UpdateTransaction = Database['public']['Tables']['transactions']['Update']