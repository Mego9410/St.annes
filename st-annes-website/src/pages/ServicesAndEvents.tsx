import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useObserveReveal } from "@/lib/useScrollReveal";
import eventsData from "@/data/events.json";
import specialServicesData from "@/data/specialServices.json";
import { Calendar, Church } from "lucide-react";

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

type EventItem = { day: string; date: string; time: string; title: string };

/** Sort key for "3rd February" style: month * 31 + day so we can sort all events chronologically. */
function sortKey(dateStr: string): number {
  const match = dateStr.match(/^(\d{1,2})(?:st|nd|rd|th)?\s+(\w+)$/);
  if (!match) return 0;
  const day = parseInt(match[1], 10);
  const monthIndex = MONTH_NAMES.findIndex((m) => m.toLowerCase().startsWith(match[2].toLowerCase()));
  if (monthIndex === -1) return 0;
  return monthIndex * 31 + day;
}

/** All events sorted by date (month then day). */
function allEventsSorted(events: EventItem[]): EventItem[] {
  return [...events].sort((a, b) => sortKey(a.date) - sortKey(b.date));
}

const weeklyServices = [
  { day: "Sunday", time: "10:00 AM", service: "Parish Eucharist" },
  { day: "Friday", time: "10:00 AM", service: "Holy Communion" },
];

const navLinks = [
  { href: "#weekly-services", label: "Weekly Services" },
  { href: "#special-services", label: "Special Services" },
  { href: "#events-diary", label: "Events Diary" },
];

export default function ServicesAndEvents() {
  const containerRef = useObserveReveal();
  const eventsSorted = useMemo(() => allEventsSorted(eventsData as EventItem[]), []);

  return (
    <div ref={containerRef} className="container mx-auto px-4 sm:px-6 pt-8 pb-12">
      <h1 className="text-section_title mb-4">Services & Events</h1>
      <p className="text-paragraph_large max-w-2xl mb-10">
        Join us for weekly worship, special services, and community events.
      </p>

      {/* In-page navigation */}
      <nav className="reveal-on-scroll mb-16 flex flex-wrap gap-2 sm:gap-4" aria-label="Page sections">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/40 rounded px-3 py-1.5"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Weekly Services */}
      <section id="weekly-services" className="reveal-on-scroll max-w-2xl mb-20 scroll-mt-24">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Church className="h-5 w-5 text-primary" aria-hidden />
              Weekly Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-medium text-muted-foreground">Day</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Time</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Service</th>
                </tr>
              </thead>
              <tbody>
                {weeklyServices.map((row, i) => (
                  <tr key={i} className="border-b border-border/60 last:border-0">
                    <td className="py-3">{row.day}</td>
                    <td className="py-3">{row.time}</td>
                    <td className="py-3">{row.service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      {/* Special Services */}
      <section id="special-services" className="reveal-on-scroll mb-20 scroll-mt-24">
        <h2 className="text-section_header flex items-center gap-2 mb-6">
          <Church className="h-6 w-6 text-primary" aria-hidden />
          Special Services
        </h2>
        <ul className="space-y-0 divide-y divide-border/60 rounded-2xl border border-border/80 bg-card shadow-card overflow-hidden">
          {(specialServicesData as EventItem[]).map((service, i) => (
            <li
              key={`${service.date}-${service.time}-${service.title}-${i}`}
              className="stagger-child flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-4 sm:px-6 sm:py-4 hover:bg-muted/40 transition-colors"
            >
              <span className="font-display font-semibold text-foreground min-w-[8rem]">
                {service.day}, {service.date}
              </span>
              <span className="text-muted-foreground text-sm tabular-nums">{service.time}</span>
              <span className="w-full sm:w-auto sm:ml-auto text-foreground">{service.title}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Events Diary */}
      <section id="events-diary" className="reveal-on-scroll mb-0 scroll-mt-24">
        <h2 className="text-section_header flex items-center gap-2 mb-6">
          <Calendar className="h-6 w-6 text-primary" aria-hidden />
          Events Diary
        </h2>
        <ul className="space-y-0 divide-y divide-border/60 rounded-2xl border border-border/80 bg-card shadow-card overflow-hidden">
          {eventsSorted.map((event, i) => (
            <li
              key={`${event.date}-${event.title}-${i}`}
              className="stagger-child flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-4 sm:px-6 sm:py-4 hover:bg-muted/40 transition-colors"
            >
              <span className="font-display font-semibold text-foreground min-w-[8rem]">
                {event.day}, {event.date}
              </span>
              <span className="text-muted-foreground text-sm tabular-nums">{event.time}</span>
              <span className="w-full sm:w-auto sm:ml-auto text-foreground">{event.title}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
