import { calculateMentalCost } from "./mentalCostCalculation";
import type { Spell } from "../../../../../types/types";

export function calculateSpellResist(spell: Spell) {
  return calculateMentalCost(spell) + 5;
}
