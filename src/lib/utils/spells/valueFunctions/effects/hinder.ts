import type { CombinedEffect } from "../../../../../../types/types";

export const hinder = (effect: CombinedEffect, trueTier?: number) => {
  let tier = trueTier || effect.tier;

  let sum = 0;
  for (let i = 1; i <= tier; i++) {
    sum += i;
  }
  return sum;
};
