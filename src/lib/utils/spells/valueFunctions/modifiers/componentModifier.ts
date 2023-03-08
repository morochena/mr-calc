import type { CombinedModifier, Spell } from "../../../../../../types/types";

export const componentModifier = (spell: Spell, modifier: CombinedModifier, trueTier?: number) => {
  let tier = trueTier || modifier.tier;
  return tier * -1 + 1;
};
