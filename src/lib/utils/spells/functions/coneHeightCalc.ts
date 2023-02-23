import { aoeArea } from "./aoeArea";

export function coneHeightCalc(tier: number, notes: string) {
  const area = aoeArea(tier);
  try {
    const height = 2 * area / parseInt(notes);
    return Math.ceil(height);
  } catch (error) {
    return "Enter a Number into notes";
  }
}
