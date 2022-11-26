export function movementConditionDesc(tier) {
  switch (tier) {
    case 1:
      return "unable to Run";
    case 2:
      return "only able to use 1 Move action a turn";
    case 3:
    default:
      return "unable to move at all";
  }
}
