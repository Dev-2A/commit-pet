import { getSprite } from "./sprites/index.js";

const { pixels, palette } = getSprite("teen", "happy");

console.log("🎨 teen-happy 스프라이트:");
console.log(`캔버스 크기: ${pixels[0].length}×${pixels.length}`);
console.log(
  `사용 색상: ${[...new Set(pixels.join(""))].filter((c) => c !== "0").length}개`,
);
console.log("");

// 간이 미리보기 (터미널용)
for (const row of pixels) {
  const line = [...row].map((c) => (c === "0" ? "  " : "██")).join("");
  console.log(line);
}
