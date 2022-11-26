import { calculateSpellCost } from "./calculateSpellCost";


export const calculateSpellDescription = (spell) => {
  const preamble = calculatePreamble(spell);


  return preamble;
}


// {craftedSpellPreamble(isAlchemyValue, isRunesmithValue, spellCost)}
// 			{$description}. The caster {verboseSpellMode($selectedMode)} that {#each processDomainModifiers($selectedDomain, $selectedModifiers) as modifier}
// 				{calculateDescription(modifier, $SPCost)} and&nbsp;
// 			{/each} the target {#each processDomainEffects($selectedMode, $selectedDomain, $selectedEffects) as effect}
// 				{calculateDescription(effect, $SPCost)}.&nbsp;
// 			{/each}


const calculatePreamble = (spell) => {
  const modifiers = spell.spell_data.modifiers;
  const spellCost = calculateSpellCost(spell).cost;
  const isAlchemy = spell.spell_data.isAlchemy;
  const isRunesmith = spell.spell_data.isRunesmith;

  let hours = spellCost;
  let days = 2;
  const alclist = modifiers.filter((mod) => mod.name.includes("brewing"));
  const runelist = modifiers.filter((mod) => mod.name.includes("crafting"));

  if (alclist.length > 0) {
    hours += alclist[0].tier;
  }
  if (runelist.length > 0) {
    days += runelist[0].tier;
  }

  if (isAlchemy)
    return (
      "This is an alchemical creation that takes a day to craft, which includes working on it for " +
      hours +
      " hours actively. Thereafter they can be used by anyone."
    );
  if (isRunesmith) {
    hours = days * hours;
    return (
      "This is an magical rune that takes " +
      hours +
      " in hours of intense labor to craft. Thereafter they can be used by anyone."
    );
  }
  return "";
}