import type { Spell } from "../../../../../types/types";
import { aoeArea } from "./aoeArea";
import { get } from 'svelte/store'
import { currentSpell } from "$lib/stores/currentSpellStore"


export function radiusCalc(spell: Spell, tier: number) {
  const area = aoeArea(tier);
  const radius = Math.sqrt(area / Math.PI);

  return Math.ceil(radius);
}
