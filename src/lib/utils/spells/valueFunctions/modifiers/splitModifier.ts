import type { CombinedModifier, Spell } from "../../../../../../types/types";
import { getProcessedModifiers } from "../../getModifiersAndEffects";

export const splitModifier = (spell: Spell, modifier: CombinedModifier, trueTier?: number) => {
  let tier = trueTier || modifier.tier;
  let cost = 0;

  if (tier == 1)
    cost = 8;
  if (tier == 2)
    cost = 15;
  if (tier == 3)
    cost = 27;
  if (tier == 4)
    cost = 40;
  if (tier > 4)
    cost = tier * 10;

  const selectedModifiers = getProcessedModifiers(spell);

  if (selectedModifiers.filter(mod => mod.name === "Concentrated Power").length > 0) {
    cost -= tier * 1;
  }
  if (selectedModifiers.filter(mod => mod.name === "Chain").length > 0) {
    cost -= tier * 1;
  }

  return cost;

};
