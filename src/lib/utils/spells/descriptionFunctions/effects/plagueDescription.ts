

import type { CombinedEffect, Domain, Effect, Spell } from "../../../../../../types/types";

export function plagueDescription(spell: Spell, effect: CombinedEffect) {
  const tier = effect.tier
  let val = 15;

  switch (tier) {
    case 1:
      val = 10;
    case 2:
      val = 12;
    case 3:
    default:
      val = 15;
  }

  return Math.ceil(val / 2)
}