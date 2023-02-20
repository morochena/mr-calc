export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      equipment: {
        Row: {
          armor_piercing: number | null
          created_at: string | null
          damage_formula: string | null
          id: number
          name: string
          range: number | null
          roll_bonus: number | null
          skills: string[] | null
          specialties: string[] | null
          structure_points: number | null
          tags: string[] | null
          type: string | null
          user_id: string
        }
        Insert: {
          armor_piercing?: number | null
          created_at?: string | null
          damage_formula?: string | null
          id?: number
          name: string
          range?: number | null
          roll_bonus?: number | null
          skills?: string[] | null
          specialties?: string[] | null
          structure_points?: number | null
          tags?: string[] | null
          type?: string | null
          user_id: string
        }
        Update: {
          armor_piercing?: number | null
          created_at?: string | null
          damage_formula?: string | null
          id?: number
          name?: string
          range?: number | null
          roll_bonus?: number | null
          skills?: string[] | null
          specialties?: string[] | null
          structure_points?: number | null
          tags?: string[] | null
          type?: string | null
          user_id?: string
        }
      }
      monsters: {
        Row: {
          accuracy: number
          animal_handling: number
          athletics: number
          craft: number
          deceive: number
          description: string | null
          dex: number
          difficulty: string
          emp: number
          equipment_ids: number[] | null
          id: number
          inserted_at: string
          int: number
          is_public: boolean
          launch: number
          lore: number
          mobility: number
          mysticism: number
          name: string | null
          notice: number
          physique: number
          provoke: number
          rapport: number
          reasoning: number
          resourcefulness: number
          size: string
          smash: number
          specialties: Json
          spell_ids: number[] | null
          stealth: number
          str: number
          tags: string[] | null
          thievery: number
          travel: number
          user_id: string
          willpower: number
        }
        Insert: {
          accuracy?: number
          animal_handling?: number
          athletics?: number
          craft?: number
          deceive?: number
          description?: string | null
          dex?: number
          difficulty?: string
          emp?: number
          equipment_ids?: number[] | null
          id?: number
          inserted_at?: string
          int?: number
          is_public?: boolean
          launch?: number
          lore?: number
          mobility?: number
          mysticism?: number
          name?: string | null
          notice?: number
          physique?: number
          provoke?: number
          rapport?: number
          reasoning?: number
          resourcefulness?: number
          size?: string
          smash?: number
          specialties?: Json
          spell_ids?: number[] | null
          stealth?: number
          str?: number
          tags?: string[] | null
          thievery?: number
          travel?: number
          user_id: string
          willpower?: number
        }
        Update: {
          accuracy?: number
          animal_handling?: number
          athletics?: number
          craft?: number
          deceive?: number
          description?: string | null
          dex?: number
          difficulty?: string
          emp?: number
          equipment_ids?: number[] | null
          id?: number
          inserted_at?: string
          int?: number
          is_public?: boolean
          launch?: number
          lore?: number
          mobility?: number
          mysticism?: number
          name?: string | null
          notice?: number
          physique?: number
          provoke?: number
          rapport?: number
          reasoning?: number
          resourcefulness?: number
          size?: string
          smash?: number
          specialties?: Json
          spell_ids?: number[] | null
          stealth?: number
          str?: number
          tags?: string[] | null
          thievery?: number
          travel?: number
          user_id?: string
          willpower?: number
        }
      }
      monsters_equipment: {
        Row: {
          created_at: string | null
          equipment_id: number
          id: number
          monster_id: number
        }
        Insert: {
          created_at?: string | null
          equipment_id: number
          id?: number
          monster_id: number
        }
        Update: {
          created_at?: string | null
          equipment_id?: number
          id?: number
          monster_id?: number
        }
      }
      monsters_spells: {
        Row: {
          created_at: string | null
          id: number
          monster_id: number
          spell_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          monster_id: number
          spell_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          monster_id?: number
          spell_id?: number
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
        }
      }
      spells: {
        Row: {
          id: number
          inserted_at: string
          is_public: boolean
          name: string | null
          spell_data: Json
          tags: string[] | null
          user_id: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          is_public?: boolean
          name?: string | null
          spell_data?: Json
          tags?: string[] | null
          user_id: string
        }
        Update: {
          id?: number
          inserted_at?: string
          is_public?: boolean
          name?: string | null
          spell_data?: Json
          tags?: string[] | null
          user_id?: string
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
