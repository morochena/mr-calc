import type { CombinedModifier, Spell } from '../../../../../types/types';
import { getCombinedModifiers } from '../getCombinedEffects';

export function aoeArea(spell: Spell, modifier: CombinedModifier) {
  let area = 0;

  const modifiers = getCombinedModifiers(spell)
  const domain = spell.domain
  const tier = modifier.tier

  for (let i = 0; i < tier; i++) {
    if (i < 10) {
      area += 10;
    } else if (i < 20) {
      area += 100;
    } else if (i < 30) {
      area += 1000;
    } else {
      area += 10000;
    }
  }

  // double area if aura is selected
  if (modifiers.filter(mod => mod.name === "Aura").length > 0) {
    area *= 2;
  }

  // double area if water is selected
  if (domain === "Water") {
    area *= 2;
  }

  return area;
}
