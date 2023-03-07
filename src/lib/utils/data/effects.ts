import type { Effect } from "../../../../types/types";

export const createElement = (tier: number) => {
  return tier + 2;
}

export const movementCondition = (tier: number) => {
  switch (tier) {
    case 1:
      return 3;
    case 2:
      return 6;
    case 3:
    default:
      return 12;
  }
}

export const sound = (tier: number) => {
  switch (tier) {
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      return 7;
    default:
      return 12;
  }
}

export const plague = (tier: number) => {
  switch (tier) {
    case 1:
      return 10;
    case 2:
      return 12;
    case 3:
    default:
      return 15;
  }
}

export const madness = (tier: number) => {
  switch (tier) {
    case 1:
      return 20;
    case 2:
      return 25;
    case 3:
    default:
      return 30;
  }
}

export const geas = (tier: number) => {
  switch (tier) {
    case 1:
      return 3;
    case 2:
      return 6;
    case 3:
      return 9;
    default:
      return 15;
  }
}

export const help = (tier: number) => {
  let sum = 0;
  for (let i = 1; i <= tier; i++) {
    sum += i;
  }
  sum *= 2;
  return sum;
}

export const hinder = (tier: number) => {
  let sum = 0;
  for (let i = 1; i <= tier; i++) {
    sum += i;
  }
  return sum;
}

export const warplight = (tier: number) => {
  return (tier - 1) * 4 + 2;
}

export const illusion = (tier: number) => {
  return (tier - 1) * 6 + 3;
}

