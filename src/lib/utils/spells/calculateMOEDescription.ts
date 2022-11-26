import { aoeArea } from "./functions/aoeArea";
import { calcComponentCost } from "./functions/calcComponentCost";
import { comms } from "./functions/comms";
import { coneHeightCalc } from "./functions/coneHeightCalc";
import { damagingCondition } from "./functions/damagingCondition";
import { elementAmount } from "./functions/elementAmount";
import { halftime } from "./functions/halftime";
import { light } from "./functions/light";
import { movementConditionDesc } from "./functions/movementConditionDesc";
import { noise } from "./functions/noise";
import { radiusCalc } from "./functions/radiusCalc";
import { rangeMeters } from "./functions/rangeMeters";
import { rectWidthCalc } from "./functions/rectWidthCalc";
import { sense } from "./functions/sense";
import { sound } from "./functions/sound";
import { temporaryBodySideEffect } from "./functions/temporaryBodySideEffect";
import { thoughts } from "./functions/thoughts";
import { thwartStat } from "./functions/thwartStat";
import { volume } from "./functions/volume";

import { currentSpell } from "$lib/stores/currentSpellStore";
import { calculateSpellCost } from "./calculateSpellCost";

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
  'halftime': halftime
}

export const calculateMOEDescription = (spell, moe) => {
  let formattedDescription = moe.description;
  let evalMatch = formattedDescription.match(/\[(.*?)\]/g);

  // this is highly unfortunate, but some modifiers and effects reference other modififers so we need to set the spell here 
  // so that the functions can access it
  currentSpell.set(spell)

  if (evalMatch) {
    evalMatch.forEach(e => {
      let evalString = e;
      evalString = evalString.replace("tier", "moe.tier");
      evalString = evalString.replace("notes", "moe.notes");
      evalString = evalString.replace("domain", "spell.spell_data.domain");
      evalString = evalString.replace("cost", calculateSpellCost(spell));
      evalString = evalString.replace("resist", calcSpellResist(spell));
      evalString = evalString.replace("[", "");
      evalString = evalString.replace("]", "");
      let evalResult = ""

      try {
        evalResult = eval(evalString);
      } catch (error) {
        console.warn('evalMatch: could not eval:', evalString);
        console.warn(moe)
        console.warn(error.message)
        console.warn("--------------------------------")
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

      if (spell.spell_data.domain)
        evalString = evalString.replace(spell.spell_data.domain, "'" + spell.spell_data.domain + "'")

      Object.keys(functionMap).forEach(key => {
        evalString = evalString.replace(key, functionMap[key].name);
      })
      let evalResult = ""

      try {
        evalResult = eval(evalString);
      } catch (error) {
        console.warn('funcMatch: could not eval:', evalString);
        console.warn("original moe", moe)
        console.warn(error.message)
        console.warn("--------------------------------")
        evalResult = `Error ${error}`;
      }

      formattedDescription = formattedDescription.replace(e, evalResult);
    });
  }


  return formattedDescription;
}

function calcSpellResist(spell) {
  return calculateSpellCost(spell) + 5;
}