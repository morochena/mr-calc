import type { Domain } from "../../../../../types/fromSupabase";

export function elementAmount(tier: number, domain: Domain) {
  switch (domain) {
    case "Fire":
      switch (tier) {
        case 1:
          return "A spark of flames (300 Celcius)";
        case 2:
          return "a roaring fire (750 Celcius)";
        default:
        case 3:
          return "a blazing inferno (1200 Celcius), automatically applying On Fire Condition";
      }
    case "Water":
      switch (tier) {
        case 1:
          return "a drop of water";
        case 2:
          return "a liter of water";
        default:
        case 3:
          return "20 liters of water";
      }
    case "Earth":
      switch (tier) {
        case 1:
          return "a handful of dirt";
        case 2:
          return "1kg of top soil or rock";
        default:
        case 3:
          return "20kg of top soil or rock";
      }
    case "Air":
      switch (tier) {
        case 1:
          return "a gasp of air";
        case 2:
          return "a cubic meter of Air";
        default:
        case 3:
          return "10 cubic meters of Air";
      }
    default:
      return "Element";
  }
}
