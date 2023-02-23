import { aoeArea } from "./aoeArea";

export function rectWidthCalc(tier: number, notes: string) {
  const area = aoeArea(tier);
  try {
    const width = area / parseInt(notes);
    return Math.ceil(width);
  } catch (error) {
    return "Enter a Number into notes";
  }
}
