import { get } from 'svelte/store'
import { currentSpell } from "$lib/stores/currentSpellStore"

export function halftime() {

  const spell = get(currentSpell)
  const modifiers = spell.spell_data.modifiers

  const modList = modifiers.filter(mod => mod.name.includes("Lasting"));
  if (modList.length <= 0) {
    return "Lasting modifier not found";
  }

  const increment = modList[0].name.match(/\((.*?)\)/g)[0];
  if (increment.includes("Rounds")) {
    const time = Math.ceil((modList[0].tier + 1) / 2);
    return time + " " + increment;
  }
  else {
    const time = (modList[0].tier) / 2;
    return time + " " + increment;
  }
}
