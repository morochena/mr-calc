import { get } from 'svelte/store'
import { currentSpell } from "$lib/stores/currentSpellStore"

export function halftime() {
  const spell = get(currentSpell)
  const modifiers = spell.spell_data.modifiers

  const lastingModifiers = modifiers.filter(mod => mod.name.includes("Lasting"))
  if (lastingModifiers.length < 1) {
    return "Lasting modifier not found";
  }

  const lastingModifier = lastingModifiers[0];

  const unitMatch = lastingModifier.name.match(/\((.*?)\)/g);
  if (!unitMatch) {
    return "Lasting modifier not found";
  }

  const unit = unitMatch[0];

  if (!lastingModifier.tier) {
    return "no tier set";
  }

  if (unit.includes("Rounds")) {
    const time = Math.ceil((lastingModifier.tier + 1) / 2);
    return time + " " + unit;
  } else {
    const time = (lastingModifier.tier) / 2;

    return time + " " + unit;
  }
}
