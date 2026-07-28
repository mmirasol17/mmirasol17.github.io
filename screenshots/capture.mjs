// Project-preview screenshot generator.
//
// Loads each live app, frames the configured sections, and writes 1080x800
// webp previews into public/images/project-previews/. Reachable-but-failing
// sites are skipped (not fatal) so a local run still produces what it can while
// the CI run — with full network access — captures everything.
//
// Usage:
//   node screenshots/capture.mjs                 # all projects
//   node screenshots/capture.mjs lifelyze tunelyze   # only these project ids

import { chromium } from "playwright";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { captures } from "./config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "public", "images", "project-previews");
const VIEWPORT = { width: 1080, height: 800 };

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const only = process.argv.slice(2);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    reducedMotion: "reduce", // freeze CSS animations for stable frames
    colorScheme: "dark", // match the portfolio's dark aesthetic (sites that theme)
  });
  const page = await context.newPage();

  let written = 0;
  let skipped = 0;

  for (const cap of captures) {
    if (only.length && !only.includes(cap.project)) continue;

    try {
      await page.goto(cap.url, { waitUntil: "networkidle", timeout: 45000 });
    } catch (err) {
      console.warn(`SKIP ${cap.url} — ${err.message.split("\n")[0]}`);
      skipped += cap.shots.length;
      continue;
    }

    for (const shot of cap.shots) {
      try {
        if (shot.top) {
          await page.evaluate(() => window.scrollTo(0, 0));
        } else {
          // Place the section heading `margin` px from the top so the heading
          // and the demo below it are both framed (clearing the sticky navbar).
          const found = await page.evaluate(
            ({ text, margin }) => {
              const el = [...document.querySelectorAll("h1,h2,h3,h4,strong,p,span,div")].find((e) => {
                if (!e.textContent || !e.textContent.includes(text)) return false;
                const r = e.getBoundingClientRect();
                return r.height > 0 && r.height < 160; // the heading, not a giant wrapper
              });
              if (!el) return false;
              el.scrollIntoView({ block: "start" });
              window.scrollBy(0, -(margin || 90));
              return true;
            },
            { text: shot.text, margin: shot.margin }
          );
          if (!found) console.warn(`  section not found for ${shot.name}: "${shot.text}"`);
        }
        await page.waitForTimeout(shot.wait ?? 1800);

        const png = await page.screenshot(); // exactly VIEWPORT at DSF 1
        const outPath = path.join(OUT_DIR, `${shot.name}.webp`);
        await sharp(png).webp({ quality: 82 }).toFile(outPath);
        console.log(`captured ${shot.name}.webp`);
        written += 1;
      } catch (err) {
        console.warn(`SKIP ${shot.name} — ${err.message.split("\n")[0]}`);
        skipped += 1;
      }
    }
  }

  await browser.close();
  console.log(`\nDone: ${written} written, ${skipped} skipped.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
