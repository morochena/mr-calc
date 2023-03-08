import type { CombinedEffect, Spell } from "../../../../../../types/types";

export function sense(spell: Spell, effect: CombinedEffect) {
  const tier = effect.tier;

  switch (tier) {
    case 1:
      return ", nonspecific";
    case 2:
      return ", a category of";
    case 3:
      return ", specifically";
    default:
      return "nonsense";
  }
}
