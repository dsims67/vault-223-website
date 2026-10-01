import { describe, expect, it } from "vitest";
import { specialHours, weeklyHours } from "@/data/business";
import { formatTime, getOpenStatus } from "./hours";

const timezone = "America/Indiana/Indianapolis";

describe("Vault 223 hours", () => {
  it("formats menu hours without unnecessary minutes", () => {
    expect(formatTime("08:00")).toBe("8 AM");
    expect(formatTime("16:30")).toBe("4:30 PM");
  });

  it("is open during Tuesday service", () => {
    const result = getOpenStatus(new Date("2026-08-18T15:00:00Z"), timezone, weeklyHours, specialHours);
    expect(result.isOpen).toBe(true);
  });

  it("is closed after Tuesday service", () => {
    const result = getOpenStatus(new Date("2026-08-18T20:30:00Z"), timezone, weeklyHours, specialHours);
    expect(result.isOpen).toBe(false);
  });

  it("uses the regular Wednesday schedule", () => {
    const result = getOpenStatus(new Date("2026-08-19T15:00:00Z"), timezone, weeklyHours, specialHours);
    expect(result.isOpen).toBe(true);
  });

  it("uses the same regular schedule on Saturday", () => {
    const result = getOpenStatus(new Date("2026-08-22T13:00:00Z"), timezone, weeklyHours, specialHours);
    expect(result.isOpen).toBe(true);
  });
});
