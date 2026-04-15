import { DIRECTION, ROTATION } from "@/constants/character";
import { CharacterStats } from "@/types/character";
import { ATTACK_TIME } from "./attack";

// export const getInputState = (
//   key: string,
//   stats: CharacterStats
// ): CharacterStats => {
//   switch (key) {
//     case "a":
//     case "arrowleft":
//       return { ...stats, rotation: ROTATION.LEFT };

//     case "d":
//     case "arrowright":
//       return { ...stats, rotation: ROTATION.RIGHT };

//     case "w":
//     case "arrowup":
//       return { ...stats, direction: DIRECTION.FORWARD };

//     case "s":
//     case "arrowdown":
//       return { ...stats, direction: DIRECTION.BACKWARD };

//     case "e":
//       if (stats.attackCooldown) return stats;
//       return { ...stats, isAttack: true, attackCooldown: ATTACK_TIME };

//     default:
//       return stats;
//   }
// };

// export const getInputClearState = (key: string): Partial<CharacterStats> => {
//   switch (key) {
//     case "a":
//     case "arrowleft":
//     case "d":
//     case "arrowright":
//       return { rotation: ROTATION.NONE };

//     case "w":
//     case "arrowup":
//     case "s":
//     case "arrowdown":
//       return { direction: DIRECTION.NONE };

//     default:
//       return {};
//   }
// };
