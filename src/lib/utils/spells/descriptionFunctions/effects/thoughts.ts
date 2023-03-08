import type { CombinedEffect, Spell } from "../../../../../../types/types";

export function thoughts(spell: Spell, effect: CombinedEffect) {

  const tier = effect.tier

  switch (tier) {
    case 1:
      return "surface thoughts";
    case 2:
      return "deeper thoughts";
    case 3:
      return "memories";
    default:
      return "subconscious";
  }
}
