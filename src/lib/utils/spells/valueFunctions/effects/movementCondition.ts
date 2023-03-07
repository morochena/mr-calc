
export const movementCondition = (tier: number) => {
  switch (tier) {
    case 1:
      return 3;
    case 2:
      return 6;
    case 3:
    default:
      return 12;
  }
};
