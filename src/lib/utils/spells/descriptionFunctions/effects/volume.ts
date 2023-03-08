import type { Spell, CombinedEffect } from "../../../../../../types/types";

export function volume(spell: Spell, effect: CombinedEffect) {

  const tier = effect.tier

  switch (tier) {
    case 1:
      return "50 DB";
    case 2:
      return "100 DB";
    case 3:
    default:
      return "120 DB";
  }
}
