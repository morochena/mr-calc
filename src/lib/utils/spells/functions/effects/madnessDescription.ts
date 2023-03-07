

import type { CombinedEffect, Domain, Effect, Spell } from "../../../../../../types/types";

export function madnessDescription(spell: Spell, effect: CombinedEffect) {
  const tier = effect.tier
  let val = 30;

  switch (tier) {
    case 1:
      val = 20;
    case 2:
      val = 25;
    case 3:
    default:
      val = 30;
  }

  return Math.ceil(val / 2)
}