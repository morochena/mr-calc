import type { CombinedModifierOrEffect, ModifierOrEffect } from "../../../../types/types";
import { illusion } from "./valueFunctions/effects/illusion";
import { warplight } from "./valueFunctions/effects/warplight";
import { hinder } from "./valueFunctions/effects/hinder";
import { help } from "./valueFunctions/effects/help";
import { geas } from "./valueFunctions/effects/geas";
import { madness } from "./valueFunctions/effects/madness";
import { plague } from "./valueFunctions/effects/plague";
import { sound } from "./valueFunctions/effects/sound";
import { movementCondition } from "./valueFunctions/effects/movementCondition";
import { createElement } from "./valueFunctions/effects/createElement";
import { componentModifier } from "./valueFunctions/modifiers/componentModifier";
import { lastingModifier } from "./valueFunctions/modifiers/lastingModifier";
import { aoeModifier } from "./valueFunctions/modifiers/aoeModifier";
import { rangeModifier } from "./valueFunctions/modifiers/rangeModifier";
import { splitModifier } from "./valueFunctions/modifiers/splitModifier";

export const calculateMOECostText = (moe: CombinedModifierOrEffect) => {
  let truetier = moe.tier || 1;
  let amount;
  let operator;
  if (moe.domaintier) truetier -= moe.domaintier;

  switch (moe.modifierType) {
    case "add":
      return `+${moe.amount * truetier}`;
    case "reduce":
      return `${moe.amount * truetier * -1}`;
    case "multiply":
      return `x${moe.amount * truetier}`;
    case "function":
      amount = functionCost(moe);
      operator = amount > 0 ? "+" : "";
      return `${operator}${amount}`;
    case "functionMultiply":
      amount = functionCost(moe)[0];
      operator = amount > 0 ? "+" : "";
      return `x${functionCost(moe)[1]} and ${operator}${functionCost(moe)[0]
        }`;
  }
};

const functionCost = (moe: CombinedModifierOrEffect) => {
  let trueTier = moe.tier;
  if (moe.domaintier) trueTier -= moe.domaintier;

  switch (moe.amount) {
    case "splitModifier":
      return splitModifier(trueTier);
    case "rangeModifier":
      return rangeModifier(trueTier);
    case "aoeModifier":
      return aoeModifier(trueTier);
    case "lastingModifier":
      return lastingModifier(trueTier, moe.name);
    case "componentModifier":
      return componentModifier(trueTier);
    case "createElement":
      return createElement(trueTier);
    case "movementCondition":
      return movementCondition(trueTier);
    case "geas":
      return geas(trueTier);
    case "sound":
      return sound(trueTier);
    case "plague":
      return plague(trueTier);
    case "madness":
      return madness(trueTier);
    case "help":
      return help(trueTier);
    case "hinder":
      return hinder(trueTier);
    case "illusion":
      return illusion(trueTier);
    case "warplight":
      return warplight(trueTier);
  }

  console.warn("modifier case not handled: ", moe.amount);

  return 0;
};