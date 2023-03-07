
export const plague = (tier: number) => {
  switch (tier) {
    case 1:
      return 10;
    case 2:
      return 12;
    case 3:
    default:
      return 15;
  }
};
