
export const sound = (tier: number) => {
  switch (tier) {
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      return 7;
    default:
      return 12;
  }
};
