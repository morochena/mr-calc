import { calculateSpellCost } from "./calculateSpellCost";
import type { Spell } from "../../../../types/types";

export function calculateSpellResist(spell: Spell) {
  return calculateSpellCost(spell) + 5;
}
