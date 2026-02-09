import { getCommitStats } from "../src/github.js";
import { getPetState } from "../src/pet.js";
import { renderSVG } from "../src/renderer.js";
import { writeSVG } from "../src/writer.js";

const stats = await getCommitStats(7);
const state = getPetState(stats);
const svg = renderSVG(state);
const path = writeSVG(svg);

console.log(`✅ SVG 생성 완료: ${path}`);
console.log(`📐 상태: ${state.stage} / ${state.mood} / Lv.${state.level}`);
