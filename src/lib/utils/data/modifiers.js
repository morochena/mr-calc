



export const splitModifier = (tier) => {
  if (tier == 1) return 8;
  if (tier == 2) return 15;
  if (tier == 3) return 27;
  if (tier == 4) return 40;
  if (tier > 4) return tier * 10;
}

export const rangeModifier = (tier) => {
  let cost = 0

  for (let i = 0; i < tier; i++) {
    if (i < 5) {
      cost += 2
    } else if (i < 10) {
      cost += 3
    } else {
      cost += 4
    }
  }

  return cost;
}

export const aoeModifier = (tier) => {
  let cost = 0;

  for (let i = 0; i < tier; i++) {
    if (i < 10) {
      cost += 2
    } else if (i < 20) {
      cost += 3
    } else if (i < 30) {
      cost += 4
    } else {
      cost += 5
    }
  }

  return cost;
}

export const lastingModifier = (tier, type = null) => {
  let baseCost = 0
  let cost = 0
  let multiplier = 0

  if (type == 'Lasting (Rounds)') {
    baseCost = 2
    multiplier = 2
  } else if (type == 'Lasting (Minutes)') {
    baseCost = 3
    multiplier = 3
  } else if (type == 'Lasting (Hours)') {
    cost += 2
    baseCost = 4
    multiplier = 4
  } else if (type == 'Lasting (Days)') {
    cost += 5
    baseCost = 5
    multiplier = 5
  } else if (type == 'Lasting (Hours)') {
    cost += 8
    baseCost = 6
    multiplier = 8
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
      cost += baseCost
    }
  }

  return [cost, multiplier];
}

export const componentModifier = (tier) => {
  return tier * -1 + 1;
}

