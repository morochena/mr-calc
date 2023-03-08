import type { Spell, CombinedEffect, CombinedModifier, ProcessedModifier, CombinedModifierOrEffect, ProcessedEffect, ProcessedModifierOrEffect } from "../../../../types/types";
import { availableEffectsById } from "../data/effects";
import { availableModifiersById } from "../data/modifiers";
import { cloneDeep } from 'lodash'

export const getProcessedModifiersAndEffects = (spell: Spell): ProcessedModifierOrEffect[] => {
  return [...processDomainModifiers(spell), ...processDomainEffects(spell)]
}

// when processing effects for a domain
// if effect already exists, add to domainTiers
// if effect does not exist, add it but only add to domainTiers 

// when calculating description, tier + domainTier
// when calculating cost, tier
export function processDomainEffects(spell: Spell) {
  let processedEffects = cloneDeep(getCombinedEffects(spell)) as ProcessedEffect[];

  if (spell.mode === "Unpredicable") {
    processedEffects.push({
      id: 0,
      domains: [],
      name: "Unpredictable",
      tier: 1,
      hasTiers: false,
      notes: "Unpredictable spell",
      modifierType: "add",
      amount: 3,
      description: "Double the value of the dice rolled when the spell is cast. When the lowest die is a 5, add 10 instead, when the lowest die is 8 add 16, etc.",
      domainTier: 1,
      fromDomain: true,
    });
  }

  const damageId = 5
  const damageEffect = availableEffectsById[damageId]

  const lightId = 67
  const lightEffect = availableEffectsById[lightId]

  const createElementId = 2

  const applyForceId = 4
  const applyForceEffect = availableEffectsById[applyForceId]

  switch (spell.domain) {
    case "Fire":
      let x = processedEffects.find((x) => x.id === damageId);
      if (x && (!x.domainTier || x.domainTier <= 0)) {
        x.domainTier = 2;
        x.notes = "+2 Fire Domain Damage";
        x.prerequisite = ["Fire"];
      } else if (!x)
        processedEffects.push({
          ...damageEffect,
          tier: 2,
          domainTier: 2,
          notes: "Fire Domain",
          description: "+2 DMG",
          fromDomain: true
        });
      let y = processedEffects.find((y) => y.id === lightId);
      if (y && (!y.domainTier || y.domainTier <= 0)) {
        y.tier += 2;
        y.domainTier = 2;
        y.notes = "+2 Fire Domain Light";
        y.prerequisite = ["Fire"];
      } else if (!y)
        processedEffects.push({
          ...lightEffect,
          tier: 2,
          domainTier: 2,
          notes: "Fire Domain",
          description: "Flickers with enough light to brighten a dark room",
          fromDomain: true,
        });
      let z = processedEffects.find((z) => z.id === createElementId);
      if (!z) {
        processedEffects.push({
          id: 0,
          name: "Require Element",
          tier: 1,
          domains: ["Fire"],
          domainTier: 0,
          hasTiers: true,
          prerequisite: ["Fire"],
          notes: "Fire Domain",
          modifierType: "add",
          amount: 0,
          description: "Requires the presence of Fire or the spell fails",
          fromDomain: true,
        });
      }
      break;
    case "Air":
      let air = processedEffects.find((air) => air.id === createElementId);
      if (!air) {
        processedEffects.push({
          id: 0,
          name: "Require Element",
          tier: 1,
          domains: ['Air'],
          domainTier: 0,
          hasTiers: true,
          prerequisite: ["Air"],
          notes: "Air Domain",
          modifierType: "add",
          amount: 0,
          description: "Requires the presence of Air or the spell fails",
          fromDomain: true,
        });
      }
      break;
    case "Water":
      let water = processedEffects.find((water) => water.id === createElementId);
      if (!water) {
        processedEffects.push({
          id: 0,
          name: "Require Element",
          tier: 1,
          domains: ['Water'],
          domainTier: 0,
          hasTiers: true,
          prerequisite: ["Water"],
          notes: "Water Domain",
          modifierType: "add",
          amount: 0,
          description: "Requires the presence of Water or the spell fails",
          fromDomain: true,
        });
      }
      break;
    case "Earth":
      let force = processedEffects.find((force) => force.id === applyForceId);
      if (force && (!force.domainTier || force.domainTier <= 0)) {
        force.tier += 2;
        force.domainTier = 2;
        force.notes += " powered up by Earth Domain";
        force.prerequisite = ["Earth"];
      } else if (!force)
        processedEffects.push({
          ...applyForceEffect,
          tier: 2,
          domainTier: 2,
          hasTiers: true,
          prerequisite: ["Earth"],
          notes: "Earth Domain",
          modifierType: "add",
          amount: 2,
          description: "is moved 2 meters",
          fromDomain: true,
        });
      let earth = processedEffects.find((earth) => earth.name === "Create Element");
      if (!earth) {
        processedEffects.push({
          name: "Require Element",
          tier: 0,
          domainTier: 0,
          hasTiers: true,
          prerequisite: ["Earth"],
          notes: "Earth Domain",
          modifierType: "add",
          amount: 0,
          description: "Requires the presence of Earth or the spell fails",
        });
      }
      break;
    case "Mind":
      processedEffects.push({
        name: "Require Mind",
        tier: 0,
        domainTier: 0,
        hasTiers: true,
        prerequisite: ["Mind"],
        notes: "Mind Domain",
        modifierType: "add",
        amount: 0,
        description: "Requires the presence of a Mind or the spell fails",
      });
      break;
    case "Nature":
      processedEffects.push({
        name: "Require Nature",
        tier: 0,
        domainTier: 0,
        hasTiers: true,
        prerequisite: ["Nature"],
        notes: "Nature Domain",
        modifierType: "add",
        amount: 0,
        description: "Requires the presence of a Life or the spell fails",
      });
      break;
    case "Illusion":
      processedEffects.push({
        name: "Illusion Discount",
        tier: 1,
        domainTier: 0,
        hasTiers: true,
        prerequisite: ["Illusion"],
        notes:
          "When Taking Illusion Powers in a spell as well as the “Help Statistic/Skill/Specialty” Power, Ignore the spell points of the Illusion Powers up to the amount spent on the “Help Statistic/Skill/Specialty” Power",
        modifierType: "reduce",
        amount: calcIllusionDiscount(0, processedEffects),
        description: "",
      });
      break;
    default:
      break;
  }
  return processedEffects;
}

export function processDomainModifiers(spell: Spell) {
  let modifiers = getCombinedModifiers(spell) as ProcessedModifier[];

  switch (spell.domain) {
    case "Fire":
      break;
    case "Air":
      break;
    case "Water":
      /*let water = modifiers.find((water) =>
        water.name.includes("Area of Effect")
      );
      if (water) {
        {
          water.notes += "Water Domain Doubles Area";
        }
      }*/
      break;
    case "Earth":
      break;
    case "Mind":
      break;
    case "Nature":
      break;
    case "Illusion":
      break;
    default:
      break;
  }
  return modifiers;
}

// should only be used to processedDomainModifiers
const getCombinedModifiers = (spell: Spell): CombinedModifier[] => {
  return spell.selected_modifiers.map((selected_modifier) => {
    const modifier = availableModifiersById[selected_modifier.id];
    return { ...selected_modifier, ...modifier };
  });
};

const getCombinedEffects = (spell: Spell): CombinedEffect[] => {
  return spell.selected_effects.map((selected_effect) => {
    const effect = availableEffectsById[selected_effect.id];
    return { ...selected_effect, ...effect };
  });
};
