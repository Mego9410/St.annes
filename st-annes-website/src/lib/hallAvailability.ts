/**
 * Hall availability: combines weekly programme (Church Centre) and one-off events (Services & Events)
 * to compute busy ranges and available time slots for a given date.
 */

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export type Hall = "main" | "small";

export type WeeklyEvent = {
  day: string;
  time: string;
  activity: string;
  durationMinutes?: number;
};

export type OneOffEvent = {
  date: string; // "3rd February"
  time: string;
  title: string;
};

export type BusyRange = { startMin: number; endMin: number };

export type BusyRangeWithLabel = { startMin: number; endMin: number; label: string };

/** Parse "9:00 AM" / "12:30 PM" to minutes from midnight. */
export function timeToMinutes(timeStr: string): number {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const pm = match[3].toUpperCase() === "PM";
  if (pm && h !== 12) h += 12;
  if (!pm && h === 12) h = 0;
  return h * 60 + m;
}

/** Parse "3rd February" to { day: 3, month: 0 } (month 0-indexed). */
function parseEventDateStr(dateStr: string): { day: number; month: number } | null {
  const match = dateStr.match(/^(\d{1,2})(?:st|nd|rd|th)?\s+(\w+)$/);
  if (!match) return null;
  const day = parseInt(match[1], 10);
  const monthIndex = MONTH_NAMES.findIndex((m) => m.toLowerCase().startsWith(match![2].toLowerCase()));
  if (monthIndex === -1) return null;
  return { day, month: monthIndex };
}

/** True if event date "3rd February" falls on the given Date. */
function eventMatchesDate(eventDateStr: string, date: Date): boolean {
  const parsed = parseEventDateStr(eventDateStr);
  if (!parsed) return false;
  return date.getDate() === parsed.day && date.getMonth() === parsed.month;
}

function parseHall(activity: string): Hall {
  if (/\(Small Hall\)/i.test(activity)) return "small";
  return "main";
}

/** Strip "(Main Hall)" / "(Small Hall)" from activity for display. */
function stripHallSuffix(activity: string): string {
  return activity
    .replace(/\s*\(Main Hall\)\s*$/i, "")
    .replace(/\s*\(Small Hall\)\s*$/i, "")
    .trim();
}

/** Busy ranges for Main and Small hall on a given date (weekly programme only). */
function getWeeklyBusyRangesForDate(date: Date, weeklyEvents: WeeklyEvent[]): { main: BusyRange[]; small: BusyRange[] } {
  const dayIndex = date.getDay(); // 0 = Sunday
  const dayName = DAY_NAMES[dayIndex];
  const main: BusyRange[] = [];
  const small: BusyRange[] = [];

  for (const e of weeklyEvents) {
    if (e.day !== dayName) continue;
    const startMin = timeToMinutes(e.time);
    const duration = e.durationMinutes ?? 90;
    const endMin = startMin + duration;
    const hall = parseHall(e.activity);
    const range = { startMin, endMin };
    if (hall === "main") main.push(range);
    else small.push(range);
  }

  return { main, small };
}

/** Weekly busy ranges with activity labels (for timeline display). */
function getWeeklyBusyRangesWithLabelsForDate(
  date: Date,
  weeklyEvents: WeeklyEvent[]
): { main: BusyRangeWithLabel[]; small: BusyRangeWithLabel[] } {
  const dayIndex = date.getDay();
  const dayName = DAY_NAMES[dayIndex];
  const main: BusyRangeWithLabel[] = [];
  const small: BusyRangeWithLabel[] = [];

  for (const e of weeklyEvents) {
    if (e.day !== dayName) continue;
    const startMin = timeToMinutes(e.time);
    const duration = e.durationMinutes ?? 90;
    const endMin = startMin + duration;
    const hall = parseHall(e.activity);
    const label = stripHallSuffix(e.activity);
    const range = { startMin, endMin, label };
    if (hall === "main") main.push(range);
    else small.push(range);
  }

  return { main, small };
}

/** One-off events block both halls (we don't have per-hall info). Default duration 2 hours. */
const ONE_OFF_DURATION_MIN = 120;

function getOneOffBusyRangesForDate(date: Date, oneOffEvents: OneOffEvent[]): BusyRange[] {
  const ranges: BusyRange[] = [];
  for (const e of oneOffEvents) {
    if (!eventMatchesDate(e.date, date)) continue;
    const startMin = timeToMinutes(e.time);
    const endMin = startMin + ONE_OFF_DURATION_MIN;
    ranges.push({ startMin, endMin });
  }
  return ranges;
}

function getOneOffBusyRangesWithLabelsForDate(date: Date, oneOffEvents: OneOffEvent[]): BusyRangeWithLabel[] {
  const ranges: BusyRangeWithLabel[] = [];
  for (const e of oneOffEvents) {
    if (!eventMatchesDate(e.date, date)) continue;
    const startMin = timeToMinutes(e.time);
    const endMin = startMin + ONE_OFF_DURATION_MIN;
    ranges.push({ startMin, endMin, label: e.title });
  }
  return ranges;
}

/** Merge and sort busy ranges, then merge overlapping ones. */
function mergeRanges(ranges: BusyRange[]): BusyRange[] {
  if (ranges.length === 0) return [];
  const sorted = [...ranges].sort((a, b) => a.startMin - b.startMin);
  const merged: BusyRange[] = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const prev = merged[merged.length - 1];
    const curr = sorted[i];
    if (curr.startMin <= prev.endMin) {
      prev.endMin = Math.max(prev.endMin, curr.endMin);
    } else {
      merged.push(curr);
    }
  }
  return merged;
}

