import { elementAmount } from "./functions/elementAmount";
import { calcComponentCost } from "./functions/calcComponentCost";
import { movementConditionDesc } from "./functions/movementConditionDesc";
import { light } from "./functions/light";
import { noise } from "./functions/noise";
import { sound } from "./functions/sound";
import { volume } from "./functions/volume";
import { sense } from "./functions/sense";
import { thoughts } from "./functions/thoughts";
import { comms } from "./functions/comms";
import { temporaryBodySideEffect } from "./functions/temporaryBodySideEffect";
import { damagingCondition } from "./functions/damagingCondition";
import { thwartStat } from "./functions/thwartStat";
import { rangeMeters } from "./functions/rangeMeters";
import { radiusCalc } from "./functions/radiusCalc";
import { rectWidthCalc } from "./functions/rectWidthCalc";
import { coneHeightCalc } from "./functions/coneHeightCalc";
import { aoeArea } from "./functions/aoeArea";
import { halftime } from "./functions/halftime";

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


export const calculateMOEDescription = (spell, effect) => {
  let formattedDescription = effect.description;
  let evalMatch = formattedDescription.match(/\[(.*?)\]/g);

  if (evalMatch) {
    evalMatch.forEach(e => {
      let evalString = e;
      evalString = evalString.replace("tier", "effect.tier");
      evalString = evalString.replace("notes", "effect.notes");
      evalString = evalString.replace("domain", "spell.domain");
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


