import type { CombinedEffect } from "../../../../../../types/types";

export const illusion = (effect: CombinedEffect, trueTier?: number) => {
  let tier = trueTier || effect.tier;

  return (tier - 1) * 6 + 3;
};
