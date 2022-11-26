import { createElement, movementCondition, geas, sound, plague, madness, help, hinder, illusion, warplight } from "../data/effects";
import { splitModifier, rangeModifier, aoeModifier, lastingModifier, componentModifier } from "../data/modifiers";


export const calculateTotalSP = (spell) => {
  const { effects, modifiers } = spell
  let total = 0;

  const effectsAndModifiers = effects.concat(modifiers)

  const rawValues = calculateSPCostParam(effectsAndModifiers)
  return total;
}

function calculateSPCostParam(effectAndModifierValues) {
  let totalSPAdds = 0;
  let totalSPMults = 1;

  let modifierCost = effectAndModifierValues.reduce((total, modifier) => {
    return total + resolveCost(modifier);
  }, 0);

  if (get(selectedDomain) === "Illusion")
    modifierCost -= calcIllusionDiscount(modifierCost, selectedEffectValues);

  if (sMode === "Unpredicable") {
    modifierCost += 4;
  }

  totalSPAdds = modifierCost;

  let paramSPCost = modifierCost;

  let spMultipliers = effectAndModifierValues.filter(
    (modifier) =>
      modifier.modifierType === "multiply" ||
      modifier.modifierType === "functionMultiply"
  );

  spMultipliers.forEach((modifier) => {
    if (modifier.modifierType === "functionMultiply") {
      paramSPCost *= runModifier(modifier)[1];
      totalSPMults *= runModifier(modifier)[1];
    } else {
      paramSPCost *= modifier.amount;
      totalSPMults *= modifier.amount;
    }
  });

  paramSPCost = Math.ceil(paramSPCost);
  paramSPCost = Math.max(paramSPCost, 0);

  return paramSPCost;
}


function resolveCost(modifier) {
  let cost = 0;
  switch (modifier.modifierType) {
    case "add":
      cost = modifier.amount * modifier.tier;
      break;
    case "reduce":
      cost = modifier.amount * modifier.tier * -1;
      break;
    case "function":
      cost = runModifier(modifier);
      break;
    case "functionMultiply":
      if (modifier.name.includes("Lasting")) {
        cost = runModifier(modifier)[0];
      } else {
        cost = runModifier(modifier)[0];
      }
      break;
  }
  return cost;
}


const runModifier = (modifier) => {
  let truetier = modifier.tier;
  if (modifier.domaintier) truetier -= modifier.domaintier;
  switch (modifier.amount) {
    case "splitModifier":
      return splitModifier(truetier);
    case "rangeModifier":
      return rangeModifier(truetier);
    case "aoeModifier":
      return aoeModifier(truetier);
    case "lastingModifier":
      return lastingModifier(truetier, modifier.name);
    case "componentModifier":
      return componentModifier(truetier);
    case "createElement":
      return createElement(truetier);
    case "movementCondition":
      return movementCondition(truetier);
    case "geas":
      return geas(truetier);
    case "sound":
      return sound(truetier);
    case "plague":
      return plague(truetier);
    case "madness":
      return madness(truetier);
    case "help":
      return help(truetier);
    case "hinder":
      return hinder(truetier);
    case "illusion":
      return illusion(truetier);
    case "warplight":
      return warplight(truetier);
  }

  console.log("modifier case not handled: ", modifier.amount);

  return 0;
};