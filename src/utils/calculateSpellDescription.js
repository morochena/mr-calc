
function calcSpellResist(SPCost) {
  return calcSpellCost(SPCost) + 5;
}

function calcSpellCost(SPCost) {
  const SP = SPCost;
  let cost = Math.ceil(SP / 10.0) + 1;

  const { selectedModifiers } = modifiers;
  const modList = get(selectedModifiers)
  if (modList.filter(mod => mod.name === "Exhausting").length > 0) {
    cost += 1;
  }
  if (modList.filter(mod => mod.name === "Uncomplicated").length > 0) {
    cost -= 1;
  }


  return cost;
}

function halftime() {
  const { selectedModifiers } = modifiers;
  const modList = get(selectedModifiers).filter(mod => mod.name.includes("Lasting"));
  if (modList.length <= 0) {
    return "Lasting modifier not found"
  }

  const increment = modList[0].name.match(/\((.*?)\)/g)[0];
  if (increment.includes("Rounds")) {
    const time = Math.ceil((modList[0].tier + 1) / 2);
    return time + " " + increment
  }
  else {
    const time = (modList[0].tier) / 2;
    return time + " " + increment
  }
}

function calcComponentCost(tier) {
  let cost = 1;
  const ftier = tier - 1;
  if (ftier < 5)
    cost = ftier * 25;
  else if (ftier < 9)
    cost = 100 + (ftier - 4) * 100;
  else
    cost = 500 + (ftier - 8) * 2000;

  if (cost <= 0)
    return "less than 1";
  return cost;
}

function elementAmount(tier, domain) {
  switch (domain) {
    case "Fire":
      switch (tier) {
        case 1:
          return "A spark of flames (300 Celcius)"
        case 2:
          return "a roaring fire (750 Celcius)"
        default:
        case 3:
          return "a blazing inferno (1200 Celcius), automatically applying On Fire Condition"
      }
    case "Water":
      switch (tier) {
        case 1:
          return "a drop of water"
        case 2:
          return "a liter of water"
        default:
        case 3:
          return "20 liters of water"
      }
    case "Earth":
      switch (tier) {
        case 1:
          return "a handful of dirt"
        case 2:
          return "1kg of top soil or rock"
        default:
        case 3:
          return "20kg of top soil or rock"
      }
    case "Air":
      switch (tier) {
        case 1:
          return "a gasp of air"
        case 2:
          return "a cubic meter of Air"
        default:
        case 3:
          return "10 cubic meters of Air"
      }
    default:
      return "Element";
  }
}

function movementConditionDesc(tier) {
  switch (tier) {
    case 1:
      return "unable to Run";
    case 2:
      return "only able to use 1 Move action a turn";
    case 3:
    default:
      return "unable to move at all";
  }
}
function light(tier) {
  if (tier == 1) {
    return "a small room with light";
  }
  else if (tier < 5) {
    return "as bright as daylight";
  }
  else if (tier < 10) {
    return "intensely, causing blindness for 1 round for everyone looking at the light in a previously dark room at a distance of " + 10 * (tier - 4) + "m";
  }
  else {
    return "intensely, causing blindness for 1 round for everyone looking at the light in a previously dark room at a distance of " + 10 * (tier - 4) + "m and in a previously lit room to a distance of " + 10 * (tier - 9) + "m";
  }
}

function noise(tier) {
  if (tier < 4) {
    return 90 + 10 * tier + " DB";
  }
  else if (tier < 8) {
    return 110 + 5 * tier + " DB";
  }
  else {
    return ">150DB causing deafness for 1 round at a distance of " + 10 * (tier - 7) + "m";
  }
}

function sound(tier) {
  switch (tier) {
    case 1:
      return "heard during the spell casting or preparation";
    case 2:
      return "that you can conceptualize in your mind during spell casting or preparation";
    case 3:
    default:
      return "Generates entirely new based off some idea ";
  }
}

function volume(tier) {
  switch (tier) {
    case 1:
      return "50 DB";
    case 2:
      return "100 DB";
    case 3:
    default:
      return "120 DB";
  }
}

function sense(tier) {
  switch (tier) {
    case 1:
      return "nonspecific";
    case 2:
      return ", a category of";
    case 3:
      return ", specifically"
    default:
      return "nonsense";
  }
}
function thoughts(tier) {
  switch (tier) {
    case 1:
      return "surface thoughts";
    case 2:
      return "deeper thoughts";
    case 3:
      return "memories"
    default:
      return "subconscious";
  }
}

function comms(tier) {
  switch (tier) {
    case 1:
      return "words";
    case 2:
      return "music, sounds, words or images";
    case 3:
      return "dreams"
    default:
      return "subconscious";
  }
}

function temporaryBodySideEffect(domain) {
  switch (domain) {
    case "Holy":
      return "starts glowing with holy protection";
    case "Earth":
      return "hardens with rocks, reducing their move by 1m, run by 2m and sprint by 4m";
    case "Nature":
      return " grows thicker skin and starts resembling a beast with natural toughness";
    case "Necromancy":
      return "grows painful bony protrusions and leathery fur, harming their mind by 1d10 points once upon spell cast, the points come back";
    default:
      return "applies damaging condition";
  }
}

