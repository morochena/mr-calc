import { aoeArea } from "./aoeArea";

export function rectWidthCalc(tier, notes) {
  let area = aoeArea(tier);
  try {
    let width = area / parseInt(notes);
    return Math.ceil(width);
  } catch (error) {
    return "Enter a Number into notes";
  }
}