/** Busy ranges per hall for a given date (weekly + one-off). One-off events block both halls. */
export function getBusyRangesForDate(
  date: Date,
  weeklyEvents: WeeklyEvent[],
  oneOffEvents: OneOffEvent[]
): { main: BusyRange[]; small: BusyRange[] } {
  const weekly = getWeeklyBusyRangesForDate(date, weeklyEvents);
  const oneOff = getOneOffBusyRangesForDate(date, oneOffEvents);

  const main = mergeRanges([...weekly.main, ...oneOff]);
  const small = mergeRanges([...weekly.small, ...oneOff]);

  return { main, small };
}

/** Busy ranges with labels per hall (for timeline with activity names). Not merged so each activity shows as its own block. */
export function getBusyRangesWithLabelsForDate(
  date: Date,
  weeklyEvents: WeeklyEvent[],
  oneOffEvents: OneOffEvent[]
): { main: BusyRangeWithLabel[]; small: BusyRangeWithLabel[] } {
  const weekly = getWeeklyBusyRangesWithLabelsForDate(date, weeklyEvents);
  const oneOff = getOneOffBusyRangesWithLabelsForDate(date, oneOffEvents);

  const main = [...weekly.main, ...oneOff].sort((a, b) => a.startMin - b.startMin);
  const small = [...weekly.small, ...oneOff].sort((a, b) => a.startMin - b.startMin);

  return { main, small };
}

/** For a given minute (e.g. 9*60), return the label of the busy range that contains it, or null if available. */
export function getLabelAtMinute(minute: number, busyRangesWithLabels: BusyRangeWithLabel[]): string | null {
  for (const r of busyRangesWithLabels) {
    if (minute >= r.startMin && minute < r.endMin) return r.label;
  }
  return null;
}

/** True if the 1-hour slot [hourStartMin, hourStartMin+60) is entirely available (no overlap with any busy range). */
export function isHourSlotAvailable(hourStartMin: number, busyRanges: BusyRange[]): boolean {
  const hourEndMin = hourStartMin + 60;
  return !busyRanges.some((b) => b.startMin < hourEndMin && b.endMin > hourStartMin);
}

/** Max duration in minutes from startMin until the next busy range or day end. Returns 0 if startMin is inside a busy range. */
export function getMaxDurationMinutes(startMin: number, busyRanges: BusyRange[]): number {
  const dayEnd = BOOKING_DAY_END_MIN;
  const insideBusy = busyRanges.some((b) => startMin >= b.startMin && startMin < b.endMin);
  if (insideBusy) return 0;
  const nextStarts = busyRanges.filter((b) => b.startMin > startMin).map((b) => b.startMin);
  const nextStart = nextStarts.length > 0 ? Math.min(...nextStarts) : dayEnd;
  return Math.min(nextStart - startMin, dayEnd - startMin);
}

export const BOOKING_DAY_START_MIN = 8 * 60;
export const BOOKING_DAY_END_MIN = 22 * 60;

const DAY_START_MIN = 8 * 60;   // 8:00
const DAY_END_MIN = 22 * 60;    // 22:00
const SLOT_MINUTES = 60;

/** True if [slotStart, slotEnd) overlaps any busy range. */
function slotOverlapsBusy(slotStart: number, slotEnd: number, busyRanges: BusyRange[]): boolean {
  return busyRanges.some(
    (b) => b.startMin < slotEnd && b.endMin > slotStart
  );
}

/** True if the range [startMin, endMin) overlaps any busy range. Exported for booking validation. */
export function rangeOverlapsBusy(startMin: number, endMin: number, busyRanges: BusyRange[]): boolean {
  return slotOverlapsBusy(startMin, endMin, busyRanges);
}

/** Timeline segments (1-hour) from day start to day end; each segment has isBusy. */
export function getTimelineSegments(
  busyRanges: BusyRange[],
  options: { dayStartMin?: number; dayEndMin?: number; segmentMinutes?: number } = {}
): { startMin: number; endMin: number; isBusy: boolean }[] {
  const dayStart = options.dayStartMin ?? DAY_START_MIN;
  const dayEnd = options.dayEndMin ?? DAY_END_MIN;
  const segmentMinutes = options.segmentMinutes ?? SLOT_MINUTES;
  const segments: { startMin: number; endMin: number; isBusy: boolean }[] = [];
  for (let start = dayStart; start < dayEnd; start += segmentMinutes) {
    const end = Math.min(start + segmentMinutes, dayEnd);
    segments.push({
      startMin: start,
      endMin: end,
      isBusy: slotOverlapsBusy(start, end, busyRanges),
    });
  }
  return segments;
}

/** Available time slots for a hall on the given date (1-hour slots by default). */
export function getAvailableSlots(
  busyRanges: BusyRange[],
  options: { slotMinutes?: number; dayStartMin?: number; dayEndMin?: number } = {}
): { startMin: number; endMin: number }[] {
  const slotMinutes = options.slotMinutes ?? SLOT_MINUTES;
  const dayStart = options.dayStartMin ?? DAY_START_MIN;
  const dayEnd = options.dayEndMin ?? DAY_END_MIN;

  const slots: { startMin: number; endMin: number }[] = [];
  for (let start = dayStart; start + slotMinutes <= dayEnd; start += slotMinutes) {
    const end = start + slotMinutes;
    if (!slotOverlapsBusy(start, end, busyRanges)) {
      slots.push({ startMin: start, endMin: end });
    }
  }
  return slots;
}

/** Format minutes from midnight as "9:00 AM" for display. */
export function formatTimeForDisplay(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const am = h < 12;
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m.toString().padStart(2, "0")} ${am ? "AM" : "PM"}`;
}
