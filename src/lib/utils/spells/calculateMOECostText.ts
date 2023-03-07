import type { ModifierOrEffect } from "../../../../types/types";
import { createElement, movementCondition, geas, sound, plague, madness, help, hinder, illusion, warplight } from "../data/effects";
import { aoeModifier, componentModifier, lastingModifier, rangeModifier, splitModifier } from "../data/modifiers";

export const calculateMOECostText = (moe: ModifierOrEffect) => {
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
      amount = evalCost(moe);
      operator = amount > 0 ? "+" : "";
      return `${operator}${amount}`;
    case "functionMultiply":
      amount = evalCost(moe)[0];
      operator = amount > 0 ? "+" : "";
      return `x${evalCost(moe)[1]} and ${operator}${evalCost(moe)[0]
        }`;
  }
};

const evalCost = (moe: ModifierOrEffect) => {
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