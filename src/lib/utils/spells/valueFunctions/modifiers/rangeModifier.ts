import type { CombinedModifier, Spell } from "../../../../../../types/types";

export const rangeModifier = (spell: Spell, modifier: CombinedModifier, trueTier?: number) => {
  let tier = trueTier || modifier.tier;
  let cost = 0;

  for (let i = 0; i < tier; i++) {
    if (i < 5) {
      cost += 2;
    } else if (i < 10) {
      cost += 3;
    } else {
      cost += 4;
    }
  }

  return cost;
};
