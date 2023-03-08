import type { CombinedEffect } from "../../../../../../types/types";

export const warplight = (effect: CombinedEffect, trueTier?: number) => {
  let tier = trueTier || effect.tier;

  return (tier - 1) * 4 + 2;
};
