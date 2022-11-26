export function temporaryBodySideEffect(domain) {
  switch (domain) {
    case "Holy":
      return "starts glowing with holy protection";
    case "Earth":
      return "hardens with rocks, reducing their move by 1m, run by 2m and sprint by 4m";
    case "Nature":
      return " grows thicker skin and starts resembling a beast with natural toughness";
    case "Necromancy":
      return "grows painful bony protrusions and leathery fur, harming their mind by 1d10 points once upon spell cast, the points come back";
    default:
      return "applies damaging condition";
  }
}
