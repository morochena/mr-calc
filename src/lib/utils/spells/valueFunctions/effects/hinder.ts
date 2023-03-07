
export const hinder = (tier: number) => {
  let sum = 0;
  for (let i = 1; i <= tier; i++) {
    sum += i;
  }
  return sum;
};
