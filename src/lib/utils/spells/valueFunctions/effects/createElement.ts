import type { CombinedEffect } from "../../../../../../types/types";

export const createElement = (effect: CombinedEffect, trueTier?: number) => {
  let tier = trueTier || effect.tier;

  return tier + 2;
};
