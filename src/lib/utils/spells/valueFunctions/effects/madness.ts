import type { CombinedEffect } from "../../../../../../types/types";

export const madness = (effect: CombinedEffect, trueTier?: number) => {
  let tier = trueTier || effect.tier;

  switch (tier) {
    case 1:
      return 20;
    case 2:
      return 25;
    case 3:
    default:
      return 30;
  }
};
