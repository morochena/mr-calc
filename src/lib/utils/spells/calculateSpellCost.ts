import type { Spell } from "../../../../types/types";
import { calculateTotalSP } from "./calculateSpellSP";
import { getCombinedModifiers } from "./getCombinedEffects";

export function calculateSpellCost(spell: Spell) {
  const SP = calculateTotalSP(spell).cost;
  let cost = Math.ceil(SP / 10.0) + 1;

  const modifiers = getCombinedModifiers(spell);

  if (modifiers.filter(mod => mod.name === "Exhausting").length > 0) {
    cost += 1;
  }
  if (modifiers.filter(mod => mod.name === "Uncomplicated").length > 0) {
    cost -= 1;
  }

  return cost;
}
