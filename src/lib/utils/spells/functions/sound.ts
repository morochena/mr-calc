export function sound(tier) {
  switch (tier) {
    case 1:
      return "heard during the spell casting or preparation";
    case 2:
      return "that you can conceptualize in your mind during spell casting or preparation";
    case 3:
    default:
      return "Generates entirely new based off some idea ";
  }
}
