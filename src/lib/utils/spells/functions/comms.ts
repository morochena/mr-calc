export function comms(tier) {
  switch (tier) {
    case 1:
      return "words";
    case 2:
      return "music, sounds, words or images";
    case 3:
      return "dreams";
    default:
      return "subconscious";
  }
}
