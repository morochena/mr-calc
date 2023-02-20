import { createElement, movementCondition, geas, sound, plague, madness, help, hinder, illusion, warplight } from "../data/effects";
import { splitModifier, rangeModifier, aoeModifier, lastingModifier, componentModifier } from "../data/modifiers";


export const calculateTotalSP = (spell) => {
  let { effects, modifiers } = spell.spell_data
  effects = effects || []
  modifiers = modifiers || []

  const effectsAndModifiers = effects.concat(modifiers)

  let totalSPAdds = 0;
  let totalSPMults = 1;

  const domain = spell.spell_data.domain
  const mode = spell.spell_data.mode

  let modifierCost = effectsAndModifiers.reduce((total, modifier) => {
    return total + resolveCost(modifier);
  }, 0);

  if (domain === "Illusion")
    modifierCost -= calcIllusionDiscount(spell, modifierCost, effectsAndModifiers);

  if (mode === "Unpredicable") {
    modifierCost += 4;
  }

  totalSPAdds = modifierCost;

  let paramSPCost = modifierCost;

  let spMultipliers = effectsAndModifiers.filter(
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

  return { cost: paramSPCost, adds: totalSPAdds, mults: totalSPMults };
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

function calcIllusionDiscount(spell, total, effects) {
  const mode = spell.spell_data.mode
  //effects = effects.filter((x) => x.);
  let help = effects.filter((x) => x.name.includes("Help"));
  let helpSP = 0;
  help.forEach((element) => {
    helpSP += resolveCost(element);
  });
  let illusionDiscount = Math.min(helpSP, Math.max(total - helpSP, 0));
  if (mode === "Unpredictable") illusionDiscount -= 4;
  return illusionDiscount;
}
