import type { CombinedModifier, Spell } from "../../../../../../types/types";
import { aoeArea } from "./aoeArea";

export function radiusCalc(spell: Spell, modifier: CombinedModifier) {
  const area = aoeArea(spell, modifier);
  const radius = Math.sqrt(area / Math.PI);

  return Math.ceil(radius);
}
