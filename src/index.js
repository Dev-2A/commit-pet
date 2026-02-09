import { getCommitStats } from "./github.js";
import { getPetState, describeState } from "./pet.js";
import { renderSVG } from "./renderer.js";
import { writeSVG } from "./writer.js";

async function main() {
  console.log("🐾 커밋펫 생성 시작...\n");

  // 1. GitHub 커밋 통계 조회
  console.log("📡 GitHub API 조회 중...");
  const stats = await getCommitStats(7);

  // 2. 펫 상태 계산
  const state = getPetState(stats);
  console.log("\n📊 펫 상태:");
  console.log(describeState(state));

  // 3. SVG 렌더링
  const svg = renderSVG(state);

  // 4. 파일 저장
  const path = writeSVG(svg);
  console.log(`\n✅ 저장 완료: ${path}`);
}

main().catch((err) => {
  console.error("❌ 에러 발생:", err.message);
  process.exit(1);
});
