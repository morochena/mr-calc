import type { CombinedEffect } from "../../../../../../types/types";

export const movementCondition = (effect: CombinedEffect, trueTier?: number) => {
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
