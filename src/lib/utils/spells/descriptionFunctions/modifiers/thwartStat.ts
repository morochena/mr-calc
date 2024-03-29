import type { CombinedModifier, Domain, Spell } from "../../../../../../types/types";

export function thwartStat(spell: Spell, modifier: CombinedModifier) {
  const domain = spell.domain

  switch (domain) {
    case "Fire":
      return "Dexterity";
    case "Water":
      return "Strength";
    case "Earth":
      return "Strength";
    case "Air":
      return "Dexterity";
    case "Necromancy":
      return "Empathy";
    case "Holy":
      return "Empathy";
    case "Mind":
      return "Intelligence";
    case "Illusion":
      return "Intelligence";
    default:
      return "Statistic";
  }
}
