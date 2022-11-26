export function thwartStat(domain) {
  switch (domain) {
    case "Fire":
      return "Dexterity";
    case "Water":
      return "Strength";
    case "Earth":
      return "Strength";
    case "Air":
      return "Dexterity";
    case "Necromancy":
      return "Empathy";
    case "Holy":
      return "Empathy";
    case "Mind":
      return "Intelligence";
    case "Illusion":
      return "Intelligence";
    default:
      return "Statistic";
  }
}
