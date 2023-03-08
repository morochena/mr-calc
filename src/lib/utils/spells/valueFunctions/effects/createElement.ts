import type { CombinedEffect, Spell } from "../../../../../../types/types";

export const createElement = (spell: Spell, effect: CombinedEffect, trueTier?: number) => {
  let tier = trueTier || effect.tier;

  return tier + 2;
};
