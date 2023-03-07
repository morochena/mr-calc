import type { CombinedModifier, Spell } from "../../../../../types/types";
import { aoeArea } from "./aoeArea";

export function rectWidthCalc(spell: Spell, modifier: CombinedModifier) {
  const length = modifier.meta || "";
  const area = aoeArea(spell, modifier);

  try {
    const width = area / parseInt(length);
    return Math.ceil(width);
  } catch (error) {
    return "Enter a number";
  }
}
