export function damagingCondition(domain) {
  switch (domain) {
    case "Fire":
      return "catches on Fire, Burning";
    case "Water":
      return "becomes Poisoned, losing";
    case "Air":
      return "starts Suffocating, losing";
    case "Necromancy":
      return "starts Bleeding, losing";
    default:
      return "applies damaging condition";
  }
}
