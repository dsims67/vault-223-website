import { z } from "zod";
import type { OrderProvider, SpecialHours, WeeklyHours } from "./types";

const businessSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  phone: z.string().min(10),
  phoneHref: z.string().startsWith("tel:"),
  email: z.email(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
  }),
  timezone: z.string(),
  facebook: z.url(),
  directions: z.url(),
});

export const business = businessSchema.parse({
  name: "Vault 223",
  tagline: "Fueling Big Dreams",
  phone: "(765) 553-3417",
  phoneHref: "tel:+17655533417",
  email: "management@vault223.com",
  address: {
    street: "223 N Main St",
    city: "Kokomo",
    state: "IN",
    postalCode: "46901",
  },
  timezone: "America/Indiana/Indianapolis",
  facebook: "https://www.facebook.com/p/Vault-223-61575300112455/",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=Vault+223%2C+223+N+Main+St%2C+Kokomo%2C+IN+46901",
});

export const weeklyHours: WeeklyHours[] = [
  { day: "sunday", label: "Sunday", intervals: [] },
  { day: "monday", label: "Monday", intervals: [] },
  { day: "tuesday", label: "Tuesday", intervals: [{ open: "08:00", close: "16:00" }] },
  { day: "wednesday", label: "Wednesday", intervals: [{ open: "08:00", close: "16:00" }] },
  { day: "thursday", label: "Thursday", intervals: [{ open: "08:00", close: "16:00" }] },
  { day: "friday", label: "Friday", intervals: [{ open: "08:00", close: "16:00" }] },
  { day: "saturday", label: "Saturday", intervals: [{ open: "08:00", close: "16:00" }] },
];

export const specialHours: SpecialHours[] = [];

export const orderProviders: OrderProvider[] = [
  {
    id: "doordash",
    label: "DoorDash",
    url: "https://www.doordash.com/store/vault-223-kokomo-46300935/",
    enabled: true,
    note: "Delivery and takeout",
  },
  {
    id: "uber-eats",
    label: "Uber Eats",
    url: "https://www.ubereats.com/store/vault-223/pbaEEGGJQpaGDEd2T34pvg",
    enabled: true,
    note: "Delivery and takeout",
  },
  {
    id: "clover",
    label: "Order Direct",
    url: "",
    enabled: false,
    note: "Coming later through Clover",
  },
];

export const formatAddress = () =>
  `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.postalCode}`;
