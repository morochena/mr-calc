import { cloneDeep } from 'lodash'
import type { CombinedEffect, Modifier, ProcessedEffect, ProcessedModifier, Spell } from '../../../../types/types';
import { availableEffectsById } from '../data/effects';
import { availableModifiers } from '../data/modifiers';
import { light } from './functions/effects/light';
import { getCombinedEffects, getCombinedModifiers } from './getCombinedEffects';

export const calculateSpellSP = (spell) => {
  let spellSPCost = 0;
  const { effects, modifiers } = spell.spell_data;
  const effectAndModifierValues = effects.concat(modifiers);
  spellSPCost = calculateSPCostParam(effectAndModifierValues);

  return spellSPCost;
}

function calcSpellResist(value) {
  return calcSpellCost(value) + 5;
}

function calcSpellCost(value) {
  let cost = Math.ceil(value / 10.0) + 1;
  const modList = get(selectedModifiers);
  let val = 1;

  let subModList = modList.filter(
    (mod) => mod.name !== "Exhausting" && mod.name !== "Uncomplicated"
  );

  const effectList = get(selectedEffects);
  const effectAndsubModifierValues = subModList.concat(effectList);
  const subModSP = calculateSPCostParam(effectAndsubModifierValues);
  let subcost = Math.ceil(subModSP / 10.0) + 1;
  if (subcost != cost) {
    val = 2;
  }

  if (modList.filter((mod) => mod.name === "Exhausting").length > 0) {
    cost += val;
  }
  if (modList.filter((mod) => mod.name === "Uncomplicated").length > 0) {
    cost -= val;
  }
  return cost;
}

function verboseSpellMode(value) {
  switch (value) {
    case `Unpredicable`:
      return "casts an unstable spell by rolling a skill check and doubling the dice numbers versus the Spell Difficulty and Winds of Magic";
    case "Stable":
      return "casts a stable spell ";
    case "Imbue":
      return "Imbues an item. The item casts a stable spell";
    case "Spell":
    default:
      return "casts a spell by rolling a skill check versus the Spell Difficulty and Winds of Magic";
  }
}

function calcIllusionDiscount(total, effects) {
  //effects = effects.filter((x) => x.);
  let help = effects.filter((x) => x.name.includes("Help"));
  let helpSP = 0;
  help.forEach((element) => {
    helpSP += resolveCost(element);
  });
  let illusionDiscount = Math.min(helpSP, Math.max(total - helpSP, 0));

  let unpredicable = effects.filter((x) => x.name.includes("Unpredictable")).length > 0
  if (unpredicable) illusionDiscount -= 4;

  return illusionDiscount;
}



function calcNumberOfPowers(effects, modifiers) {
  let sum = 0;
  effects.forEach((element) => {
    if (
      (!element.prerequisite || element.prerequisite.length == 0) &&
      (!element.domaintier || element.domaintier <= 0)
    )
      sum++;
  });
  modifiers.forEach((element) => {
    if (
      (!element.prerequisite || element.prerequisite.length == 0) &&
      (!element.domaintier || element.domaintier <= 0)
    )
      sum++;
  });
  return sum;
}

function calculateSPCost() {
  const effectAndModifierValues = selectedEffectValues.concat(
    selectedModifierValues
  );
  totalSPCost = calculateSPCostParam(effectAndModifierValues);
  $SPCost = totalSPCost;
}

function craftedSpellPreamble(isAlchemyValue, isRunesmithValue, spellCost) {
  const modList = get(selectedModifiers);
  let hours = spellCost;
  let days = 2;
  const alclist = modList.filter((mod) => mod.name.includes("brewing"));
  const runelist = modList.filter((mod) => mod.name.includes("crafting"));
  if (alclist.length > 0) {
    hours += alclist[0].tier;
  }
  if (runelist.length > 0) {
    days += runelist[0].tier;
  }
  if (isAlchemyValue)
    return (
      "This is an alchemical creation that takes a day to craft, which includes working on it for " +
      hours +
      " hours actively. Thereafter they can be used by anyone."
    );
  if (isRunesmithValue) {
    hours = days * hours;
    return (
      "This is an magical rune that takes " +
      hours +
      " in hours of intense labor to craft. Thereafter they can be used by anyone."
    );
  }
  return "";
}



const threeSpaces = "\t";

const effectClass = (effect) => {
  if (effect.prerequisite && effect.prerequisite.length > 0) {
    return "pl-5";
  } else {
    return "";
  }
};