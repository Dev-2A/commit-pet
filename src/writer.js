import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "..", "output");

/**
 * SVG 문자열을 파일로 저장
 * @param {string} svg - SVG 문자열
 * @param {string} filename - 파일명 (기본: commit-pet.svg)
 * @returns {string} 저장된 파일 경로
 */
export function writeSVG(svg, filename = "commit-pet.svg") {
  const filepath = join(OUTPUT_DIR, filename);
  writeFileSync(filepath, svg, "utf-8");
  return filepath;
}
