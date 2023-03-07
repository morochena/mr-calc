import type { CombinedEffect, Domain, Effect, Spell } from "../../../../../../types/types";

export function damagingCondition(spell: Spell, effect: CombinedEffect) {
  const domain = spell.domain

  switch (domain) {
    case "Fire":
      return "catches on Fire, Burning";
    case "Water":
      return "becomes Poisoned, losing";
    case "Air":
      return "starts Suffocating, losing";
    case "Necromancy":
      return "starts Bleeding, losing";
    default:
      return "applies damaging condition";
  }
}
