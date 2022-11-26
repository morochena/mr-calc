export function light(tier) {
  if (tier == 1) {
    return "a small room with light";
  }
  else if (tier < 5) {
    return "as bright as daylight";
  }
  else if (tier < 10) {
    return "intensely, causing blindness for 1 round for everyone looking at the light in a previously dark room at a distance of " + 10 * (tier - 4) + "m";
  }
  else {
    return "intensely, causing blindness for 1 round for everyone looking at the light in a previously dark room at a distance of " + 10 * (tier - 4) + "m and in a previously lit room to a distance of " + 10 * (tier - 9) + "m";
  }
}
