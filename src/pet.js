/**
 * 펫 상태 정의
 */
const STAGES = [
  { name: "egg", minTotal: 0 },
  { name: "baby", minTotal: 1 },
  { name: "teen", minTotal: 10 },
  { name: "adult", minTotal: 30 },
];

/**
 * 커밋 통계로부터 펫 상태를 계산
 * @param {{ total: number, today: number, streak: number }} stats
 * @returns {{ stage: string, mood: string, level: number, stats: object }}
 */
export function getPetState(stats) {
  const { total, today, streak } = stats;

  // 성장 단계 결정 (조건을 만족하는 가장 높은 단계)
  let stage = STAGES[0];
  for (const s of STAGES) {
    if (total >= s.minTotal) {
      stage = s;
    }
  }

  // 기분 결정
  let mood;
  if (today >= 3) {
    mood = "happy";
  } else if (today >= 1) {
    mood = "normal";
  } else if (streak >= 1) {
    mood = "hungry";
  } else {
    mood = "sleeping";
  }

  // 레벨 (total 커밋 수 기반, 최대 99)
  const level = Math.min(99, Math.floor(total / 3) + 1);

  return {
    stage: stage.name,
    mood,
    level,
    stats,
  };
}

/**
 * 상태를 사람이 읽을 수 있는 텍스트로 변환
 * @param {{ stage: string, mood: string, level: number, stats: object }} state
 * @returns {string}
 */
export function describeState(state) {
  const stageNames = {
    egg: "🥚 알",
    baby: "🐣 아기",
    teen: "🐥 청소년",
    adult: "🐔 성체",
  };

  const moodNames = {
    happy: "😆 신남",
    normal: "🙂 보통",
    hungry: "😿 배고픔",
    sleeping: "😴 잠듦",
  };

  return [
    `단계: ${stageNames[state.stage]}`,
    `기분: ${moodNames[state.mood]}`,
    `레벨: ${state.level}`,
    `최근 7일 커밋: ${state.stats.total}`,
    `오늘 커밋: ${state.stats.today}`,
    `연속: ${state.stats.streak}일`,
  ].join("\n");
}
