export type DayKey =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface HoursInterval {
  open: string;
  close: string;
}

export interface WeeklyHours {
  day: DayKey;
  label: string;
  intervals: HoursInterval[];
}

export interface SpecialHours {
  date: string;
  closed: boolean;
  intervals?: HoursInterval[];
  note?: string;
}

export interface OrderProvider {
  id: "doordash" | "uber-eats" | "clover";
  label: string;
  url: string;
  enabled: boolean;
  note: string;
}

export interface MenuPrice {
  label?: string;
  value: string;
}

export interface MenuItem {
  name: string;
  description: string;
  prices: MenuPrice[];
  featured?: boolean;
}

export interface MenuCategory {
  slug: string;
  title: string;
  eyebrow: string;
  note?: string;
  items: MenuItem[];
}

export interface PhotoAsset {
  filename: string;
  alt: string;
  mobilePosition: string;
  desktopPosition: string;
  role: string;
}