export const availableModifiers = [
  { name: "Ray", hasTiers: false, incompatible: ["Area of Effect"], prerequisite: ["Range"], modifierType: 'reduce', amount: 3, description: "the targets must be in direct line of sight for the character for the entire duration of the spell or the spell fails" },
  { name: "Aura", hasTiers: false, incompatible: ["Damage", "Attack"], prerequisite: ["Area of Effect"], modifierType: 'add', amount: 2, description: " is an Aura" },
  { name: "Reaction", hasTiers: false, incompatible: ["Charge Up"], modifierType: 'add', amount: 3, description: "as a Reaction" },
  { name: "Exhausting", hasTiers: false, incompatible: ["Uncomplicated"], modifierType: 'reduce', amount: 4, description: "" },
  { name: "Uncomplicated", hasTiers: false, incompatible: ["Exhausting"], modifierType: 'add', amount: 4, description: "" },
  { name: "Charge Up", hasTiers: false, incompatible: ["Stealth"], modifierType: 'multiply', amount: .75, description: "taking 2 actions of obvious magical charging" },
  { name: "Dangerous", hasTiers: false, incompatible: ["Stable", "Rune", "Alchemy"], modifierType: 'reduce', amount: 5, description: "On a failure of the spell or a roll of a 1, the cost of the spell is increased by 6, and cannot be taken from Arcana. The cost can overflow from mind to body" },
  { name: "Painful", hasTiers: false, modifierType: 'reduce', amount: 6, description: "The cost applies to body as well as mind" },
  { name: "Stealth", hasTiers: false, incompatible: ["Somatic", "Charge Up"], modifierType: 'add', amount: 1, description: "is discreet, with no visible somatic or vocal components, nor any glow or magical energies." },
  { name: "Somatic", hasTiers: false, incompatible: ["Stealth", "Rune", "Alchemy"], modifierType: 'reduce', amount: 3, description: "requires both hands to perform [notes]" },
  { name: "Split", hasTiers: true, modifierType: 'function', amount: "splitModifier", types: ['Concentrated Power'], description: "split into [tier+1] effects, each of which" },
  { name: "Range", hasTiers: true, modifierType: 'function', amount: "rangeModifier", description: "has a range of {rangeMeters([tier])} meters or {rangeMeters([tier])*3} with disadvantage" },
  { name: "Trigger Action", hasTiers: false, modifierType: 'multiply', amount: 0.5, description: "the target has to [notes] which takes an action in combat, or be restrained and have someone else perform the action for them" },
  { name: "Thwarted By", hasTiers: false, modifierType: 'multiply', amount: 0.667, description: "the target rolls their {thwartStat([domain])} bonus versus difficulty [resist] " },
  { name: "Area of Effect (Sphere)", hasTiers: true, modifierType: 'function', amount: "aoeModifier", description: "covers a continuous Sphere with radius {radiusCalc([JSON.stringify(spell)],[tier])} ." },
  { name: "Area of Effect (Rectangle)", hasTiers: true, modifierType: 'function', amount: "aoeModifier", description: "covers a continuous Rectangle with length [notes] and width {rectWidthCalc([tier],[notes])}" },
  { name: "Area of Effect (Cone)", hasTiers: true, modifierType: 'function', amount: "aoeModifier", description: "covers a continuous Cone with length [notes] and width {rectWidthCalc([tier],[notes])}." },
  { name: "Area of Effect (Custom)", hasTiers: true, modifierType: 'function', amount: "aoeModifier", description: "covers a continuous polygon with area {aoeArea([tier])} meters Sq." },
  { name: "Lasting (Rounds)", incompatible: ["Lasting (Minutes)", "Lasting (Hours)", "Lasting (Days)", "Lasting (Weeks)"], hasTiers: true, modifierType: 'functionMultiply', amount: "lastingModifier", maxTier: 4, description: "lasts for [tier+1] rounds" },
  { name: "Lasting (Minutes)", incompatible: ["Lasting (Rounds)", "Lasting (Hours)", "Lasting (Days)", "Lasting (Weeks)"], hasTiers: true, modifierType: 'functionMultiply', amount: "lastingModifier", maxTier: 15, description: "lasts for [tier] minutes" },
  { name: "Lasting (Hours)", incompatible: ["Lasting (Rounds)", "Lasting (Minutes)", "Lasting (Days)", "Lasting (Weeks)"], hasTiers: true, modifierType: 'functionMultiply', amount: "lastingModifier", maxTier: 24, description: "lasts for [tier] hours" },
  { name: "Lasting (Days)", incompatible: ["Lasting (Rounds)", "Lasting (Minutes)", "Lasting (Hours)", "Lasting (Weeks)"], hasTiers: true, modifierType: 'functionMultiply', amount: "lastingModifier", maxTier: 7, description: "lasts for [tier] days" },
  { name: "Lasting (Weeks)", incompatible: ["Lasting (Rounds)", "Lasting (Minutes)", "Lasting (Hours)", "Lasting (Days)"], hasTiers: true, modifierType: 'functionMultiply', amount: "lastingModifier", description: "lasts for [tier] weeks" },
  { name: "Delay", prerequisite: ["Lasting"], hasTiers: false, modifierType: 'multiply', amount: 0.333, description: "doesn't activate immediately, but instead goes off after {halftime()}" },
  { name: "Concentration", prerequisite: ["Lasting"], hasTiers: false, modifierType: 'add', amount: 0, description: "requires Concentration for the whole time the spell is cast, and any time the user is hurt they must make a 'Willpower-Concentration' roll versus the amount of damage they took" },
  { name: "Channelling", prerequisite: ["Lasting"], hasTiers: false, modifierType: 'add', amount: 0, description: "requires Channelling, giving up one action in combat or having disadvantage on anything else the duration of the spell" },
  { name: "Sculpted (Immune)", hasTiers: false, modifierType: 'add', amount: 0, description: "will not target the caster" },
  { name: "Sculpted (Pre-sculpted)", hasTiers: false, modifierType: 'add', amount: -2, description: "will not target [notes]" },
  { name: "Sculpted (Sculpted)", hasTiers: false, modifierType: 'add', amount: 2, description: "will not target anyone chosen by the caster." },
  { name: "Requires Component", hasTiers: true, modifierType: 'function', amount: "componentModifier", description: "requires a [notes], of at least cost {calcComponentCost([tier])} Denar" },
  { name: "Bulky Component", prerequisite: ["Requires Component"], hasTiers: false, modifierType: 'reduce', amount: 2, description: "the component is bulky" },
  { name: "Component Consumed", prerequisite: ["Requires Component"], hasTiers: false, modifierType: 'reduce', amount: 3, description: "the component(s) are consumed" },
  { name: "Magical Runes (Runesmith only; Required for Runes)", incompatible: ["Somatic", "Dangerous"], prerequisite: ["Runesmith"], hasTiers: false, modifierType: 'add', amount: 7, description: "is a magical rune with a charge" },
  { name: "Magical Rune Extra Charge(Runesmith only)", prerequisite: ["Magical Runes (Runesmith only; Required for Runes)"], hasTiers: true, modifierType: 'add', amount: 2, description: "has [tier] charges" },
  { name: "Magical Rune Permanent (Runesmith only)", prerequisite: ["Magical Runes (Runesmith only; Required for Runes)"], hasTiers: false, modifierType: 'add', amount: 20, description: "never loses charge" },
  { name: "Magical Rune Small(Runesmith only)", prerequisite: ["Magical Runes (Runesmith only; Required for Runes)"], hasTiers: false, modifierType: 'add', amount: 5, description: "is a small rune" },
  { name: "Magical Rune Expendable (Runesmith only)", prerequisite: ["Magical Runes (Runesmith only; Required for Runes)"], hasTiers: false, modifierType: 'reduce', amount: 3, description: "the rune is consumed" },
  { name: "Runesmith crafting (Runesmith only)", prerequisite: ["Magical Runes (Runesmith only; Required for Runes)"], hasTiers: true, modifierType: 'reduce', amount: 2, maxTier: 5, description: "takes [(tier+2)*cost] hours to craft" },
  { name: "Alchemy (Alchemist only; Required for Alchemy)", incompatible: ["Somatic"], prerequisite: ["Alchemist"], hasTiers: false, modifierType: 'add', amount: 3, description: "is an alchemical item" },
  { name: "Alchemy brewing (Alchemist only)", prerequisite: ["Alchemy (Alchemist only; Required for Alchemy)"], hasTiers: true, modifierType: 'reduce', amount: 1, description: "takes [tier+cost] hours to craft" },
  { name: "Elongated Shelf Life (Alchemist only)", prerequisite: ["Alchemy (Alchemist only; Required for Alchemy)"], hasTiers: false, modifierType: 'add', amount: 2, description: "keeps for [tier+1] months" },
]