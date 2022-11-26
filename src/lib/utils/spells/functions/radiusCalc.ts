import { aoeArea } from "./aoeArea";

export function radiusCalc(tier) {
  let area = aoeArea(tier);
  let radius = Math.sqrt(area / Math.PI);

  return Math.ceil(radius);
}
