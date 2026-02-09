/**
 * 🥚 알 — 모든 mood에서 같은 모양 (아직 감정 표현 없음)
 */
const egg = {
  happy: [
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000KK0000000",
    "00000KWWWK000000",
    "0000KWWWWWK00000",
    "000KWWYWWWWK0000",
    "000KWWWWYWWK0000",
    "00KWWWWWWWWWK000",
    "00KWWWWWWWWWK000",
    "00KWWYWWYWWWK000",
    "00KWWWWWWWWWK000",
    "000KWWWWWWWK0000",
    "0000KKKKKK00000",
    "0000000000000000",
    "0000000000000000",
  ],
  normal: null, // happy와 동일
  hungry: null,
  sleeping: null,
};

// null인 mood는 happy를 복사
for (const mood of ["normal", "hungry", "sleeping"]) {
  if (!egg[mood]) egg[mood] = egg.happy;
}

export default egg;
