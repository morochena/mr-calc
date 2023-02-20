
import type { Database } from "./supabase";

export type Monster = Database["public"]["Tables"]["monsters"]["Row"]
export type Spell = Database["public"]["Tables"]["spells"]["Row"]
export type Equipment = Database["public"]["Tables"]["equipment"]["Row"]


export type MonsterSize = "tiny" | "small" | "medium" | "large" | "huge" | "gargantuan" | "colossal";
export type MonsterType = "aberration" | "beast" | "celestial" | "construct" | "dragon" | "elemental" | "fey" | "fiend" | "giant" | "humanoid" | "monstrosity" | "ooze" | "plant" | "undead";
export type MonsterStat = "str" | "dex" | "emp" | "int"
export type MonsterSkill = "smash" | "launch" | "provoke" | "stealth" | "travel" | "thievery" | "physique" | "lore" | "mysticism" | "reasoning" | "resourcefulness" | "rapport" | "notice" | "willpower";

