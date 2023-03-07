import type { CombinedModifier, Spell } from "../../../../../types/types";
import { aoeArea } from "./aoeArea";
import { get } from 'svelte/store'
import { currentSpell } from "$lib/stores/currentSpellStore"


export function radiusCalc(spell: Spell, modifier: CombinedModifier) {
  const area = aoeArea(spell, modifier);
  const radius = Math.sqrt(area / Math.PI);

  return Math.ceil(radius);
}
