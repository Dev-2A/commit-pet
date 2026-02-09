import { getCommitStats } from "../src/github.js";
import { getPetState, describeState } from "../src/pet.js";

const stats = await getCommitStats(7);
const state = getPetState(stats);

console.log("🐾 내 커밋 펫 상태:");
console.log("─".repeat(24));
console.log(describeState(state));
