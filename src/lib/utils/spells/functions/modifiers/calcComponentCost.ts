import type { CombinedModifier, Spell } from "../../../../../../types/types";

export function calcComponentCost(spell: Spell, modifier: CombinedModifier) {
  const tier = modifier.tier;

  let cost = 1;
  const ftier = tier - 1;
  if (ftier < 5)
    cost = ftier * 25;
  else if (ftier < 9)
    cost = 100 + (ftier - 4) * 100;

  else
    cost = 500 + (ftier - 8) * 2000;

  if (cost <= 0)
    return "less than 1";

  return cost;
}
