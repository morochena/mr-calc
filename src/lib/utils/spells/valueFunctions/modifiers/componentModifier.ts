import type { CombinedModifier } from "../../../../../../types/types";

export const componentModifier = (modifier: CombinedModifier, trueTier?: number) => {
  let tier = trueTier || modifier.tier;
  return tier * -1 + 1;
};
