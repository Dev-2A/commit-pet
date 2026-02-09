import egg from "./egg.js";
import baby from "./baby.js";
import teen from "./teen.js";
import adult from "./adult.js";
import palette from "./palette.js";

const sprites = { egg, baby, teen, adult };

/**
 * stage + mood 조합으로 스프라이트 데이터를 가져옴
 * @param {string} stage - egg | baby | teen | adult
 * @param {string} mood - happy | normal | hungry | sleeping
 * @returns {{ pixels: string[], palette: object }}
 */
export function getSprite(stage, mood) {
  const stageData = sprites[stage];
  if (!stageData) throw new Error(`Unknown stage: ${stage}`);

  const pixels = stageData[mood] || stageData.normal || stageData.happy;
  return { pixels, palette };
}

export { palette };
