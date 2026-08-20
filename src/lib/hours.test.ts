import { describe, expect, it } from "vitest";
import { specialHours, weeklyHours } from "@/data/business";
import { formatTime, getOpenStatus } from "./hours";

const timezone = "America/Indiana/Indianapolis";

describe("Vault 223 hours", () => {
  it("formats menu hours without unnecessary minutes", () => {
    expect(formatTime("07:00")).toBe("7 AM");
    expect(formatTime("16:30")).toBe("4:30 PM");
  });

  it("is open during Tuesday service", () => {
    const result = getOpenStatus(new Date("2026-08-18T15:00:00Z"), timezone, weeklyHours, specialHours);
    expect(result.isOpen).toBe(true);
  });

  it("is closed after Tuesday service", () => {
    const result = getOpenStatus(new Date("2026-08-18T22:00:00Z"), timezone, weeklyHours, specialHours);
    expect(result.isOpen).toBe(false);
  });

  it("uses the regular Wednesday schedule", () => {
    const result = getOpenStatus(new Date("2026-08-19T15:00:00Z"), timezone, weeklyHours, specialHours);
    expect(result.isOpen).toBe(true);
  });
});
