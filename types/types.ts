
import type { Database } from "./supabase";

export type MonsterSize = "tiny" | "small" | "medium" | "large" | "huge" | "gargantuan" | "colossal";
export type MonsterType = "aberration" | "beast" | "celestial" | "construct" | "dragon" | "elemental" | "fey" | "fiend" | "giant" | "humanoid" | "monstrosity" | "ooze" | "plant" | "undead";
export type MonsterStat = "str" | "dex" | "emp" | "int"
export type MonsterSkill = "smash" | "launch" | "provoke" | "stealth" | "travel" | "thievery" | "physique" | "lore" | "mysticism" | "reasoning" | "resourcefulness" | "rapport" | "notice" | "willpower";

export type EntityType = "npcs" | "equipment" | "spells"

export type Domain = 'Sorcery' | 'Fire' | 'Water' | 'Earth' | 'Air' | 'Necromancy' | 'Holy' | 'Mind' | 'Illusion' | 'Nature';


export type SpellMode = 'Unpredictable' | 'Stable' | 'Imbue' | 'Spell';

export type Effect = {
  id: number;
  name: string;
  domains: Domain[];
  modifierType: 'add' | 'multiply' | 'function' | 'functionMultiply';
  amount: number | Function;
  prerequisite?: string[];
  incompatible?: string[];
  hasTiers: boolean;
  description: string;
  maxTier?: number;
  notes?: string;
  descriptionFunctions?: Function[];
};

export type SelectedEffect = {
  id: number;
  tier: number;
  meta?: string;
};

export type CombinedEffect = Effect & SelectedEffect

export type Modifier = {
  id: number;
  name: string;
  hasTiers?: boolean;
  incompatible?: string[];
  prerequisite?: string[];
  modifierType: 'add' | 'reduce' | 'multiply' | 'function' | 'functionMultiply';
  amount: number | Function;
  description: string;
  types?: string[];
  maxTier?: number;
  descriptionFunctions?: Function[];
};

export type SelectedModifier = {
  id: number;
  tier: number;
  meta?: string;
};

export type CombinedModifier = Modifier & SelectedModifier

export type ModifierOrEffect = Modifier | Effect;
export type CombinedModifierOrEffect = CombinedModifier | CombinedEffect

export type ProcessedModifier = CombinedModifier & { domainTier: number, fromDomain?: boolean }
export type ProcessedEffect = CombinedEffect & { domainTier: number, fromDomain?: boolean }
export type ProcessedModifierOrEffect = CombinedModifierOrEffect & { domainTier: number, fromDomain?: boolean }

export type Equipment = {
  id: number;
  user_id: string;
  created_at: string;
  name: string;
  type: string;
  damage_formula: string;
  roll_bonus: number;
  skills: string | string[];
  specialties: string | string[];
  armor_piercing: number;
  range: number;
  structure_points: number;
  tags: string | string[];
  is_public: boolean;
}


export type Spell = {
  id: number;
  user_id: string;
  name: string;
  inserted_at: string;
  description: string;
  domain: Domain;
  mode: SpellMode;
  selected_effects: SelectedEffect[];
  selected_modifiers: SelectedModifier[];
  is_alchemy: boolean;
  is_runesmith: boolean;
  is_public: boolean;
  tags: string | string[];
  profiles: {
    id: string;
    username: string;
  };
};

export type Monster = {
  id: number;
  user_id: string;
  name: string;
  inserted_at: string;
  str: number;
  dex: number;
  emp: number;
  int: number;
  description: string;
  smash: number;
  launch: number;
  athletics: number;
  physique: number;
  provoke: number;
  accuracy: number;
  mobility: number;
  thievery: number;
  notice: number;
  stealth: number;
  animal_handling: number;
  deceive: number;
  rapport: number;
  willpower: number;
  mysticism: number;
  craft: number;
  travel: number;
  reasoning: number;
  lore: number;
  resourcefulness: number;
  specialties: Record<string, { value: string; skill: string }> | string;
  size: string;
  difficulty: string;
  is_public: boolean;
  tags: string[] | string;
  spell_ids: string[] | string;
  equipment_ids: string[] | string;
  spells: any | undefined;
  equipment: any | undefined;
};