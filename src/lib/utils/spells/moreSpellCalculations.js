

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

export function processDomainEffects(spell) {
  let sMode = spell.spell_data.mode
  let sDomain = spell.spell_data.domain
  let sEffects = spell.spell_data.effects

  let effects = sEffects;
  effects = structuredClone(effects);

  if (sMode === "Unpredicable") {
    effects.push({
      name: "Unpredictable",
      tier: 1,
      hasTiers: true,
      notes: "Unpredictable spell",
      modifierType: "add",
      amount: 4,
      description: "",
    });
  }

  let domain = sDomain;
  switch (domain) {
    case "Fire":
      let x = effects.find((x) => x.name === "Damage");
      if (x && (!x.domaintier || x.domaintier <= 0)) {
        x.tier += 2;
        x.domaintier = 2;
        x.notes = "+2 Fire Domain Damage";
        x.prerequisite = ["Fire"];
      } else if (!x)
        effects.push({
          name: "Damage",
          tier: 2,
          domaintier: 2,
          hasTiers: true,
          prerequisite: ["Fire"],
          notes: "Fire Domain",
          modifierType: "add",
          amount: 2,
          description: "+2 DMG",
        });
      let y = effects.find((y) => y.name === "Light");
      if (y && (!y.domaintier || y.domaintier <= 0)) {
        y.tier += 2;
        y.domaintier = 2;
        y.notes = "+2 Fire Domain Light";
        y.prerequisite = ["Fire"];
      } else if (!y)
        effects.push({
          name: "Light",
          tier: 2,
          domaintier: 2,
          hasTiers: true,
          prerequisite: ["Fire"],
          notes: "Fire Domain",
          modifierType: "add",
          amount: 2,
          description: "Flickers with enough light to brighten a dark room",
        });
      let z = effects.find((z) => z.name === "Create Element");
      if (!z) {
        effects.push({
          name: "Require Element",
          tier: 0,
          domaintier: 0,
          hasTiers: true,
          prerequisite: ["Fire"],
          notes: "Fire Domain",
          modifierType: "add",
          amount: 0,
          description: "Requires the presence of Fire or the spell fails",
        });
      }
      break;
    case "Air":
      let air = effects.find((air) => air.name === "Create Element");
      if (!air) {
        effects.push({
          name: "Require Element",
          tier: 0,
          domaintier: 0,
          hasTiers: true,
          prerequisite: ["Air"],
          notes: "Air Domain",
          modifierType: "add",
          amount: 0,
          description: "Requires the presence of Air or the spell fails",
        });
      }
      break;
    case "Water":
      let water = effects.find((water) => water.name === "Create Element");
      if (!water) {
        effects.push({
          name: "Require Element",
          tier: 0,
          domaintier: 0,
          hasTiers: true,
          prerequisite: ["Water"],
          notes: "Water Domain",
          modifierType: "add",
          amount: 0,
          description: "Requires the presence of Water or the spell fails",
        });
      }
      break;
    case "Earth":
      let force = effects.find((force) => force.name === "Apply Force");
      if (force && (!force.domaintier || force.domaintier <= 0)) {
        force.tier += 2;
        force.domaintier = 2;
        force.notes += " powered up by Earth Domain";
        force.prerequisite = ["Earth"];
      } else if (!force)
        effects.push({
          name: "Apply Force",
          tier: 2,
          domaintier: 2,
          hasTiers: true,
          prerequisite: ["Earth"],
          notes: "Earth Domain",
          modifierType: "add",
          amount: 2,
          description: "is moved 2 meters",
        });
      let earth = effects.find((earth) => earth.name === "Create Element");
      if (!earth) {
        effects.push({
          name: "Require Element",
          tier: 0,
          domaintier: 0,
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
      effects.push({
        name: "Require Mind",
        tier: 0,
        domaintier: 0,
        hasTiers: true,
        prerequisite: ["Mind"],
        notes: "Mind Domain",
        modifierType: "add",
        amount: 0,
        description: "Requires the presence of a Mind or the spell fails",
      });
      break;
    case "Nature":
      effects.push({
        name: "Require Nature",
        tier: 0,
        domaintier: 0,
        hasTiers: true,
        prerequisite: ["Nature"],
        notes: "Nature Domain",
        modifierType: "add",
        amount: 0,
        description: "Requires the presence of a Life or the spell fails",
      });
      break;
    case "Illusion":
      effects.push({
        name: "Illusion Discount",
        tier: 1,
        domaintier: 0,
        hasTiers: true,
        prerequisite: ["Illusion"],
        notes:
          "When Taking Illusion Powers in a spell as well as the “Help Statistic/Skill/Specialty” Power, Ignore the spell points of the Illusion Powers up to the amount spent on the “Help Statistic/Skill/Specialty” Power",
        modifierType: "reduce",
        amount: calcIllusionDiscount(0, effects),
        description: "",
      });
      break;
    default:
      break;
  }
  return effects;
}

export function processDomainModifiers(spell) {

  let sDomain = spell.spell_data.domain
  let sModifiers = spell.spell_data.modifiers

  let modifiers = sModifiers;
  modifiers = structuredClone(modifiers);
  let domain = sDomain;
  switch (domain) {
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

function calcIllusionDiscount(total, effects) {
  //effects = effects.filter((x) => x.);
  let help = effects.filter((x) => x.name.includes("Help"));
  let helpSP = 0;
  help.forEach((element) => {
    helpSP += resolveCost(element);
  });
  const illusionDiscount = Math.min(helpSP, Math.max(total - helpSP, 0));
  if (sMode === "Unpredictable") illusionDiscount -= 4;
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