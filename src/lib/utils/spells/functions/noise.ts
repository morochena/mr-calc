export function noise(tier) {
  if (tier < 4) {
    return 90 + 10 * tier + " DB";
  }
  else if (tier < 8) {
    return 110 + 5 * tier + " DB";
  }
  else {
    return ">150DB causing deafness for 1 round at a distance of " + 10 * (tier - 7) + "m";
  }
}
