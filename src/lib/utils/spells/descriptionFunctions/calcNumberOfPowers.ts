import type { Spell } from "../../../../../types/types";
import { getProcessedModifiersAndEffects } from "../getCombinedEffects";

export function calcNumberOfPowers(spell: Spell) {

  const processedModifiersAndEffects = getProcessedModifiersAndEffects(spell);

  let sum = 0;
  processedModifiersAndEffects.forEach((element) => {
    if ((!element.prerequisite || element.prerequisite.length == 0) &&
      (!element.domainTier || element.domainTier <= 0))
      sum++;
  });

  return sum;
}