function damagingCondition(domain) {
  switch (domain) {
    case "Fire":
      return "catches on Fire, Burning";
    case "Water":
      return "becomes Poisoned, losing";
    case "Air":
      return "starts Suffocating, losing";
    case "Necromancy":
      return "starts Bleeding, losing";
    default:
      return "applies damaging condition";
  }
}

function thwartStat(domain) {
  switch (domain) {
    case "Fire":
      return "Dexterity";
    case "Water":
      return "Strength";
    case "Earth":
      return "Strength"
    case "Air":
      return "Dexterity";
    case "Necromancy":
      return "Empathy";
    case "Holy":
      return "Empathy";
    case "Mind":
      return "Intelligence";
    case "Illusion":
      return "Intelligence";
    default:
      return "Statistic";
  }
}

const rangeMeters = (tier) => {
  let meters = 0

  for (let i = 0; i < tier; i++) {
    if (i < 5) {
      meters += 10
    } else if (i < 10) {
      meters += 100
    } else {
      meters += 1000
    }
  }

  return meters;
}


const aoeArea = (tier) => {
  let area = 0;

  for (let i = 0; i < tier; i++) {
    if (i < 10) {
      area += 10
    } else if (i < 20) {
      area += 100
    } else if (i < 30) {
      area += 1000
    } else {
      area += 10000
    }
  }

  // double area if aura is selected
  const { selectedModifiers } = modifiers;
  const modList = get(selectedModifiers)
  if (modList.filter(mod => mod.name === "Aura").length > 0) {
    area *= 2;
  }

  // double area if water is selected
  const { selectedDomain } = meta;
  const domain = get(selectedDomain);
  if (domain === "Water") {
    area *= 2;
  }

  return area;
}

function radiusCalc(tier) {
  let area = aoeArea(tier);
  let radius = Math.sqrt(area / Math.PI);

  return Math.ceil(radius);
}

function rectWidthCalc(tier, notes) {
  let area = aoeArea(tier);
  try {
    let width = area / parseInt(notes);
    return Math.ceil(width);
  } catch (error) {
    return "Enter a Number into notes";
  }
}

function coneHeightCalc(tier, notes) {
  let area = aoeArea(tier);
  try {
    let height = 2 * area / parseInt(notes);
    return Math.ceil(height);
  } catch (error) {
    return "Enter a Number into notes";
  }
}

// this is used to dynamically evaluate functions while maintaining their name in minified builds
const functionMap = {
  'calcComponentCost': calcComponentCost,
  'elementAmount': elementAmount,
  'movementConditionDesc': movementConditionDesc,
  'light': light,
  'noise': noise,
  'sound': sound,
  'volume': volume,
  'sense': sense,
  'thoughts': thoughts,
  'comms': comms,
  'temporaryBodySideEffect': temporaryBodySideEffect,
  'damagingCondition': damagingCondition,
  'thwartStat': thwartStat,
  'rangeMeters': rangeMeters,
  'aoeArea': aoeArea,
  'radiusCalc': radiusCalc,
  'rectWidthCalc': rectWidthCalc,
  'coneHeightCalc': coneHeightCalc,
  'halfTime': halftime
}

export function calculateDescription(spell, effect) {

  const SPCost = 10;

  let formattedDescription = effect.description;
  let evalMatch = formattedDescription.match(/\[(.*?)\]/g);

  if (evalMatch) {
    evalMatch.forEach(e => {
      let evalString = e;
      evalString = evalString.replace("tier", "effect.tier");
      evalString = evalString.replace("notes", "effect.notes");
      evalString = evalString.replace("domain", "spell.domain");
      // evalString = evalString.replace("cost", calcSpellCost(SPCost));
      // evalString = evalString.replace("resist", calcSpellResist(SPCost));
      evalString = evalString.replace("[", "");
      evalString = evalString.replace("]", "");
      let evalResult = ""

      try {
        evalResult = eval(evalString);
      } catch (error) {
        console.warn('evalMatch: could not eval:', evalString);
        evalResult = `Error ${error}`;
      }
      formattedDescription = formattedDescription.replace(e, evalResult);
    });
  }

  let funcMatch = formattedDescription.match(/\{(.*?)\}/g);

  if (funcMatch) {
    funcMatch.forEach(e => {
      let evalString = e;
      evalString = evalString.replace("{", "");
      evalString = evalString.replace("}", "");
      if (spell.domain)
        evalString = evalString.replace(spell.domain, "'" + spell.domain + "'")

      Object.keys(functionMap).forEach(key => {
        evalString = evalString.replace(key, functionMap[key].name);
      })
      let evalResult = ""

      try {
        evalResult = eval(evalString);
      } catch (error) {
        console.warn('funcMatch: could not eval:', evalString);
        evalResult = `Error ${error}`;
      }

      formattedDescription = formattedDescription.replace(e, evalResult);
    });
  }


  return formattedDescription;
}