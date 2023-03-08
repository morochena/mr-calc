import type { CombinedEffect, Spell } from "../../../../../../types/types";

export const illusion = (spell: Spell, effect: CombinedEffect, trueTier?: number) => {
  let tier = trueTier || effect.tier;

  return (tier - 1) * 6 + 3;
};
