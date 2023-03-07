
export const help = (tier: number) => {
  let sum = 0;
  for (let i = 1; i <= tier; i++) {
    sum += i;
  }
  sum *= 2;
  return sum;
};
