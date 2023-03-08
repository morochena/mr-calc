import type { CombinedEffect } from "../../../../../../types/types";

export const geas = (effect: CombinedEffect, trueTier?: number) => {
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
