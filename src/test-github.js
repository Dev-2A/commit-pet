import { getCommitStats } from "./github.js";

const stats = await getCommitStats(7);
console.log("📊 커밋 통계:");
console.log(`  최근 7일 총 커밋: ${stats.total}`);
console.log(`  오늘 커밋: ${stats.today}`);
console.log(`  연속 커밋: ${stats.streak}일`);