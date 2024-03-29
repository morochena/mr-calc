import type { Modifier } from "../../../../types/types";
import { halftime } from "../spells/descriptionFunctions/modifiers/halftime";
import { calcComponentCost } from "../spells/descriptionFunctions/modifiers/calcComponentCost";
import { radiusCalc } from "../spells/descriptionFunctions/modifiers/radiusCalc";
import { rangeMeters, rangeMetersTimesThree } from "../spells/descriptionFunctions/modifiers/rangeMeters";
import { rectWidthCalc } from "../spells/descriptionFunctions/modifiers/rectWidthCalc";
import { thwartStat } from "../spells/descriptionFunctions/modifiers/thwartStat";
import { aoeArea } from "../spells/descriptionFunctions/modifiers/aoeArea";
import { splitModifier } from "../spells/valueFunctions/modifiers/splitModifier";
import { rangeModifier } from "../spells/valueFunctions/modifiers/rangeModifier";
import { aoeModifier } from "../spells/valueFunctions/modifiers/aoeModifier";
import { lastingModifier } from "../spells/valueFunctions/modifiers/lastingModifier";
import { componentModifier } from "../spells/valueFunctions/modifiers/componentModifier";

export const availableModifiers: Modifier[] = [
  {
    id: 0,
    name: 'Ray',
    hasTiers: false,
    incompatible: ['Area of Effect'],
    prerequisite: ['Range'],
    modifierType: 'reduce',
    amount: 3,
    description: 'the targets must be in direct line of sight for the character for the entire duration of the spell or the spell fails'
  },
  {
    id: 1,
    name: 'Aura',
    hasTiers: false,
    incompatible: ['Damage', 'Attack'],
    prerequisite: ['Area of Effect'],
    modifierType: 'add',
    amount: 2,
    description: 'is an Aura'
  },
  {
    id: 2,
    name: 'Reaction',
    hasTiers: false,
    incompatible: ['Charge Up', 'Delay'],
    modifierType: 'add',
    amount: 3,
    description: 'as a Reaction'
  },
  {
    id: 3,
    name: 'Exhausting',
    hasTiers: false,
    incompatible: ['Uncomplicated'],
    modifierType: 'reduce',
    amount: 4,
    description: ''
  },
  {
    id: 4,
    name: 'Uncomplicated',
    hasTiers: false,
    incompatible: ['Exhausting'],
    modifierType: 'add',
    amount: 4,
    description: ''
  },
  {
    id: 5,
    name: 'Charge Up',
    hasTiers: false,
    incompatible: ['Stealth'],
    modifierType: 'multiply',
    amount: 0.75,
    description: 'must be the only spell you cast this turn and your last action of the turn.'
  },
  {
    id: 6,
    name: 'Dangerous',
    hasTiers: false,
    incompatible: ['Stable', 'Rune', 'Alchemy'],
    modifierType: 'reduce',
    amount: 5,
    description: 'On a failure of the spell or a roll of a 1, the cost of the spell is tripled, and cannot be taken from Arcana. The cost can overflow from mind to body'
  },
  {
    id: 7,
    name: 'Painful',
    hasTiers: false,
    modifierType: 'reduce',
    amount: 6,
    description: 'The cost applies to body as well as mind'
  },
  {
    id: 8,
    name: 'Stealth',
    hasTiers: false,
    incompatible: ['Somatic', 'Charge Up'],
    modifierType: 'add',
    amount: 1,
    description: 'is discreet, with no visible somatic or vocal components, nor any glow or magical energies.'
  },
  {
    id: 9,
    name: 'Somatic',
    hasTiers: false,
    incompatible: ['Stealth', 'Rune', 'Alchemy'],
    modifierType: 'reduce',
    amount: 3,
    description: 'requires both hands to perform {meta|a hand sign}'
  },
  {
    id: 10,
    name: 'Split',
    hasTiers: true,
    modifierType: 'function',
    amount: splitModifier,
    types: ['Concentrated Power'],
    description: 'split into [tier+1] effects, each of which'
  },
  {
    id: 43,
    name: 'Concentrated Power',
    prerequisite: ['Split'],
    hasTiers: false,
    modifierType: 'add',
    amount: 0,
    description: 'each of the targets of the spell have to be at most 5m away each other.'
  },
  {
    id: 44,
    name: 'Chain',
    prerequisite: ['Split'],
    hasTiers: false,
    modifierType: 'add',
    amount: 0,
    description: 'the split effects cannot target the same object or creature'
  },
  {
    id: 11,
    name: 'Range',
    hasTiers: true,
    modifierType: 'function',
    amount: rangeModifier,
    description: 'has a range of {1} meters or {2} with disadvantage',
    descriptionFunctions: [
      rangeMeters,
      rangeMetersTimesThree
    ]
  },
  {
    id: 12,
    name: 'Trigger Action',
    hasTiers: false,
    modifierType: 'multiply',
    amount: 0.5,
    description: 'the target has to {meta|whistle a tune} which takes an action in combat, or be restrained and have someone else perform the action for them'
  },
  {
    id: 13,
    name: 'Thwarted By',
    hasTiers: false,
    modifierType: 'multiply',
    amount: 0.667,
    description: 'the target rolls their {1} bonus versus difficulty [resist]',
    descriptionFunctions: [
      thwartStat
    ]
  },
  {
    id: 14,
    name: 'Area of Effect (Sphere)',
    hasTiers: true,
    modifierType: 'function',
    amount: aoeModifier,
    description: 'covers a continuous Sphere with radius {1}.',
    descriptionFunctions: [
      radiusCalc
    ]
  },
  {
    id: 15,
    name: 'Area of Effect (Rectangle)',
    hasTiers: true,
    modifierType: 'function',
    amount: aoeModifier,
    description: 'covers a continuous Rectangle with length {meta|0} and width {1}',
    descriptionFunctions: [
      rectWidthCalc
    ]
  },
  {
    id: 16,
    name: 'Area of Effect (Cone)',
    hasTiers: true,
    modifierType: 'function',
    amount: aoeModifier,
    description: 'covers a continuous Cone with length {meta|0} and width {1}.',
    descriptionFunctions: [
      rectWidthCalc
    ]
  },
  {
    id: 17,
    name: 'Area of Effect (Custom)',
    hasTiers: true,
    modifierType: 'function',
    amount: aoeModifier,
    description: 'covers a continuous polygon with area {1} meters Sq.',
    descriptionFunctions: [
      aoeArea
    ]
  },
  {
    id: 18,
    name: 'Lasting (Rounds)',
    incompatible: [
      'Lasting (Minutes)',
      'Lasting (Hours)',
      'Lasting (Days)',
      'Lasting (Weeks)'
    ],
    hasTiers: true,
    modifierType: 'functionMultiply',
    amount: lastingModifier,
    maxTier: 4,
    description: 'lasts for [tier+1] rounds'
  },
  {
    id: 19,
    name: 'Lasting (Minutes)',
    incompatible: [
      'Lasting (Rounds)',
      'Lasting (Hours)',
      'Lasting (Days)',
      'Lasting (Weeks)'
    ],
    hasTiers: true,
    modifierType: 'functionMultiply',
    amount: lastingModifier,
    maxTier: 15,
    description: 'lasts for [tier] minutes'
  },
  {
    id: 20,
    name: 'Lasting (Hours)',
    incompatible: [
      'Lasting (Rounds)',
      'Lasting (Minutes)',
      'Lasting (Days)',
      'Lasting (Weeks)'
    ],
    hasTiers: true,
    modifierType: 'functionMultiply',
    amount: lastingModifier,
    maxTier: 24,
    description: 'lasts for [tier] hours'
  },
  {
    id: 21,
    name: 'Lasting (Days)',
    incompatible: [
      'Lasting (Rounds)',
      'Lasting (Minutes)',
      'Lasting (Hours)',
      'Lasting (Weeks)'
    ],
    hasTiers: true,
    modifierType: 'functionMultiply',
    amount: lastingModifier,
    maxTier: 7,
    description: 'lasts for [tier] days'
  },
  {
    id: 22,
    name: 'Lasting (Weeks)',
    incompatible: [
      'Lasting (Rounds)',
      'Lasting (Minutes)',
      'Lasting (Hours)',
      'Lasting (Days)'
    ],
    hasTiers: true,
    modifierType: 'functionMultiply',
    amount: lastingModifier,
    description: 'lasts for [tier] weeks'
  },
  {
    id: 23,
    name: 'Delay',
    prerequisite: ['Lasting'],
    hasTiers: false,
    modifierType: 'multiply',
    amount: 0.333,
    description: "doesn't activate immediately, but instead goes off after {1}",
    descriptionFunctions: [
      halftime
    ]
  },
  {
    id: 24,
    name: 'Concentration',
    prerequisite: ['Lasting'],
    hasTiers: false,
    modifierType: 'add',
    amount: 0,
    description: "requires Concentration for the whole time the spell is cast, and any time the user is hurt they must make a 'Willpower-Concentration' roll versus the amount of damage they took"
  },
  {
    id: 25,
    name: 'Channelling',
    prerequisite: ['Lasting'],
    hasTiers: false,
    modifierType: 'add',
    amount: 0,
    description: 'requires Channelling, giving up one action in combat or having disadvantage on anything else the duration of the spell'
  },
  {
    id: 26,
    name: 'Sculpted (Immune)',
    hasTiers: false,
    modifierType: 'add',
    amount: 0,
    description: 'will not target the caster'
  },
  {
    id: 27,
    name: 'Sculpted (Pre-sculpted)',
    hasTiers: false,
    modifierType: 'add',
    amount: -2,
    description: 'will not target {meta|friends}'
  },
  {
    id: 28,
    name: 'Sculpted (Sculpted)',
    hasTiers: false,
    modifierType: 'add',
    amount: 2,
    description: 'will not target anyone chosen by the caster.'
  },
  {
    id: 42,
    name: 'Sculpted (Exclusive)',
    hasTiers: false,
    modifierType: 'reduce',
    amount: 2,
    description: 'will only target someone chosen at spell creation by some physical criteria: {meta|self}'
  },
  {
    id: 29,
    name: 'Requires Component',
    hasTiers: true,
    modifierType: 'function',
    amount: componentModifier,
    description: 'requires a {meta|component}, of at least cost {1} Denar',
    descriptionFunctions: [
      calcComponentCost
    ]
  },
  {
    id: 30,
    name: 'Bulky Component',
    prerequisite: ['Requires Component'],
    hasTiers: false,
    modifierType: 'reduce',
    amount: 2,
    description: 'the component is bulky'
  },
  {
    id: 31,
    name: 'Component Consumed',
    prerequisite: ['Requires Component'],
    hasTiers: false,
    modifierType: 'reduce',
    amount: 3,
    description: 'the component(s) are consumed'
  },
  {
    id: 32,
    name: 'Magical Runes (Runesmith only; Required for Runes)',
    incompatible: ['Somatic', 'Dangerous'],
    prerequisite: ['Runesmith'],
    hasTiers: false,
    modifierType: 'add',
    amount: 7,
    description: 'is a magical rune with a charge'
  },
  {
    id: 33,
    name: 'Magical Rune Extra Charge(Runesmith only)',
    prerequisite: ['Magical Runes (Runesmith only; Required for Runes)'],
    hasTiers: true,
    modifierType: 'add',
    amount: 2,
    description: 'has [tier] charges'
  },
  {
    id: 34,
    name: 'Magical Rune Permanent (Runesmith only)',
    prerequisite: ['Magical Runes (Runesmith only; Required for Runes)'],
    hasTiers: false,
    modifierType: 'add',
    amount: 20,
    description: 'never loses charge'
  },
  {
    id: 35,
    name: 'Magical Rune Small(Runesmith only)',
    prerequisite: ['Magical Runes (Runesmith only; Required for Runes)'],
    hasTiers: false,
    modifierType: 'add',
    amount: 5,
    description: 'is a small rune'
  },
  {
    id: 36,
    name: 'Magical Rune Expendable (Runesmith only)',
    prerequisite: ['Magical Runes (Runesmith only; Required for Runes)'],
    hasTiers: false,
    modifierType: 'reduce',
    amount: 3,
    description: 'the rune is consumed'
  },
  {
    id: 37,
    name: 'Runesmith crafting (Runesmith only)',
    prerequisite: ['Magical Runes (Runesmith only; Required for Runes)'],
    hasTiers: true,
    modifierType: 'reduce',
    amount: 2,
    maxTier: 5,
    description: 'takes [(tier+2)*cost] hours to craft'
  },
  {
    id: 38,
    name: 'Alchemy (Alchemist only; Required for Alchemy)',
    incompatible: ['Somatic'],
    prerequisite: ['Alchemist'],
    hasTiers: false,
    modifierType: 'add',
    amount: 3,
    description: 'is an alchemical item'
  },
  {
    id: 39,
    name: 'Alchemy brewing (Alchemist only)',
    prerequisite: ['Alchemy (Alchemist only; Required for Alchemy)'],
    hasTiers: true,
    modifierType: 'reduce',
    amount: 1,
    description: 'takes [tier+cost] hours to craft'
  },
  {
    id: 40,
    name: 'Elongated Shelf Life (Alchemist only)',
    prerequisite: ['Alchemy (Alchemist only; Required for Alchemy)'],
    hasTiers: false,
    modifierType: 'add',
    amount: 2,
    description: 'keeps for [tier+1] months'
  },
  { id: 41, name: "Mobile Origin", prerequisite: ["Lasting"], hasTiers: true, modifierType: 'add', amount: 1, description: "origin can be moved between turns by the caster up to [tier*5]m" },

]

export const availableModifiersById = availableModifiers.reduce((acc: Record<number, Modifier>, modifier) => {
  acc[modifier.id] = modifier
  return acc
}, {})

