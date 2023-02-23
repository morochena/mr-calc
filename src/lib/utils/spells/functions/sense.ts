export function sense(tier: number) {
  switch (tier) {
    case 1:
      return "nonspecific";
    case 2:
      return ", a category of";
    case 3:
      return ", specifically";
    default:
      return "nonsense";
  }
}
