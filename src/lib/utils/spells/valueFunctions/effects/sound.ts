import type { CombinedEffect } from "../../../../../../types/types";

export const sound = (effect: CombinedEffect, trueTier?: number) => {
  let tier = trueTier || effect.tier;

  switch (tier) {
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      return 7;
    default:
      return 12;
  }
};
