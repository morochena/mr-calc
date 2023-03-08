import type { ProcessedModifierOrEffect, Spell } from "../../../../types/types";
import { getProcessedModifiersAndEffects } from "./getCombinedEffects";

export const calculateTotalSP = (spell: Spell) => {
  const effectsAndModifiers = getProcessedModifiersAndEffects(spell);
  let totalSPAdds = 0;
  let totalSPMults = 1;

  let modifierCost = effectsAndModifiers.reduce((total: number, modifier) => {
    return total + calcSPValue(modifier);
  }, 0);

  if (spell.domain === "Illusion")
    modifierCost -= calcIllusionDiscount(spell, modifierCost, effectsAndModifiers);

  if (spell.mode === "Unpredictable") {
    modifierCost += 4;
  }

  totalSPAdds = modifierCost;

  let paramSPCost = modifierCost;

  const spMultipliers = effectsAndModifiers.filter(
    (modifier) =>
      modifier.modifierType === "multiply" ||
      modifier.modifierType === "functionMultiply"
  );

  spMultipliers.forEach((modifier) => {
    if (modifier.modifierType === "functionMultiply") {
      paramSPCost *= functionSPValue(modifier)[1];
      totalSPMults *= functionSPValue(modifier)[1];
    } else {
      paramSPCost *= modifier.amount;
      totalSPMults *= modifier.amount;
    }
  });

  paramSPCost = Math.ceil(paramSPCost);
  paramSPCost = Math.max(paramSPCost, 0);

  return { cost: paramSPCost, adds: totalSPAdds, mults: totalSPMults };
}


export const calcSPValue = (moe: ProcessedModifierOrEffect) => {
  let trueTier = moe.tier || 1;
  // if (moe.domainTier) trueTier -= moe.domainTier;

  let cost = 0;
  switch (moe.modifierType) {
    case "add":
      cost = Number(moe.amount) * trueTier;
      break;
    case "reduce":
      cost = Number(moe.amount) * trueTier * -1;
      break;
    case "function":
      cost = functionSPValue(moe);
      break;
    case "functionMultiply":
      cost = functionSPValue(moe)[0];
      break;
  }
  return cost;
}

export const calcSPValueText = (moe: ProcessedModifierOrEffect) => {
  let trueTier = moe.tier || 1;
  // if (moe.domainTier) trueTier -= moe.domainTier;

  let amount;
  let operator;

  switch (moe.modifierType) {
    case "add":
      return `+${Number(moe.amount) * trueTier}`;
    case "reduce":
      return `${Number(moe.amount) * trueTier * -1}`;
    case "multiply":
      return `x${Number(moe.amount) * trueTier}`;
    case "function":
      amount = functionSPValue(moe);
      operator = amount > 0 ? "+" : "";
      return `${operator}${amount}`;
    case "functionMultiply":
      amount = functionSPValue(moe)[0];
      operator = amount > 0 ? "+" : "";
      return `x${functionSPValue(moe)[1]} and ${operator}${functionSPValue(moe)[0]}`;
  }
};

const functionSPValue = (moe: ProcessedModifierOrEffect) => {
  let trueTier = moe.tier;
  // if (moe.domainTier) trueTier -= moe.domainTier;

  if (typeof moe.amount === "function")
    return moe.amount(moe, trueTier)

  console.warn("modifier case not handled: ", moe.name);

  return 0;
};

function calcIllusionDiscount(spell, modifierCost, effectsAndModifiers) {
  // generally don't want to use getCombinedEffects but it would be circular otherwise
  // const effects = getCombinedEffects(spell);
  // let helpEffects = effects.filter((x) => x.name.includes("Help"));
  // let helpSP = 0;


  // helpEffects.forEach((effect) => {
  //   effect = { ...effect, domainTier: 0 } as ProcessedEffect;
  //   helpSP += calcSPValue(effect);
  // });

  // let illusionDiscount = Math.min(helpSP, Math.max(0 - helpSP, 0));
  // if (spell.mode === "Unpredictable") illusionDiscount -= 4;

  return 0;
}


