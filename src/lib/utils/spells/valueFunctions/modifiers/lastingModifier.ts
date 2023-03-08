import type { CombinedModifier } from "../../../../../../types/types";

export const lastingModifier = (modifier: CombinedModifier, trueTier?: number) => {
  let tier = trueTier || modifier.tier;
  let type = modifier.name
  let baseCost = 0;
  let cost = 0;
  let multiplier = 0;

  if (type == 'Lasting (Rounds)') {
    baseCost = 2;
    multiplier = 2;
  } else if (type == 'Lasting (Minutes)') {
    baseCost = 3;
    multiplier = 3;
  } else if (type == 'Lasting (Hours)') {
    cost += 2;
    baseCost = 4;
    multiplier = 4;
  } else if (type == 'Lasting (Days)') {
    cost += 5;
    baseCost = 5;
    multiplier = 5;
  } else if (type == 'Lasting (Weeks)') {
    cost += 8;
    baseCost = 6;
    multiplier = 8;
  }
  // const { selectedModifiers } = modifiers;
  // const modList = get(selectedModifiers)
  // if (modList.filter(mod => mod.name === "Concentration").length > 0) {
  //   cost -= 1;
  //   baseCost -= 1;
  // }
  // if (modList.filter(mod => mod.name === "Channelling").length > 0) {
  //   cost -= 3;
  //   baseCost -= 3;
  // }
  for (let i = 0; i < tier; i++) {
    if (i < 1) {
    } else if (i < 5) {
      cost += baseCost;
    }
  }

  return [cost, multiplier];
};
