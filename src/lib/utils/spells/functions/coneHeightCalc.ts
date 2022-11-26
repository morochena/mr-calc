import { aoeArea } from "./aoeArea";

export function coneHeightCalc(tier, notes) {
  let area = aoeArea(tier);
  try {
    let height = 2 * area / parseInt(notes);
    return Math.ceil(height);
  } catch (error) {
    return "Enter a Number into notes";
  }
}
