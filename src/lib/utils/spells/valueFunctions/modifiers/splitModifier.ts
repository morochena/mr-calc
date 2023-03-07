
export const splitModifier = (tier: number) => {
  if (tier == 1)
    return 8;
  if (tier == 2)
    return 15;
  if (tier == 3)
    return 27;
  if (tier == 4)
    return 40;
  if (tier > 4)
    return tier * 10;
};
