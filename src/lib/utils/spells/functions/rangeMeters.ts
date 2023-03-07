import type { CombinedModifier, Spell } from "../../../../../types/types";

export function rangeMeters(_spell: Spell, modifier: CombinedModifier) {
  const tier = modifier.tier;
  let meters = 0;

  for (let i = 0; i < tier; i++) {
    if (i < 5) {
      meters += 10;
    } else if (i < 10) {
      meters += 100;
    } else {
      meters += 1000;
    }
  }

  return meters;
}

export function rangeMetersTimesThree(spell: Spell, modifier: CombinedModifier) {
  return rangeMeters(spell, modifier) * 3;
}