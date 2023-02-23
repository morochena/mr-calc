export function rangeMeters(tier: number) {
  let meters = 0;

  for (let i = 0; i < tier; i++) {
    if (i < 5) {
      meters += 10;
    } else if (i < 10) {
      meters += 100;
    } else {
      meters += 1000;
    }
  }

  return meters;
}
