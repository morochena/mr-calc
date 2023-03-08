import { cloneDeep } from 'lodash-es'
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


function calcIllusionDiscount(total, effects) {
  //effects = effects.filter((x) => x.);
  let help = effects.filter((x) => x.name.includes("Help"));
  let helpSP = 0;
  help.forEach((element) => {
    helpSP += resolveCost(element);
  });
  let illusionDiscount = Math.min(helpSP, Math.max(total - helpSP, 0));

  let Unpredictable = effects.filter((x) => x.name.includes("Unpredictable")).length > 0
  if (Unpredictable) illusionDiscount -= 4;

  return illusionDiscount;
}




