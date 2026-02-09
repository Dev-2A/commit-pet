import { getSprite } from "./sprites/index.js";

const PIXEL_SIZE = 10; // 도트 1칸의 실제 크기 (px)
const GRID_SIZE = 16; // 스프라이트 가로세로 칸 수
const CANVAS = GRID_SIZE * PIXEL_SIZE; // 160px

// 상태바 영역
const BAR_HEIGHT = 40;
const PADDING = 12;
const TOTAL_HEIGHT = CANVAS + BAR_HEIGHT + PADDING * 2;
const TOTAL_WIDTH = CANVAS + PADDING * 2;

/**
 * 펫 상태를 SVG 문자열로 렌더링
 * @param {{ stage: string, mood: string, level: number, stats: object }} state
 * @returns {string} SVG 문자열
 */
export function renderSVG(state) {
  const { stage, mood, level, stats } = state;
  const { pixels, palette } = getSprite(stage, mood);

  const pixelRects = renderPixels(pixels, palette);
  const statusBar = renderStatusBar(stage, mood, level, stats);
  const background = renderBackground(mood);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${TOTAL_WIDTH}" height="${TOTAL_HEIGHT}" viewBox="0 0 ${TOTAL_WIDTH} ${TOTAL_HEIGHT}">
  <style>
    .label { font: bold 11px 'Segoe UI', 'Noto Sans KR', sans-serif; fill: #333; }
    .value { font: 11px 'Segoe UI', 'Noto Sans KR', sans-serif; fill: #555; }
    .title { font: bold 13px 'Segoe UI', 'Noto Sans KR', sans-serif; fill: #222; }
  </style>

  <!-- 배경 -->
  <rect width="${TOTAL_WIDTH}" height="${TOTAL_HEIGHT}" rx="12" fill="${background}" />

  <!-- 테두리 -->
  <rect width="${TOTAL_WIDTH}" height="${TOTAL_HEIGHT}" rx="12" fill="none" stroke="#ddd" stroke-width="1" />

  <!-- 펫 스프라이트 -->
  <g transform="translate(${PADDING}, ${PADDING})">
    ${pixelRects}
  </g>

  <!-- 상태 정보 -->
  <g transform="translate(${PADDING}, ${CANVAS + PADDING + 4})">
    ${statusBar}
  </g>
  </svg>`;
}

/**
 * 픽셀 데이터를 SVG rect 요소로 변환
 */
function renderPixels(pixels, palette) {
  const rects = [];

  for (let y = 0; y < pixels.length; y++) {
    const row = pixels[y];
    for (let x = 0; x < row.length; x++) {
      const char = row[x];
      if (char === "0") continue;

      const color = palette[char];
      if (!color || color === "transparent") continue;

      rects.push(
        `<rect x="${x * PIXEL_SIZE}" y="${y * PIXEL_SIZE}" width="${PIXEL_SIZE}" height="${PIXEL_SIZE}" fill="${color}" />`,
      );
    }
  }

  return rects.join("\n    ");
}

/**
 * 하단 상태 바 렌더링
 */
function renderStatusBar(stage, mood, level, stats) {
  const stageEmoji = { egg: "🥚", baby: "🐣", teen: "🐥", adult: "🐔" };
  const moodEmoji = { happy: "😆", normal: "🙂", hungry: "😿", sleeping: "😴" };

  return `
    <text x="0" y="12" class="title">${stageEmoji[stage] || "?"} Lv.${level} 커밋펫</text>
    <text x="0" y="30" class="value">${moodEmoji[mood] || "?"} 오늘 ${stats.today}커밋 · ${stats.streak}일 연속 · 주간 ${stats.total}커밋</text>
  `;
}

/**
 * 기분에 따른 배경색
 */
function renderBackground(mood) {
  const colors = {
    happy: "#FFFBE6",
    normal: "#F0F4F8",
    hungry: "#FFF0E6",
    sleeping: "#EEEEFF",
  };
  return colors[mood] || colors.normal;
}
