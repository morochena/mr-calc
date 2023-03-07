
export const geas = (tier: number) => {
  switch (tier) {
    case 1:
      return 3;
    case 2:
      return 6;
    case 3:
      return 9;
    default:
      return 15;
  }
};
