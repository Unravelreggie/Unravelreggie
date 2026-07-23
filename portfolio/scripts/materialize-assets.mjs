import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const assetsDirectory = new URL("../public/assets/", import.meta.url);
const partPattern = /^(.*)\.b64\.(\d+)$/;
const groupedParts = new Map();

for (const filename of readdirSync(assetsDirectory)) {
  const match = filename.match(partPattern);
  if (!match) continue;
  const [, outputName] = match;
  const parts = groupedParts.get(outputName) ?? [];
  parts.push(filename);
  groupedParts.set(outputName, parts);
}

for (const [outputName, parts] of groupedParts) {
  const outputPath = join(assetsDirectory.pathname, outputName);
  if (existsSync(outputPath)) continue;

  const encoded = parts
    .sort()
    .map((part) => readFileSync(join(assetsDirectory.pathname, part), "utf8").trim())
    .join("");

  writeFileSync(outputPath, Buffer.from(encoded, "base64"));
  console.log(`Materialized public/assets/${outputName}`);
}
