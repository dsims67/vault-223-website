import type { DayKey, SpecialHours, WeeklyHours } from "@/data/types";

const dayKeys: DayKey[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const timeToMinutes = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

export const formatTime = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}${minute ? `:${String(minute).padStart(2, "0")}` : ""} ${suffix}`;
};

export const formatHours = (hours: WeeklyHours) =>
  hours.intervals.length
    ? hours.intervals.map((period) => `${formatTime(period.open)}–${formatTime(period.close)}`).join(", ")
    : "Closed";

export function getLocalParts(date: Date, timezone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const record = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    day: record.weekday.toLowerCase() as DayKey,
    date: `${record.year}-${record.month}-${record.day}`,
    minutes: Number(record.hour) * 60 + Number(record.minute),
  };
}

export function getOpenStatus(
  date: Date,
  timezone: string,
  weekly: WeeklyHours[],
  specials: SpecialHours[],
) {
  const local = getLocalParts(date, timezone);
  const weeklyToday = weekly.find((entry) => entry.day === local.day)!;
  const special = specials.find((entry) => entry.date === local.date);
  const intervals = special
    ? special.closed
      ? []
      : special.intervals ?? weeklyToday.intervals
    : weeklyToday.intervals;
  const active = intervals.find(
    (period) => local.minutes >= timeToMinutes(period.open) && local.minutes < timeToMinutes(period.close),
  );

  if (active) {
    return {
      isOpen: true,
      label: `Open now · until ${formatTime(active.close)}`,
      note: special?.note,
    };
  }

  if (special?.closed) {
    return { isOpen: false, label: "Closed today", note: special.note };
  }

  const later = intervals.find((period) => local.minutes < timeToMinutes(period.open));
  if (later) {
    return { isOpen: false, label: `Closed · opens ${formatTime(later.open)}`, note: special?.note };
  }

  const currentIndex = dayKeys.indexOf(local.day);
  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDay = dayKeys[(currentIndex + offset) % 7];
    const hours = weekly.find((entry) => entry.day === nextDay)!;
    if (hours.intervals.length) {
      return {
        isOpen: false,
        label: `Closed · opens ${hours.label} at ${formatTime(hours.intervals[0].open)}`,
      };
    }
  }

  return { isOpen: false, label: "Closed", note: special?.note };
}
