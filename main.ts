// One-Liner Marathon entry: writes a single original one-line joke to
// /output/entry.txt. The joke must be exactly one line, 1-280 characters,
// non-blank UTF-8 text, or the program refuses to write it.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const JOKE =
  "I bought a houseplant to prove I could keep something alive, and now we just sit there pretending the other one isn't dying.";

const OUT = "/output/entry.txt";

function selfCheck(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 280) {
    throw new Error(`entry must be 1-280 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be exactly one line (no line breaks)");
  }
}

selfCheck(JOKE);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JOKE, "utf8");
// Read back and re-check what actually landed on disk.
import { readFileSync } from "node:fs";
const written = readFileSync(OUT, "utf8");
if (written !== JOKE) {
  throw new Error("verification failed: /output/entry.txt differs from the joke");
}
selfCheck(written);
console.log(`wrote ${[...JOKE].length} characters to ${OUT}`);
