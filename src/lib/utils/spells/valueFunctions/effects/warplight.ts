import type { CombinedEffect, Spell } from "../../../../../../types/types";

export const warplight = (spell: Spell, effect: CombinedEffect, trueTier?: number) => {
  let tier = trueTier || effect.tier;

  return (tier - 1) * 4 + 2;
};