export const availableEffects: Effect[] = [
  {
    id: 0,
    name: 'Attack',
    domains: [
      'Sorcery',
      'Fire',
      'Water',
      'Air',
      'Earth',
      'Necromancy',
      'Holy'
    ],
    modifierType: 'add',
    amount: 0,
    hasTiers: false,
    description: "takes an attack using the Caster's Magical Attack specialty that deals d10 DMG"
  },
  {
    id: 1,
    name: 'Attack (Targeted)',
    domains: ['Sorcery', 'Necromancy', 'Holy'],
    modifierType: 'add',
    amount: 2,
    hasTiers: false,
    description: 'takes an attack which cannot be dodged that deals d10 DMG'
  },
  {
    id: 2,
    name: 'Create Element',
    maxTier: 3,
    domains: ['Air', 'Earth', 'Fire', 'Water'],
    modifierType: 'function',
    amount: 'createElement',
    hasTiers: true,
    description: 'creates {elementAmount([tier],[domain])}'
  },
  {
    id: 3,
    name: 'Destroy Element',
    maxTier: 3,
    domains: ['Air', 'Earth', 'Fire', 'Water'],
    modifierType: 'add',
    amount: 1,
    hasTiers: true,
    description: 'destroys {elementAmount([tier],[domain])}'
  },
  {
    id: 4,
    name: 'Apply Force',
    domains: ['Sorcery', 'Fire', 'Water', 'Air', 'Earth', 'Nature'],
    modifierType: 'add',
    amount: 1,
    hasTiers: true,
    description: 'is moved [tier] meters [notes]'
  },
  {
    id: 5,
    name: 'Damage',
    domains: ['Sorcery', 'Fire', 'Water', 'Air', 'Earth', 'Necromancy'],
    modifierType: 'add',
    amount: 2,
    hasTiers: true,
    description: '+[tier] DMG'
  },
  {
    id: 6,
    name: 'Damage (Armor Piercing)',
    domains: ['Fire', 'Water', 'Necromancy'],
    modifierType: 'add',
    amount: 1,
    hasTiers: true,
    description: '[tier] AP'
  },
  {
    id: 7,
    name: 'Transform',
    domains: ['Holy', 'Water', 'Air', 'Earth', 'Necromancy', 'Nature'],
    modifierType: 'add',
    amount: 1,
    hasTiers: true,
    description: 'turns [tier * 1000]cm^3 of [domain] into [notes]'
  },
  {
    id: 8,
    name: 'Armor',
    domains: ['Sorcery', 'Earth', 'Nature'],
    modifierType: 'add',
    amount: 4,
    hasTiers: true,
    description: ' gains [tier * 3] Armor point(s)'
  },
  {
    id: 9,
    name: 'Healing (1)',
    domains: ['Holy', 'Water'],
    modifierType: 'add',
    amount: 4,
    hasTiers: true,
    description: 'heals [tier] Body point(s)'
  },
  {
    id: 10,
    name: 'Healing (1d10)',
    domains: ['Holy', 'Nature'],
    modifierType: 'add',
    amount: 15,
    hasTiers: true,
    description: 'heals [tier]d10 Body points'
  },
  {
    id: 11,
    name: 'Drain',
    domains: ['Necromancy'],
    modifierType: 'add',
    amount: 3,
    hasTiers: true,
    description: 'any body points taken by the spell can be redistributed by the caster'
  },
  {
    id: 12,
    name: 'Restore Wound',
    domains: ['Holy', 'Necromancy'],
    modifierType: 'add',
    amount: 2,
    hasTiers: true,
    description: 'changes the wound up by as many points as body healed, or [tier], whichever is lower'
  },
  {
    id: 13,
    name: 'Resurrect host (Holy)',
    domains: ['Holy'],
    modifierType: 'add',
    amount: 20,
    hasTiers: true,
    description: 'is brought back to life by pulling their soul from the ether.  The soul has to belong to the specific body, and be willing to come back to the body.'
  },
  {
    id: 14,
    name: 'Resurrect host (Necromancy)',
    domains: ['Necromancy'],
    modifierType: 'add',
    amount: 2,
    hasTiers: true,
    description: 'is brought back to life by either grabbing someone’s soul or creating a simulacrum from the ether. Normally the heal power does not work on dead targets, but coupled with the resurrection power, heals can add body points even if the target has less than their negative maximum body point total. Tthe soul can belong to anyone or can be an simulacrum made of many souls that doesn’t do anything unless commanded. A soul belonging to another body automatically gains a point of madness. It leaves its body after the spell is over.'
  },
  {
    id: 15,
    name: 'Emulate Item',
    domains: ['Holy', 'Sorcery', 'Fire', 'Water'],
    modifierType: 'add',
    amount: 1,
    hasTiers: true,
    description: 'emulates [notes] made of [domain] at 10 Structure Points or what the item had, whichever is less.'
  },
  {
    id: 16,
    name: 'Emulate Item',
    domains: ['Air'],
    modifierType: 'add',
    amount: 1,
    hasTiers: true,
    description: 'emulates [notes] made of [domain] at 1 Structure Points or what the item had, whichever is less.'
  },
  {
    id: 17,
    name: 'Emulate Item',
    domains: ['Earth'],
    modifierType: 'add',
    amount: 1,
    hasTiers: true,
    description: 'emulates [notes] made of [domain]'
  },
  {
    id: 18,
    name: 'Harden Item',
    domains: ['Sorcery', 'Holy', 'Nature'],
    modifierType: 'add',
    amount: 2,
    hasTiers: true,
    description: 'Adds [tier] structure points to the [notes] item'
  },
  {
    id: 19,
    name: 'Harden Item (Earth)',
    domains: ['Earth'],
    modifierType: 'add',
    amount: 1,
    hasTiers: true,
    description: 'Adds [tier] structure points to the [notes] item'
  },
  {
    id: 20,
    name: 'Animate Materials (Earth)',
    domains: ['Earth'],
    modifierType: 'add',
    amount: 1,
    hasTiers: true,
    description: 'creates an animated golem with the following Stats: [notes]'
  },
  {
    id: 21,
    name: 'Animate Materials (Necromancy)',
    domains: ['Necromancy'],
    modifierType: 'add',
    amount: 1,
    hasTiers: true,
    description: 'creates an animated skeleton or ghoul with the following Stats: [notes]'
  },
  {
    id: 22,
    name: 'Animate Materials (Nature)',
    domains: ['Nature'],
    modifierType: 'add',
    amount: 1,
    hasTiers: true,
    description: 'creates an animated tree with the following Stats: [notes]'
  },
  {
    id: 23,
    name: 'Animate Materials (Sorcery)',
    domains: ['Sorcery'],
    modifierType: 'add',
    amount: 1,
    hasTiers: true,
    description: 'creates an animated item or cloth with the following Stats: [notes]'
  },
  {
    id: 24,
    name: 'Control',
    domains: ['Necromancy', 'Mind'],
    modifierType: 'add',
    amount: 20,
    hasTiers: true,
    description: 'acts against their interests for the duration of the spell if they have no mind points left or take [tier*5] damage to their mind. During the entire time the character is under control they can be given commands by the caster, and they have to follow those commands. The control wears off if the character is knocked out, or gains more than 10 Mind points.'
  },
  {
    id: 25,
    name: 'Control (Inanimate)',
    domains: ['Sorcery', 'Earth', 'Nature'],
    modifierType: 'add',
    amount: 20,
    hasTiers: true,
    description: 'Animated inanimate objects only. Makes a character act against their interests for the duration of the spell if they have no mind points left. If they do, the spell does 5 damage to their mind. During the entire time the character is under control they can be given commands by the caster, and they have to follow those commands. The control wears off if the character is knocked out, or gains more than 10 Mind points.'
  },
  {
    id: 26,
    name: 'Control (Limited)',
    domains: ['Nature'],
    modifierType: 'add',
    amount: 10,
    hasTiers: true,
    description: 'acts against their interests if it has an INT bonus of -2 or lower. Every time the character has to follow a command they do not consent to they can roll a Willpower-Self Control check vs [resist] to see if they snap out of it. If the user has Mind points left, it does [tier*2] damage per level of limited control.'
  },
  {
    id: 27,
    name: 'Control',
    domains: ['Nature'],
    modifierType: 'add',
    amount: 20,
    hasTiers: true,
    description: 'acts against their interests for the duration of the spell if they have no mind points left or take [tier*5] damage to their mind. During the entire time the character is under control they can be given commands by the caster, and they have to follow those commands. The control wears off if the character is knocked out, or gains more than 10 Mind points.'
  },
  {
    id: 28,
    name: 'Control (Limited)',
    domains: ['Necromancy', 'Mind'],
    modifierType: 'add',
    amount: 10,
    hasTiers: true,
    description: 'acts against their interests if it has an INT bonus of -2 or lower. Every time the character has to follow a command they do not consent to they can roll a Willpower-Self Control check vs[resist] to see if they snap out of it. If the user has Mind points left, it does [tier*2] damage per level of limited control.'
  },
  {
    id: 29,
    name: 'Apply Damaging Condition',
    domains: ['Fire', 'Water', 'Necromancy', 'Air'],
    modifierType: 'add',
    amount: 7,
    hasTiers: true,
    description: '{damagingCondition([domain])}, the highest of [tier]d10 damage per round for [tier] minutes or until they pass an action against difficulty [resist] to stop the condition'
  },
  {
    id: 30,
    name: 'Apply Haste Condition',
    domains: ['Sorcery', 'Holy', 'Air', 'Nature'],
    modifierType: 'add',
    amount: 20,
    hasTiers: true,
    description: 'gains a third action per turn for [tier] minutes'
  },
  {
    id: 31,
    name: 'Apply Sluggish Condition',
    domains: ['Sorcery', 'Water', 'Necromancy', 'Nature'],
    modifierType: 'add',
    amount: 20,
    hasTiers: true,
    description: 'loses an action per turn for [tier] minutes or until they pass an action against difficulty [resist] to stop the condition'
  },
  {
    id: 32,
    name: 'Apply Movement Condition',
    domains: ['Water', 'Necromancy', 'Nature'],
    modifierType: 'function',
    amount: 'movementCondition',
    hasTiers: true,
    maxTier: 3,
    description: 'is trapped, {movementConditionDesc([tier])}'
  },
  {
    id: 33,
    name: 'Temporary Body (1)',
    domains: ['Holy', 'Earth', 'Necromancy', 'Nature'],
    modifierType: 'add',
    amount: 1,
    hasTiers: true,
    description: 'adds [tier] Body point(s) and {temporaryBodySideEffect([domain])} until the end of the spell'
  },
  {
    id: 34,
    name: 'Temporary Body (1d10)',
    domains: ['Holy', 'Earth', 'Necromancy', 'Nature'],
    modifierType: 'add',
    amount: 5,
    hasTiers: true,
    description: 'adds [tier]d10 Body and {temporaryBodySideEffect([domain])} points until the end of the spell'
  },
  {
    id: 35,
    name: 'Geas (Conscious Actions)',
    domains: ['Mind', 'Necromancy'],
    modifierType: 'function',
    amount: 'geas',
    hasTiers: true,
    maxTier: 4,
    description: 'is forced to [notes] if they have less than d10+[tier] Mind Points, or otherwise they lose [tier] Mind Points'
  },
  {
    id: 36,
    name: 'Geas (Unconscious Actions)',
    domains: ['Water', 'Nature', 'Necromancy'],
    modifierType: 'function',
    amount: 'geas',
    hasTiers: true,
    maxTier: 4,
    description: 'is forced to [notes] if they have less than d10+[tier] Mind Points, or otherwise they lose [tier] Mind Points'
  },
  {
    id: 37,
    name: 'Geas (Inanimate Object)',
    domains: ['Nature', 'Earth', 'Sorcery'],
    modifierType: 'function',
    amount: 'geas',
    hasTiers: true,
    maxTier: 4,
    description: 'is forced to [notes] if they have less than d10+[tier] Mind Points, or otherwise they lose [tier] Mind Points'
  },
  {
    id: 38,
    name: 'Divination',
    domains: ['Holy'],
    modifierType: 'add',
    amount: 6,
    hasTiers: true,
    description: 'gets to roll a die and use the result to replace any die they see rolled until the end of the spell'
  },
  {
    id: 39,
    name: 'Divination',
    domains: ['Necromancy', 'Sorcery'],
    modifierType: 'add',
    amount: 10,
    hasTiers: true,
    description: 'gets to roll a die and use the result to replace any die they see rolled until the end of the spell'
  },
  {
    id: 40,
    name: 'Morph Form',
    domains: ['Necromancy', 'Nature'],
    modifierType: 'add',
    amount: 7,
    hasTiers: false,
    description: 'changes into an [notes] animal of the same size as the creature'
  },
  {
    id: 41,
    name: 'Morph Form - Size',
    prerequisite: ['Morph Form'],
    domains: ['Necromancy', 'Nature'],
    modifierType: 'add',
    amount: 2,
    hasTiers: true,
    description: 'within [tier+1] size difference between the target and the animal'
  },
  {
    id: 42,
    name: 'Morph Form - Gear',
    prerequisite: ['Morph Form'],
    domains: ['Necromancy', 'Nature'],
    modifierType: 'add',
    amount: 4,
    hasTiers: false,
    description: 'keeping all their stuff'
  },
  {
    id: 43,
    name: 'Read Mind',
    domains: ['Mind'],
    modifierType: 'add',
    amount: 3,
    hasTiers: true,
    maxTier: 4,
    description: 'has their {thoughts([tier])} read if they are willing or have been reduced to 0 Mind, and lose 2 Mind if they resist'
  },
  {
    id: 44,
    name: 'Communicate Thought',
    domains: ['Mind', 'Nature'],
    modifierType: 'add',
    amount: 3,
    hasTiers: true,
    maxTier: 3,
    description: 'communicate {comms([tier])} to the caster,talk to another living thing within range of the spell, whether that be a human, animal or any other creature. The caster and target do not need to share a language, or even be able to speak a language. If they are unaware of the caster, count as an attack against the mind with damage 1'
  },
  {
    id: 45,
    name: 'Sense Magic',
    domains: ['Sorcery', 'Holy'],
    modifierType: 'function',
    amount: 'createElement',
    hasTiers: true,
    maxTier: 3,
    description: "Sense [notes]{sense([tier])} magic, and only execute the rest of the spell once it's sensed"
  },
  {
    id: 46,
    name: 'Sense Life(Animal)',
    domains: ['Mind', 'Nature'],
    modifierType: 'function',
    amount: 'createElement',
    hasTiers: true,
    maxTier: 3,
    description: "Sense [notes]{sense([tier])} living things, and only execute the rest of the spell once it's sensed"
  },
  {
    id: 47,
    name: 'Sense Gods, Good and Evil',
    domains: ['Necromancy', 'Holy'],
    modifierType: 'function',
    amount: 'createElement',
    hasTiers: true,
    maxTier: 3,
    description: "Sense [notes]{sense([tier])} intent, and only execute the rest of the spell once it's sensed"
  },
  {
    id: 48,
    name: 'Sense souls',
    domains: ['Nature', 'Necromancy'],
    modifierType: 'function',
    amount: 'createElement',
    hasTiers: true,
    maxTier: 3,
    description: "Sense [notes]{sense([tier])} soul, and only execute the rest of the spell once it's sensed"
  },
  {
    id: 49,
    name: 'Sense liquids',
    domains: ['Water'],
    modifierType: 'function',
    amount: 'createElement',
    hasTiers: true,
    maxTier: 3,
    description: "Sense [notes]{sense([tier])} liquid, and only execute the rest of the spell once it's sensed"
  },
  {
    id: 50,
    name: 'Sense temperature',
    domains: ['Fire'],
    modifierType: 'function',
    amount: 'createElement',
    hasTiers: true,
    maxTier: 3,
    description: "Sense [notes]{sense([tier])} temperature, and only execute the rest of the spell once it's sensed"
  },
  {
    id: 51,
    name: 'Sense gases',
    domains: ['Air'],
    modifierType: 'function',
    amount: 'createElement',
    hasTiers: true,
    maxTier: 3,
    description: "Sense [notes]{sense([tier])} gas, and only execute the rest of the spell once it's sensed"
  },
  {
    id: 52,
    name: 'Sense plants and minerals',
    domains: ['Nature', 'Earth'],
    modifierType: 'function',
    amount: 'createElement',
    hasTiers: true,
    maxTier: 3,
    description: "Sense [notes]{sense([tier])} plants and minerals, and only execute the rest of the spell once it's sensed"
  },
  {
    id: 53,
    name: 'End once Sensed',
    incompatible: ['Reset once Sensed'],
    prerequisite: ['Sense', 'Lasting'],
    domains: [
      'Sorcery', 'Fire',
      'Water', 'Air',
      'Earth', 'Necromancy',
      'Holy', 'Nature',
      'Mind'
    ],
    modifierType: 'multiply',
    amount: 0.25,
    hasTiers: false,
    description: 'Once sensed, the spell ends'
  },
  {
    id: 54,
    name: 'Reset once Sensed',
    incompatible: ['End once Sensed'],
    prerequisite: ['Sense', 'Lasting'],
    domains: [
      'Sorcery', 'Fire',
      'Water', 'Air',
      'Earth', 'Necromancy',
      'Holy', 'Nature',
      'Mind'
    ],
    modifierType: 'multiply',
    amount: 0.5,
    hasTiers: false,
    description: 'Once sensed, the spell goes back to a holding state'
  },
  {
    id: 55,
    name: 'Warp Light',
    domains: ['Air', 'Illusion'],
    modifierType: 'function',
    amount: 'warplight',
    hasTiers: true,
    description: 'hides something or causes it to glow, or reveal something visible elsewhere in range. If used to hide or become invisible, gives a disavdantage to finding the target, gives [tier-1] advantage to anyone using it'
  },
  {
    id: 56,
    name: 'Illusion',
    domains: ['Illusion'],
    modifierType: 'function',
    amount: 'illusion',
    hasTiers: true,
    description: 'create a ficticious image,  gives [tier-1] advantage to anyone using it'
  },
  {
    id: 57,
    name: 'Silence',
    domains: ['Air', 'Illusion'],
    modifierType: 'function',
    amount: 'warplight',
    hasTiers: true,
    description: 'Dampens the volume of noises up to {volume([tier])}, If used to hide or become silent, gives a [tier-1] advantage. Making a caster character silent means they can only use spells with the Stealth modifier or Cantrips until the silence ends'
  },
  {
    id: 58,
    name: 'Warp Space',
    domains: ['Sorcery'],
    modifierType: 'add',
    amount: 5,
    hasTiers: false,
    description: 'connects two points within range with a portal'
  },
  {
    id: 59,
    name: 'Warp Weight',
    domains: ['Sorcery'],
    modifierType: 'add',
    amount: 4,
    hasTiers: true,
    description: 'changes its weight by half or double [tier] times, which means it can be pushed as if it was lighter/heavier'
  },
  {
    id: 60,
    name: 'Warp Size',
    domains: ['Sorcery', 'Nature'],
    modifierType: 'add',
    amount: 8,
    hasTiers: true,
    description: "changes its size by half or double [tier] times, changing the creature's size rating up or down by [tier]"
  },
  {
    id: 61,
    name: 'Cure Disease',
    domains: ['Holy', 'Nature'],
    modifierType: 'add',
    amount: 4,
    hasTiers: false,
    description: 'Automatically count as a passed medical check against a disease'
  },
  {
    id: 62,
    name: 'Cure Infection',
    domains: ['Holy', 'Water'],
    modifierType: 'add',
    amount: 4,
    hasTiers: false,
    description: 'Automatically count as a passed medical check against an infection'
  },
  {
    id: 63,
    name: 'Cure Disease',
    domains: ['Necromancy'],
    modifierType: 'add',
    amount: 4,
    hasTiers: false,
    description: 'Automatically count as a passed medical check against a disease but the target loses 1d10 Body points as their  infected cells and the ones around it become devoid of life'
  },
  {
    id: 64,
    name: 'Cure Infection',
    domains: ['Necromancy'],
    modifierType: 'add',
    amount: 4,
    hasTiers: false,
    description: 'Automatically count as a passed medical check against an infection but the target loses 1d10 Body points as their  infected cells and the ones around it become devoid of life'
  },
  {
    id: 65,
    name: 'Induce Plague',
    domains: ['Necromancy', 'Holy'],
    modifierType: 'function',
    amount: 'plague',
    hasTiers: true,
    maxTier: 3,
    description: 'must make a Physique - Constitution  or Lore Medicine check  of difficulty {plague([tier])} at their next rest or be infected with Disease as if they have just been exposed to it'
  },
  {
    id: 66,
    name: 'Induce Madness',
    domains: ['Mind'],
    modifierType: 'function',
    amount: 'madness',
    hasTiers: true,
    maxTier: 3,
    description: 'Makes an immediate roll of Willpower - Self Control of diffculty {Math.ceil(madness([tier])/2)} or suffers a Madness attack as if they had a Madness of [tier]'
  },
  {
    id: 67,
    name: 'Light',
    domains: ['Holy', 'Fire', 'Necromancy', 'Sorcery', 'Illusion'],
    modifierType: 'add',
    amount: 1,
    hasTiers: true,
    description: 'illuminates {light([tier])}'
  },
  {
    id: 68,
    name: 'Noise',
    domains: [
      'Holy', 'Fire',
      'Necromancy', 'Sorcery',
      'Illusion', 'Nature',
      'Air', 'Water',
      'Earth'
    ],
    modifierType: 'add',
    amount: 1,
    hasTiers: true,
    description: 'causes noise {noise([tier])}'
  },
  {
    id: 69,
    name: 'Sound (Subject Matter)',
    domains: ['Sorcery', 'Illusion', 'Mind'],
    modifierType: 'add',
    amount: 1,
    hasTiers: true,
    maxTier: 3,
    description: 'creates sounds that {sound([tier])}'
  },
  {
    id: 70,
    name: 'Sound (Volume)',
    domains: ['Sorcery', 'Illusion', 'Mind'],
    modifierType: 'function',
    amount: 'sound',
    hasTiers: true,
    maxTier: 3,
    description: 'at a volume of {volume([tier])}'
  },
  {
    id: 71,
    name: 'Negate Magic',
    domains: ['Sorcery', 'Necromancy'],
    modifierType: 'add',
    amount: 1,
    hasTiers: true,
    description: 'Ends all lasting spells with less SP than [tier] in the target area. New spells cast for the next turn have [tier] number added to their spell difficulty'
  },
  {
    id: 72,
    name: 'Help Strength Attribute',
    domains: ['Holy', 'Necromancy', 'Earth', 'Air', 'Nature'],
    modifierType: 'function',
    amount: 'help',
    hasTiers: true,
    maxTier: 5,
    description: 'Add [tier] points to Strength'
  },
  {
    id: 73,
    name: 'Help Strength Skill',
    domains: ['Holy', 'Necromancy', 'Earth', 'Air', 'Nature'],
    modifierType: 'function',
    amount: 'help',
    hasTiers: true,
    maxTier: 5,
    description: 'Add {[tier]*2} points to STR-[notes]'
  },
  {
    id: 74,
    name: 'Help Strength Speciality',
    domains: ['Holy', 'Necromancy', 'Earth', 'Air', 'Nature'],
    modifierType: 'function',
    amount: 'help',
    hasTiers: true,
    maxTier: 5,
    description: 'Add {[tier]*3} points to STR-[notes]'
  },
  {
    id: 75,
    name: 'Help Dexterity Attribute',
    domains: ['Holy', 'Necromancy', 'Air', 'Illusion'],
    modifierType: 'function',
    amount: 'help',
    hasTiers: true,
    maxTier: 5,
    description: 'Add [tier] points to Dexterity'
  },
  {
    id: 76,
    name: 'Help Dexterity Skill',
    domains: ['Holy', 'Necromancy', 'Air', 'Illusion'],
    modifierType: 'function',
    amount: 'help',
    hasTiers: true,
    maxTier: 5,
    description: 'Add {[tier]*2} points to DEX-[notes]'
  },
  {
    id: 77,
    name: 'Help Dexterity Speciality',
    domains: ['Holy', 'Necromancy', 'Air', 'Illusion'],
    modifierType: 'function',
    amount: 'help',
    hasTiers: true,
    maxTier: 5,
    description: 'Add {[tier]*3} points to DEX-[notes]'
  },
  {
    id: 78,
    name: 'Help Intelligence Attribute',
    domains: ['Mind', 'Necromancy', 'Nature'],
    modifierType: 'function',
    amount: 'help',
    hasTiers: true,
    maxTier: 5,
    description: 'Add [tier] points to Intelligence'
  },
  {
    id: 79,
    name: 'Help Intelligence Skill',
    domains: ['Mind', 'Necromancy', 'Nature'],
    modifierType: 'function',
    amount: 'help',
    hasTiers: true,
    maxTier: 5,
    description: 'Add {[tier]*2} points to INT-[notes]'
  },
  {
    id: 80,
    name: 'Help Intelligence Speciality',
    domains: ['Mind', 'Necromancy', 'Nature'],
    modifierType: 'function',
    amount: 'help',
    hasTiers: true,
    maxTier: 5,
    description: 'Add {tier]*3} points to INT-[notes]'
  },
  {
    id: 81,
    name: 'Help Empathy Attribute',
    domains: ['Mind', 'Holy', 'Water', 'Illusion', 'Nature'],
    modifierType: 'function',
    amount: 'help',
    hasTiers: true,
    maxTier: 5,
    description: 'Add [tier] points to Empathy'
  },
  {
    id: 82,
    name: 'Help Empathy Skill',
    domains: ['Mind', 'Holy', 'Water', 'Illusion', 'Nature'],
    modifierType: 'function',
    amount: 'help',
    hasTiers: true,
    maxTier: 5,
    description: 'Add {[tier]*2} points to EMP-[notes]'
  },
  {
    id: 83,
    name: 'Help Empathy Speciality',
    domains: ['Mind', 'Holy', 'Water', 'Illusion', 'Nature'],
    modifierType: 'function',
    amount: 'help',
    hasTiers: true,
    maxTier: 5,
    description: 'Add {[tier]*3} points to EMP-[notes]'
  },
  {
    id: 84,
    name: 'Hinder Strength Skill',
    domains: ['Holy', 'Necromancy', 'Earth', 'Nature'],
    modifierType: 'function',
    amount: 'hinder',
    hasTiers: true,
    maxTier: 5,
    description: 'Subtract [tier] points from Strength-[notes]'
  },
  {
    id: 85,
    name: 'Hinder Strength Speciality',
    domains: ['Holy', 'Necromancy', 'Earth', 'Nature'],
    modifierType: 'function',
    amount: 'hinder',
    hasTiers: true,
    maxTier: 5,
    description: 'Subtract [tier*2] points from Strength-[notes]'
  },
  {
    id: 86,
    name: 'Hinder Dexterity Skill',
    domains: ['Holy', 'Necromancy', 'Air', 'Illusion', 'Nature'],
    modifierType: 'function',
    amount: 'hinder',
    hasTiers: true,
    maxTier: 5,
    description: 'Subtract [tier] points from Dexterity-[notes]'
  },
  {
    id: 87,
    name: 'Hinder Dexterity Speciality',
    domains: ['Holy', 'Necromancy', 'Air', 'Illusion', 'Nature'],
    modifierType: 'function',
    amount: 'hinder',
    hasTiers: true,
    maxTier: 5,
    description: 'Subtract [tier*2] points from Dexterity-[notes]'
  },
  {
    id: 88,
    name: 'Hinder Intelligence Skill',
    domains: ['Mind', 'Necromancy', 'Nature'],
    modifierType: 'function',
    amount: 'hinder',
    hasTiers: true,
    maxTier: 5,
    description: 'Subtract [tier] points from Intelligence-[notes]'
  },
  {
    id: 89,
    name: 'Hinder Intelligence Speciality',
    domains: ['Mind', 'Necromancy', 'Nature'],
    modifierType: 'function',
    amount: 'hinder',
    hasTiers: true,
    maxTier: 5,
    description: 'Subtract [tier*2] points from Intelligence-[notes]'
  },
  {
    id: 90,
    name: 'Hinder Empathy Skill',
    domains: ['Mind', 'Holy', 'Water', 'Illusion', 'Nature'],
    modifierType: 'function',
    amount: 'hinder',
    hasTiers: true,
    maxTier: 5,
    description: 'Subtract [tier] points from Empathy-[notes]'
  },
  {
    id: 91,
    name: 'Hinder Empathy Speciality',
    domains: ['Mind', 'Holy', 'Water', 'Illusion', 'Nature'],
    modifierType: 'function',
    amount: 'hinder',
    hasTiers: true,
    maxTier: 5,
    description: 'Subtract [tier*2] points from Empathy-[notes]'
  }
]