
export function aoeArea(tier) {
  let area = 0;

  for (let i = 0; i < tier; i++) {
    if (i < 10) {
      area += 10;
    } else if (i < 20) {
      area += 100;
    } else if (i < 30) {
      area += 1000;
    } else {
      area += 10000;
    }
  }

  // double area if aura is selected
  const { selectedModifiers } = modifiers;
  const modList = get(selectedModifiers);
  if (modList.filter(mod => mod.name === "Aura").length > 0) {
    area *= 2;
  }

  // double area if water is selected
  const { selectedDomain } = meta;
  const domain = get(selectedDomain);
  if (domain === "Water") {
    area *= 2;
  }

  return area;
}
