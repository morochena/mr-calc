

export const calcSPCost = (spell) => {
  return 0
}

export const calcMentalCost = () => {

  return 0
}

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
