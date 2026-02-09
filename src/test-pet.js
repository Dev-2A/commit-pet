import { getCommitStats } from "./github.js";
import { getPetState, describeState } from "./pet.js";

const stats = await getCommitStats(7);
const state = getPetState(stats);

console.log("🐾 내 커밋 펫 상태:");
console.log("─".repeat(24));
console.log(describeState(state));
