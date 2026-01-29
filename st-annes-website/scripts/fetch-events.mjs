/**
 * Fetches events from https://www.stannee4.org.uk/events.php and writes
 * src/data/events.json. Run before build to refresh: npm run fetch-events
 */
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const EVENTS_URL = "https://www.stannee4.org.uk/events.php";
const OUTPUT_PATH = join(__dirname, "../src/data/events.json");

function normalizeTime(raw) {
  const t = raw.trim().replace(/\s+/g, " ");
  const match = t.match(/^(\d{1,2})\s*(\d{2})\s*(AM|PM)$/i);
  if (match) return `${match[1]}:${match[2]} ${match[3].toUpperCase()}`;
  return t;
}

async function fetchEvents() {
  const res = await fetch(EVENTS_URL);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  const html = await res.text();

  const events = [];
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let rowMatch;
  while ((rowMatch = rowRegex.exec(html)) !== null) {
    const row = rowMatch[1];
    const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    const cells = [];
    let cellMatch;
    while ((cellMatch = cellRegex.exec(row)) !== null) {
      cells.push(cellMatch[1].replace(/<[^>]+>/g, "").trim());
    }
    if (cells.length >= 4) {
      const [day, date, time, title] = cells;
      if (/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/i.test(day) && title) {
        events.push({
          day,
          date,
          time: normalizeTime(time),
          title,
        });
      }
    }
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(events, null, 2), "utf8");
  console.log(`Wrote ${events.length} events to ${OUTPUT_PATH}`);
}

fetchEvents().catch((err) => {
  console.error(err);
  process.exit(1);
});
