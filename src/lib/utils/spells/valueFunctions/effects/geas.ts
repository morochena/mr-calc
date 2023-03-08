import type { CombinedEffect, Spell } from "../../../../../../types/types";

export const geas = (spell: Spell, effect: CombinedEffect, trueTier?: number) => {
  let tier = trueTier || effect.tier;

  switch (tier) {
    case 1:
      return 3;
    case 2:
      return 6;
    case 3:
      return 9;
    default:
      return 15;
  }
};
