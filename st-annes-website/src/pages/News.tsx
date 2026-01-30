import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { useObserveReveal } from "@/lib/useScrollReveal";
import newssheetsData from "@/data/newssheets.json";

type NewssheetEntry = { label: string; date: string; url: string };

/** Group newssheets by "Month Year" (e.g. "February 2026"). */
function groupByMonth(newssheets: NewssheetEntry[]): Map<string, NewssheetEntry[]> {
  const byMonth = new Map<string, NewssheetEntry[]>();
  for (const entry of newssheets) {
    const [, month, year] = entry.label.split(" ");
    const key = `${month} ${year}`;
    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key)!.push(entry);
  }
  return byMonth;
}

/** Sort month keys: most recent first (e.g. February 2026, January 2026). */
const MONTH_ORDER = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
function sortMonthKeys(keys: string[]): string[] {
  return keys.sort((a, b) => {
    const [monthA, yearA] = a.split(" ");
    const [monthB, yearB] = b.split(" ");
    const yA = parseInt(yearA, 10);
    const yB = parseInt(yearB, 10);
    if (yA !== yB) return yB - yA;
    const mA = MONTH_ORDER.indexOf(monthA);
    const mB = MONTH_ORDER.indexOf(monthB);
    return mB - mA;
  });
}

export default function News() {
  const containerRef = useObserveReveal();

  const newssheetsByMonth = useMemo(() => {
    const grouped = groupByMonth(newssheetsData as NewssheetEntry[]);
    const keys = sortMonthKeys([...grouped.keys()]);
    return keys.map((key) => ({ monthLabel: key, entries: grouped.get(key)! }));
  }, []);

  return (
    <div ref={containerRef} className="container mx-auto px-4 sm:px-6 pt-8 pb-24">
      <h1 className="text-section_title mb-4">News</h1>
      <p className="text-muted-foreground max-w-2xl mb-12">
        Weekly newssheets and parish magazines from St. Anne's. Open any link to view the PDF on the church website.
      </p>

      <div className="grid gap-10 lg:grid-cols-5 max-w-6xl">
        {/* Weekly Newssheet — full-width intro + all newssheets by month */}
        <div className="lg:col-span-3 space-y-8">
          <Card className="reveal-on-scroll">
            <CardHeader>
              <CardTitle>Weekly Newssheet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                The Weekly Newssheet gives details of worship and current events at St. Anne's. Choose a date below to open the PDF.
              </p>
            </CardContent>
          </Card>

          <section className="reveal-on-scroll" aria-label="Newssheets by month">
            <div className="rounded-2xl border border-border/80 bg-card shadow-card overflow-hidden">
              {newssheetsByMonth.map(({ monthLabel, entries }) => (
                <details
                  key={monthLabel}
                  className="group border-b border-border/80 last:border-b-0"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left font-display text-lg font-semibold text-foreground transition-colors hover:bg-muted/50 [&::-webkit-details-marker]:hidden">
                    <span>{monthLabel}</span>
                    <ChevronDown
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                    />
                  </summary>
                  <div className="border-t border-border/60 bg-muted/30 px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      {entries.map((entry) => {
                        const dayNum = parseInt(entry.label.split(" ")[0], 10);
                        const suffix = dayNum === 1 || dayNum === 21 || dayNum === 31 ? "st" : dayNum === 2 || dayNum === 22 ? "nd" : dayNum === 3 || dayNum === 23 ? "rd" : "th";
                        const dayLabel = `${dayNum}${suffix}`;
                        return (
                          <a
                            key={entry.date}
                            href={entry.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={entry.label}
                            className="inline-flex items-center rounded-full border border-primary/40 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/15 hover:border-primary/60"
                          >
                            {dayLabel}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* Hatch Herald / St Anne's Record — sidebar card, varied style */}
        <div className="lg:col-span-2">
          <Card className="reveal-on-scroll border-primary/20 bg-primary/5 sticky top-28">
            <CardHeader>
              <CardTitle>St Anne's Record / Hatch Herald</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                The Hatch Herald was the parish magazine; it has been superseded by St Anne's Record, a bi-monthly newssheet. Past issues are available in PDF format on the church website.
              </p>
              <a
                href="https://www.stannee4.org.uk/HHerald.php"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border-2 border-primary bg-transparent px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
              >
                View Hatch Herald & Record
              </a>
              <p className="mt-4 text-xs text-muted-foreground">
                To view PDFs you will need Acrobat Reader installed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
