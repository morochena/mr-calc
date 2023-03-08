import type { Spell } from "../../../../../types/types";
import { calculateTotalSP } from "../SPCalculations";
import { getProcessedModifiers } from "../getModifiersAndEffects";

export function calculateMentalCost(spell: Spell) {
  const SP = calculateTotalSP(spell).cost;
  let cost = Math.ceil(SP / 10.0) + 1;

  const modifiers = getProcessedModifiers(spell);

  if (modifiers.filter(mod => mod.name === "Exhausting").length > 0) {
    cost += 1;
  }
  if (modifiers.filter(mod => mod.name === "Uncomplicated").length > 0) {
    cost -= 1;
  }

  return cost;
}
