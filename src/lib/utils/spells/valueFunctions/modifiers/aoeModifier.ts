import type { CombinedModifier, Spell } from "../../../../../../types/types";

export const aoeModifier = (spell: Spell, modifier: CombinedModifier, trueTier?: number) => {
  let tier = trueTier || modifier.tier;
  let cost = 0;

  for (let i = 0; i < tier; i++) {
    if (i < 10) {
      cost += 2;
    } else if (i < 20) {
      cost += 3;
    } else if (i < 30) {
      cost += 4;
    } else {
      cost += 5;
    }
  }

  return cost;
};
