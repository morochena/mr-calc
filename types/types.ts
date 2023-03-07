
import type { Database } from "./supabase";

export type Monster = Database["public"]["Tables"]["monsters"]["Row"]
export type Equipment = Database["public"]["Tables"]["equipment"]["Row"]

export type MonsterSize = "tiny" | "small" | "medium" | "large" | "huge" | "gargantuan" | "colossal";
export type MonsterType = "aberration" | "beast" | "celestial" | "construct" | "dragon" | "elemental" | "fey" | "fiend" | "giant" | "humanoid" | "monstrosity" | "ooze" | "plant" | "undead";
export type MonsterStat = "str" | "dex" | "emp" | "int"
export type MonsterSkill = "smash" | "launch" | "provoke" | "stealth" | "travel" | "thievery" | "physique" | "lore" | "mysticism" | "reasoning" | "resourcefulness" | "rapport" | "notice" | "willpower";

export type ItemType = "npcs" | "equipment" | "spells"

export type Domain = 'Sorcery' | 'Fire' | 'Water' | 'Earth' | 'Air' | 'Necromancy' | 'Holy' | 'Mind' | 'Illusion' | 'Nature';

export type Effect = {
  id: number;
  name: string;
  domains: Domain[];
  modifierType: 'add' | 'multiply' | 'function' | 'functionMultiply';
  amount: string | number;
  prerequisite?: string[];
  incompatible?: string[];
  hasTiers: boolean;
  description: string;
  maxTier?: number;
  notes?: string;
};

export type SelectedEffect = {
  id: number;
  tier: number;
  meta?: string;
};

export type Modifier = {
  id: number;
  name: string;
  hasTiers?: boolean;
  incompatible?: string[];
  prerequisite?: string[];
  modifierType: 'add' | 'reduce' | 'multiply' | 'function' | 'functionMultiply';
  amount: number | string;
  description: string;
  types?: string[];
  maxTier?: number;
};

export type SelectedModifier = {
  id: number;
  tier: number;
  meta?: string;
};

export type ModifierOrEffect = Modifier | Effect;

export type Spell = {
  id: number;
  user_id: string;
  name: string;
  inserted_at: string;
  spell_data: {
    description: string;
    domain: Domain;
    mode: string;
    effects: Effect[];
    modifiers: Modifier[];
    isAlchemy: boolean;
    isRunesmith: boolean;
  };
  is_public: boolean;
  tags: string | string[];
  profiles: {
    id: string;
    username: string;
  };
};