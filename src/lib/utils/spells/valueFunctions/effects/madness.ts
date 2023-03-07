
export const madness = (tier: number) => {
  switch (tier) {
    case 1:
      return 20;
    case 2:
      return 25;
    case 3:
    default:
      return 30;
  }
};
