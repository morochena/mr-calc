import type { CombinedEffect, Spell } from "../../../../../../types/types";

export const plague = (spell: Spell, effect: CombinedEffect, trueTier?: number) => {
  let tier = trueTier || effect.tier;

  switch (tier) {
    case 1:
      return 10;
    case 2:
      return 12;
    case 3:
    default:
      return 15;
  }
};
