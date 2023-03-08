import type { CombinedModifier } from "../../../../../../types/types";

export const splitModifier = (modifier: CombinedModifier, trueTier?: number) => {
  let tier = trueTier || modifier.tier;

  if (tier == 1)
    return 8;
  if (tier == 2)
    return 15;
  if (tier == 3)
    return 27;
  if (tier == 4)
    return 40;
  if (tier > 4)
    return tier * 10;
};
