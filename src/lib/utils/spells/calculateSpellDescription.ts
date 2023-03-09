import type { ProcessedEffect, ProcessedModifier, Spell, SpellMode } from "../../../../types/types";
import { calculateMOEDescription } from "./calculateMOEDescription";
import { calculateMentalCost } from "./descriptionFunctions/mentalCostCalculation";
import { getProcessedModifiersAndEffects, getProcessedEffects, getProcessedModifiers } from "./getModifiersAndEffects";


export const calculateSpellDescription = (spell: Spell) => {
  const preamble = craftedPreamble(spell);
  const description = spell.description || '';
  const caster = casterText(spell);
  const target = targetText(spell)

  return `${description} ${preamble} ${caster} ${target}`;
}

const casterText = (spell: Spell) => {
  const mode = modeText(spell.mode)
  const modifierText = getProcessedModifiers(spell)
    .map((modifier: ProcessedModifier) => {
      const baseText = calculateMOEDescription(spell, modifier)
      // replace {meta|example text} with the meta value
      return baseText.replace(/{meta\|([^}]+)}/g, (match, p1) => {
        return modifier.meta || '';
      })
    })
    .join(' and ');


  return `The caster ${mode} that ${modifierText}`;
}

const targetText = (spell: Spell) => {
  const effectText = getProcessedEffects(spell)
    .map((effect: ProcessedEffect) => {
      const baseText = calculateMOEDescription(spell, effect)
      // replace {meta|example text} with the meta value
      return baseText.replace(/{meta\|([^}]+)}/g, (match, p1) => {
        return effect.meta || '';
      })
    })
    .join(' and ');

  return `the target ${effectText}`;
}

const craftedPreamble = (spell: Spell) => {
  const modifiers = getProcessedModifiers(spell)
  const alchemyBrewingId = 39
  const runesmithId = 37

  const baseHours = calculateMentalCost(spell)
  const baseDays = 2

  if (spell.is_alchemy) {
    const tier = modifiers.find(mod => mod.id === alchemyBrewingId)?.tier || 0
    const totalHours = baseHours + (tier)
    return `This is an alchemical creation that takes a day to craft, which includes working on it for ${totalHours} hours actively. Thereafter they can be used by anyone.`
  }

  if (spell.is_runesmith) {
    const tier = modifiers.find(mod => mod.id === runesmithId)?.tier || 0
    const days = baseDays + (tier)
    const totalHours = days * baseHours
    return `This is an magical rune that takes ${totalHours} in hours of intense labor to craft. Thereafter they can be used by anyone.`
  }

  return "";
}

const modeText = (mode: SpellMode) => {
  switch (mode) {
    case `Unpredictable`:
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
