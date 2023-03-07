import type { Spell, CombinedEffect, CombinedModifier } from "../../../../types/types";
import { availableEffectsById } from "../data/effects";
import { availableModifiersById } from "../data/modifiers";


export const getCombinedEffects = (spell: Spell): CombinedEffect[] => {
  return spell.selected_effects.map((selected_effect) => {
    const effect = availableEffectsById[selected_effect.id];
    return { ...selected_effect, ...effect };
  });
};

export const getCombinedModifiers = (spell: Spell): CombinedModifier[] => {
  return spell.selected_modifiers.map((selected_modifier) => {
    const modifier = availableModifiersById[selected_modifier.id];
    return { ...selected_modifier, ...modifier };
  });
};
