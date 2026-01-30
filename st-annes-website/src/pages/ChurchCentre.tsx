import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useObserveReveal } from "@/lib/useScrollReveal";
import {
  getBusyRangesForDate,
  getBusyRangesWithLabelsForDate,
  formatTimeForDisplay,
  getLabelAtMinute,
  isHourSlotAvailable,
  getMaxDurationMinutes,
  BOOKING_DAY_START_MIN,
  BOOKING_DAY_END_MIN,
  type Hall as AvailabilityHall,
} from "@/lib/hallAvailability";
import eventsData from "@/data/events.json";

type EventRow = {
  day: string;
  time: string;
  activity: string;
  /** Duration in minutes; default 90 if omitted. */
  durationMinutes?: number;
  /** Optional short description for the event popup. */
  description?: string;
};

const regularEvents: EventRow[] = [
  { day: "Sunday", time: "11:15 AM", activity: "Coffee (Main Hall)", durationMinutes: 60, description: "Informal coffee and chat after the morning service. Everyone welcome." },
  { day: "Sunday", time: "12:30 PM", activity: "Simple Lunch (4th in month) (Main Hall)", durationMinutes: 90, description: "Shared lunch on the fourth Sunday of the month. A chance to eat together and get to know one another." },
  { day: "Monday", time: "9:00 AM", activity: "Pre-School (Small Hall)", durationMinutes: 180, description: "Pre-school group for young children. Runs during term time." },
  { day: "Monday", time: "10:00 AM", activity: "Line Dancing (Main Hall)", durationMinutes: 90 },
  { day: "Monday", time: "4:00 PM", activity: "Footsteps Dance School (Main Hall)", durationMinutes: 90 },
  { day: "Monday", time: "7:30 PM", activity: "Yoga (Main Hall)", durationMinutes: 90 },
  { day: "Tuesday", time: "9:00 AM", activity: "Pre-School (Small Hall)", durationMinutes: 180, description: "Pre-school group for young children. Runs during term time." },
  { day: "Tuesday", time: "9:30 AM", activity: "NHS Pulmonary Rehabilitation Service (Main Hall)", durationMinutes: 90 },
  { day: "Tuesday", time: "5:30 PM", activity: "Rainbows (Main Hall)", durationMinutes: 60 },
  { day: "Tuesday", time: "5:30 PM", activity: "Brownies (Main Hall)", durationMinutes: 90 },
  { day: "Tuesday", time: "6:30 PM", activity: "Weight Watchers (Small Hall)", durationMinutes: 60 },
  { day: "Tuesday", time: "7:30 PM", activity: "Bridge Club (Main Hall)", durationMinutes: 120 },
  { day: "Wednesday", time: "9:00 AM", activity: "Pre-School (Small Hall)", durationMinutes: 180, description: "Pre-school group for young children. Runs during term time." },
  { day: "Wednesday", time: "1:45 PM", activity: "Keep Fit (Main Hall)", durationMinutes: 90 },
  { day: "Thursday", time: "9:00 AM", activity: "Pre-School (Small Hall)", durationMinutes: 180, description: "Pre-school group for young children. Runs during term time." },
  { day: "Thursday", time: "9:30 AM", activity: "NHS Pulmonary Rehabilitation Service (Main Hall)", durationMinutes: 90 },
  { day: "Thursday", time: "4:00 PM", activity: "Alcoholics Anonymous (Small Hall)", durationMinutes: 90 },
  { day: "Thursday", time: "6:00 PM", activity: "Rainbows (Small Hall)", durationMinutes: 60 },
  { day: "Thursday", time: "6:15 PM", activity: "Brownies (Main Hall)", durationMinutes: 90 },
  { day: "Friday", time: "9:00 AM", activity: "Pre-School (Small Hall)", durationMinutes: 180, description: "Pre-school group for young children. Runs during term time." },
  { day: "Friday", time: "8:15 PM", activity: "Badminton (Main Hall)", durationMinutes: 90 },
  { day: "Saturday", time: "10:00 AM", activity: "St Anne's Church Events (1st in month) (Main Hall)", durationMinutes: 120, description: "Church-run events and activities on the first Saturday of the month." },
  { day: "Saturday", time: "5:30 PM", activity: "Karate Class (Main Hall)", durationMinutes: 90 },
];

const dayOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Parse "9:00 AM" / "12:30 PM" to minutes from midnight. */
function timeToMinutes(timeStr: string): number {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const pm = match[3].toUpperCase() === "PM";
  if (pm && h !== 12) h += 12;
  if (!pm && h === 12) h = 0;
  return h * 60 + m;
}

/** Format minutes from midnight as "07:00" or "23:00" (24h-style for axis). */
function formatHourLabel(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

/** Format minutes from midnight as "5:30 PM" for popup display. */
function formatTimeDisplay(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const am = h < 12;
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m.toString().padStart(2, "0")} ${am ? "AM" : "PM"}`;
}

const CALENDAR_START_MIN = 7 * 60;   // 07:00
const CALENDAR_END_MIN = 23 * 60;    // 23:00
const CALENDAR_TOTAL_MIN = CALENDAR_END_MIN - CALENDAR_START_MIN; // 16 hours

type Hall = "main" | "small";

type EventBlock = { startMin: number; endMin: number; activity: string; hall: Hall; description?: string };

function parseHall(activity: string): Hall {
  if (/\(Small Hall\)/i.test(activity)) return "small";
  return "main";
}

function isRainbowsOrBrownies(activity: string): "rainbows" | "brownies" | null {
  const a = activity.toLowerCase();
  if (/rainbows?/.test(a)) return "rainbows";
  if (/brownies?/.test(a)) return "brownies";
  return null;
}

/** Build blocks per day, split by hall. Merges Rainbows + Brownies when same hall and overlapping time into one block. */
function buildEventBlocksByHall(events: EventRow[]): { main: EventBlock[]; small: EventBlock[] }[] {
  const byDayByHall: { main: EventBlock[]; small: EventBlock[] }[] = dayOrder.map(() => ({ main: [], small: [] }));
  for (const e of events) {
    const dayIndex = dayOrder.indexOf(e.day);
    if (dayIndex === -1) continue;
    const startMin = timeToMinutes(e.time);
    const duration = e.durationMinutes ?? 90;
    const endMin = startMin + duration;
    const clampedStart = Math.max(startMin, CALENDAR_START_MIN);
    const clampedEnd = Math.min(endMin, CALENDAR_END_MIN);
    if (clampedStart < clampedEnd) {
      const hall = parseHall(e.activity);
      byDayByHall[dayIndex][hall].push({
        startMin: clampedStart,
        endMin: clampedEnd,
        activity: e.activity,
        hall,
        description: e.description,
      });
    }
  }
  // Merge Rainbows and Brownies when they run at the same time in the same hall
  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    for (const hall of ["main", "small"] as const) {
      const blocks = byDayByHall[dayIndex][hall];
      const rainbowsIdx = blocks.findIndex((b) => isRainbowsOrBrownies(b.activity) === "rainbows");
      const browniesIdx = blocks.findIndex((b) => isRainbowsOrBrownies(b.activity) === "brownies");
      if (rainbowsIdx === -1 || browniesIdx === -1) continue;
      const r = blocks[rainbowsIdx];
      const b = blocks[browniesIdx];
      if (r.startMin >= b.endMin || b.startMin >= r.endMin) continue; // no overlap
      const hallLabel = hall === "main" ? "Main Hall" : "Small Hall";
      const merged: EventBlock = {
        startMin: Math.min(r.startMin, b.startMin),
        endMin: Math.max(r.endMin, b.endMin),
        activity: `Rainbows & Brownies (${hallLabel})`,
        hall,
        description: "Rainbows and Brownies meet together as part of our regular weekly programme.",
      };
      byDayByHall[dayIndex][hall] = blocks.filter(
        (_, i) => i !== rainbowsIdx && i !== browniesIdx
      ).concat(merged);
    }
  }
  return byDayByHall;
}

/** Top % and height % for an event block within the calendar day column. */
function blockPosition(block: EventBlock): { topPc: number; heightPc: number } {
  const topPc = ((block.startMin - CALENDAR_START_MIN) / CALENDAR_TOTAL_MIN) * 100;
  const heightPc = ((block.endMin - block.startMin) / CALENDAR_TOTAL_MIN) * 100;
  return { topPc, heightPc };
}

/** True if any block in the other hall overlaps this block's time range. */
function hasOverlapInOtherHall(
  block: EventBlock,
  dayIndex: number,
  blocksByDayByHall: { main: EventBlock[]; small: EventBlock[] }[]
): boolean {
  const otherHall = block.hall === "main" ? "small" : "main";
  const others = blocksByDayByHall[dayIndex][otherHall];
  return others.some(
    (o) => o.startMin < block.endMin && o.endMin > block.startMin
  );
}

/** One label per hour from 07:00 to 22:00 (16 rows). */
const HOUR_LABELS = Array.from({ length: 16 }, (_, i) => CALENDAR_START_MIN + i * 60);

function stripHallSuffix(activity: string): string {
  return activity
    .replace(/\s*\(Main Hall\)\s*$/i, "")
    .replace(/\s*\(Small Hall\)\s*$/i, "")
    .trim();
}

const HALL_STYLES: Record<Hall, { block: string; text: string }> = {
  main: {
    block: "bg-primary/20 border-primary/40",
    text: "text-primary",
  },
  small: {
    block: "bg-accent-warm/20 border-accent-warm/50",
    text: "text-accent-warm-foreground",
  },
};

const DEFAULT_EVENT_DESCRIPTION = "Part of our regular weekly programme at the church centre.";

type OneOffEventItem = { date: string; time: string; title: string };
const oneOffEvents = eventsData as OneOffEventItem[];

type BookingSlot = { hall: AvailabilityHall; startMin: number; endMin: number };

export default function ChurchCentre() {
  const containerRef = useObserveReveal();
  const blocksByDayByHall = useMemo(() => buildEventBlocksByHall(regularEvents), []);
  const [selectedEvent, setSelectedEvent] = useState<{ block: EventBlock; day: string } | null>(null);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<"select" | "details">("select");
  const [bookingDetailsSubmitted, setBookingDetailsSubmitted] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingType, setBookingType] = useState<"single" | "recurring">("single");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingHall, setBookingHall] = useState<AvailabilityHall>("main");
  const [rangeStartMin, setRangeStartMin] = useState<number | "">("");
  const [durationHours, setDurationHours] = useState<number | "">("");

  const bookingDateObj = bookingDate ? new Date(bookingDate + "T12:00:00") : null;
  const busyRanges = useMemo(() => {
    if (!bookingDateObj) return { main: [] as { startMin: number; endMin: number }[], small: [] as { startMin: number; endMin: number }[] };
    return getBusyRangesForDate(bookingDateObj, regularEvents, oneOffEvents);
  }, [bookingDateObj]);

  const busyWithLabels = useMemo(() => {
    if (!bookingDateObj) return { main: [] as { startMin: number; endMin: number; label: string }[], small: [] as { startMin: number; endMin: number; label: string }[] };
    return getBusyRangesWithLabelsForDate(bookingDateObj, regularEvents, oneOffEvents);
  }, [bookingDateObj]);

  const daySpanMin = BOOKING_DAY_END_MIN - BOOKING_DAY_START_MIN;

  const hourSlots = useMemo(() => {
    const slots: number[] = [];
    for (let m = BOOKING_DAY_START_MIN; m < BOOKING_DAY_END_MIN; m += 60) slots.push(m);
    return slots;
  }, []);

  const busyForSelectedHall = bookingHall === "main" ? busyRanges.main : busyRanges.small;
  const busyWithLabelsForHall = bookingHall === "main" ? busyWithLabels.main : busyWithLabels.small;
  const startNum = rangeStartMin === "" ? null : rangeStartMin;
  const maxDurationMin = startNum != null ? getMaxDurationMinutes(startNum, busyForSelectedHall) : 0;
  const maxDurationHours = Math.floor(maxDurationMin / 60);
  const durationOptions = useMemo(() => {
    const opts: number[] = [];
    for (let h = 1; h <= maxDurationHours; h++) opts.push(h);
    return opts;
  }, [maxDurationHours]);
  const durationNum = durationHours === "" ? null : durationHours;
  const endNum = startNum != null && durationNum != null ? startNum + durationNum * 60 : null;
  const selectedSlot: BookingSlot | null =
    startNum != null && durationNum != null && durationNum >= 1
      ? { hall: bookingHall, startMin: startNum, endMin: startNum + durationNum * 60 }
      : null;

  const handleConfirmBookingAndEnterDetails = () => {
    if (!selectedSlot) return;
    setBookingStep("details");
  };

  const handleSendBookingEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingDetailsSubmitted(true);
  };

  const handleCloseBookingModal = () => {
    setBookingModalOpen(false);
    setBookingStep("select");
    setBookingDetailsSubmitted(false);
    setBookingDate("");
    setRangeStartMin("");
    setDurationHours("");
    setBookingName("");
    setBookingEmail("");
    setBookingMessage("");
  };

  return (
    <div ref={containerRef} className="container mx-auto px-4 sm:px-6 pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-24">
      <h1 className="text-section_title mb-4">Church Centre</h1>
      <p className="text-paragraph_large text-muted-foreground max-w-2xl mb-12 reveal-on-scroll">
        Our church centre is a busy community hub—home to pre-school, clubs, classes, and regular groups.
        The calendar below shows when the centre is in use and when it is available to book. For one-off events see{" "}
        <Link to="/services-and-events" className="text-link font-medium hover:underline">Services &amp; Events</Link>.
      </p>

      <section className="reveal-on-scroll max-w-6xl">
        <h2 className="text-section_header mb-6">Weekly availability</h2>
        <Card className="overflow-hidden border-border/80 bg-card shadow-card hover:shadow-soft transition-shadow duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground">Main Hall &amp; Small Hall</CardTitle>
            <p className="text-sm text-muted-foreground mt-1 font-normal">
              Coloured blocks show regular weekly activities; empty space is typically available for hire. Contact us to confirm or book.
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-border/70">
              <span className="flex items-center gap-2 text-sm">
                <span className="inline-block w-4 h-4 rounded bg-primary/25 border border-primary/40" aria-hidden />
                <span className="text-muted-foreground">Main Hall</span>
              </span>
              <span className="flex items-center gap-2 text-sm">
                <span className="inline-block w-4 h-4 rounded bg-accent-warm/25 border border-accent-warm/50" aria-hidden />
                <span className="text-muted-foreground">Small Hall</span>
              </span>
              <span className="flex items-center gap-2 text-sm">
                <span className="inline-block w-4 h-4 rounded border border-border bg-background" aria-hidden />
                <span className="text-muted-foreground">Available to book</span>
              </span>
              <Button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="ml-auto"
              >
                Book a hall
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div
              className="overflow-x-auto rounded-lg border border-border/70 bg-muted/20"
              style={{ minHeight: "28rem" }}
              role="img"
              aria-label="Weekly calendar: events and available times from 7am to 11pm"
            >
              <div
                className="grid min-w-[1100px]"
                style={{
                  gridTemplateColumns: "4rem repeat(7, minmax(11rem, 1fr))",
                  gridTemplateRows: "auto 52rem",
                }}
              >
                {/* Header row: empty time cell + day names */}
                <div className="border-b border-r border-border/70 bg-muted/50 py-2.5 px-2" />
                {dayOrder.map((day) => (
                  <div
                    key={day}
                    className="border-b border-border/70 bg-muted/50 py-2.5 px-2 text-center font-display font-semibold text-foreground text-sm"
                  >
                    {day}
                  </div>
                ))}

                {/* Time axis (left column) */}
                <div
                  className="col-start-1 row-start-2 flex flex-col border-r border-border/70 bg-background/80 py-0"
                  style={{ height: "100%" }}
                >
                  {HOUR_LABELS.map((min) => (
                    <div
                      key={min}
                      className="flex shrink-0 items-start justify-end pr-2 text-xs text-muted-foreground tabular-nums border-b border-border/50"
                      style={{ height: `${100 / HOUR_LABELS.length}%`, minHeight: "2rem" }}
                    >
                      {formatHourLabel(min)}
                    </div>
                  ))}
                </div>

                {/* Day columns: single event = full width; overlapping events = side by side */}
                {dayOrder.map((day, dayIndex) => (
                  <div
                    key={day}
                    className="relative row-start-2 border-r border-border/50 last:border-r-0 bg-background/50"
                    style={{ minHeight: "100%" }}
                  >
                    {/* Hour grid lines */}
                    {HOUR_LABELS.slice(0, -1).map((min) => (
                      <div
                        key={min}
                        className="absolute left-0 right-0 border-b border-border/40 pointer-events-none"
                        style={{
                          top: `${((min - CALENDAR_START_MIN) / CALENDAR_TOTAL_MIN) * 100}%`,
                          height: 0,
                        }}
                      />
                    ))}
                    {/* All event blocks: full width when no clash, half width when two at same time */}
                    {(["main", "small"] as const).map((hall) =>
                      blocksByDayByHall[dayIndex][hall].map((block, i) => {
                        const { topPc, heightPc } = blockPosition(block);
                        const styles = HALL_STYLES[hall];
                        const hasClash = hasOverlapInOtherHall(block, dayIndex, blocksByDayByHall);
                        const isFullWidth = !hasClash;
                        const blockStyle: React.CSSProperties = {
                          top: `${topPc}%`,
                          height: `${heightPc}%`,
                          minHeight: "1.75rem",
                        };
                        if (isFullWidth) {
                          blockStyle.left = "2px";
                          blockStyle.right = "2px";
                        } else {
                          blockStyle.width = "calc(50% - 3px)";
                          blockStyle.left = hall === "main" ? "2px" : "calc(50% + 1px)";
                        }
                        return (
                          <div
                            key={`${day}-${hall}-${i}`}
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent({ block, day });
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedEvent({ block, day });
                              }
                            }}
                            className={`absolute rounded-md border overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary/50 focus:outline-none focus:ring-2 focus:ring-primary ${styles.block}`}
                            style={blockStyle}
                            title={`${stripHallSuffix(block.activity)} — click for details`}
                          >
                            <span className={`block px-2 py-1 text-xs font-medium leading-snug break-words line-clamp-2 ${styles.text}`}>
                              {stripHallSuffix(block.activity)}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-6 pt-4 border-t border-border/70">
              To enquire about hiring the Main Hall or Small Hall, please{" "}
              <Link to="/visit-and-contact" className="text-link font-medium hover:underline">get in touch</Link>.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Event detail popup */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setSelectedEvent(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-dialog-title"
        >
          <Card
            className="relative w-full max-w-md border-border bg-card shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="pb-2">
              <CardTitle id="event-dialog-title" className="text-foreground text-xl">
                {stripHallSuffix(selectedEvent.block.activity)}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedEvent.block.description ?? DEFAULT_EVENT_DESCRIPTION}
              </p>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <p className="text-sm">
                <span className="font-medium text-foreground">Hall:</span>{" "}
                {selectedEvent.block.hall === "main" ? "Main Hall" : "Small Hall"}
              </p>
              <p className="text-sm">
                <span className="font-medium text-foreground">Time:</span>{" "}
                {selectedEvent.day}, {formatTimeDisplay(selectedEvent.block.startMin)} – {formatTimeDisplay(selectedEvent.block.endMin)}
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-4 w-full sm:w-auto"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Book a hall modal */}
      {bookingModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto"
          onClick={handleCloseBookingModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-dialog-title"
        >
          <Card
            className="relative w-full max-w-lg border-border bg-card shadow-soft my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="pb-2">
              <CardTitle id="booking-dialog-title">Book a hall</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {bookingStep === "select"
                  ? "Check availability and send an enquiry. We use our weekly programme and Services &amp; Events diary to show when halls are free."
                  : "Enter your details to send your booking request."}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {bookingStep === "select" && (
                <>
              <div>
                <Label className="text-foreground">Type of booking</Label>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="bookingType"
                      checked={bookingType === "single"}
                      onChange={() => setBookingType("single")}
                      className="text-primary"
                    />
                    <span className="text-sm">Single use</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="bookingType"
                      checked={bookingType === "recurring"}
                      onChange={() => setBookingType("recurring")}
                      className="text-primary"
                    />
                    <span className="text-sm">Recurring booking</span>
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="booking-date" className="text-foreground">Pick a date</Label>
                <input
                  id="booking-date"
                  type="date"
                  value={bookingDate}
                  onChange={(e) => {
                    setBookingDate(e.target.value);
                    setRangeStartMin("");
                    setDurationHours("");
                  }}
                  onClick={(e) => e.currentTarget.showPicker?.()}
                  min={new Date().toISOString().slice(0, 10)}
                  className="mt-2 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer"
                />
              </div>

              {bookingDateObj && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-foreground">
                    {bookingDateObj.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
                  </p>

                  <div>
                    <Label className="text-foreground">Hall</Label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="bookingHall"
                          checked={bookingHall === "main"}
                          onChange={() => {
                            setBookingHall("main");
                            setRangeStartMin("");
                            setDurationHours("");
                          }}
                          className="text-primary"
                        />
                        <span className="text-sm">Main Hall</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="bookingHall"
                          checked={bookingHall === "small"}
                          onChange={() => {
                            setBookingHall("small");
                            setRangeStartMin("");
                            setDurationHours("");
                          }}
                          className="text-primary"
                        />
                        <span className="text-sm">Small Hall</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Click an available hour to set your start time</p>
                    <div className="rounded-md border border-border/70 overflow-hidden bg-muted/20">
                      <div className="grid grid-cols-[5rem_1fr] text-sm">
                        {hourSlots.map((hourStartMin) => {
                          const available = isHourSlotAvailable(hourStartMin, busyForSelectedHall);
                          const label = getLabelAtMinute(hourStartMin, busyWithLabelsForHall);
                          const isSelected = rangeStartMin === hourStartMin;
                          return (
                            <React.Fragment key={hourStartMin}>
                              <div className="border-b border-border/50 py-1.5 pr-2 text-right text-muted-foreground tabular-nums whitespace-nowrap">
                                {formatTimeForDisplay(hourStartMin)}
                              </div>
                              <div
                                className={`border-b border-border/50 min-h-[2rem] flex items-center px-2 ${
                                  available
                                    ? isSelected
                                      ? "bg-primary/20 border-l-2 border-l-primary"
                                      : "bg-primary/10 hover:bg-primary/15 cursor-pointer"
                                    : "bg-muted/60 text-muted-foreground"
                                }`}
                                onClick={() => {
                                  if (available) {
                                    setRangeStartMin(isSelected ? "" : hourStartMin);
                                    setDurationHours("");
                                  }
                                }}
                                role={available ? "button" : undefined}
                                tabIndex={available ? 0 : undefined}
                                onKeyDown={(e) => {
                                  if (available && (e.key === "Enter" || e.key === " ")) {
                                    e.preventDefault();
                                    setRangeStartMin(rangeStartMin === hourStartMin ? "" : hourStartMin);
                                    setDurationHours("");
                                  }
                                }}
                                title={available ? "Click to set start time" : label ? `${label} (in use)` : "In use"}
                              >
                                {available ? (
                                  isSelected ? (
                                    <span className="text-primary font-medium">Selected start</span>
                                  ) : (
                                    <span className="text-muted-foreground">Available</span>
                                  )
                                ) : (
                                  <span className="truncate">{label ?? "In use"}</span>
                                )}
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {startNum !== null && (
                    <div>
                      <Label htmlFor="booking-duration" className="text-foreground">Duration</Label>
                      <p className="text-xs text-muted-foreground mt-0.5 mb-2">
                        {maxDurationHours >= 1
                          ? `Up to ${maxDurationHours} hour${maxDurationHours !== 1 ? "s" : ""} before the next event`
                          : "No available time from this hour"}
                      </p>
                      <select
                        id="booking-duration"
                        value={durationHours === "" ? "" : durationHours}
                        onChange={(e) => setDurationHours(e.target.value ? Number(e.target.value) : "")}
                        className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="">Select duration</option>
                        {durationOptions.map((h) => (
                          <option key={h} value={h}>
                            {h} hour{h !== 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                      {selectedSlot && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {formatTimeForDisplay(selectedSlot.startMin)} – {formatTimeForDisplay(selectedSlot.endMin)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  type="button"
                  onClick={handleConfirmBookingAndEnterDetails}
                  disabled={!selectedSlot}
                >
                  Continue
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseBookingModal}
                >
                  Cancel
                </Button>
              </div>
                </>
              )}

              {bookingStep === "details" && selectedSlot && (
                <>
                  <div className="rounded-lg border border-border/70 bg-muted/20 p-4 space-y-2 text-sm">
                    <p className="font-medium text-foreground">Your booking request</p>
                    <p><span className="text-muted-foreground">Type:</span> {bookingType === "single" ? "Single use" : "Recurring booking"}</p>
                    <p><span className="text-muted-foreground">Date:</span> {bookingDateObj?.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
                    <p><span className="text-muted-foreground">Time:</span> {formatTimeForDisplay(selectedSlot.startMin)} – {formatTimeForDisplay(selectedSlot.endMin)}</p>
                    <p><span className="text-muted-foreground">Hall:</span> {selectedSlot.hall === "main" ? "Main Hall" : "Small Hall"}</p>
                  </div>

                  {bookingDetailsSubmitted ? (
                    <p className="text-primary font-medium">Thank you. Your hall booking enquiry has been sent. We'll be in touch to confirm.</p>
                  ) : (
                    <form onSubmit={handleSendBookingEnquiry} className="space-y-4">
                      <div>
                        <Label htmlFor="booking-name">Name</Label>
                        <Input
                          id="booking-name"
                          name="name"
                          required
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="booking-email">Email address</Label>
                        <Input
                          id="booking-email"
                          name="email"
                          type="email"
                          required
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="booking-message">Message (optional)</Label>
                        <Textarea
                          id="booking-message"
                          name="message"
                          rows={3}
                          value={bookingMessage}
                          onChange={(e) => setBookingMessage(e.target.value)}
                          placeholder="Any additional details or questions..."
                          className="mt-1"
                        />
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button type="submit">Send enquiry</Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setBookingStep("select")}
                        >
                          Back
                        </Button>
                      </div>
                    </form>
                  )}

                  <div className="pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCloseBookingModal}
                    >
                      {bookingDetailsSubmitted ? "Close" : "Cancel"}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
