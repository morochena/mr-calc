import type { CombinedEffect, Spell } from "../../../../../../types/types";

export const movementCondition = (spell: Spell, effect: CombinedEffect, trueTier?: number) => {
  let tier = trueTier || effect.tier;

  switch (tier) {
    case 1:
      return 3;
    case 2:
      return 6;
    case 3:
    default:
      return 12;
  }
};
