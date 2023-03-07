import { calculateSpellCost } from "./calculateSpellCost";
import type { ModifierOrEffect, Spell } from "../../../../types/types";
import { calculateSpellResist } from "./calculateSpellResist";

export const calculateMOEDescription = (spell: Spell, moe: ModifierOrEffect) => {
  let formattedDescription = moe.description;
  let evalMatch = formattedDescription.match(/\[(.*?)\]/g);

  if (evalMatch) {
    evalMatch.forEach(e => {
      let evalString = e;
      evalString = evalString.replace("tier", "moe.tier");
      evalString = evalString.replace("notes", "moe.notes");
      evalString = evalString.replace("domain", "spell.domain");
      evalString = evalString.replace("cost", String(calculateSpellCost(spell)));
      evalString = evalString.replace("resist", String(calculateSpellResist(spell)));
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

  // evalulate each array of functions, eg. [func1, func2, func3] with params spell and moe
  // then replace each key with the result, eg. "sample description {1} {2} -> "sample description <result1> <result2>"
  moe.descriptionFunctions?.forEach((func: Function, index: number) => {
    const result = func(spell, moe);
    formattedDescription = formattedDescription.replace(`{${index + 1}}`, result);
  })

  return formattedDescription;
}

