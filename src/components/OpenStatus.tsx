import { useEffect, useState } from "react";
import { ClockIcon as Clock } from "@phosphor-icons/react";
import { business, specialHours, weeklyHours } from "@/data/business";
import { getOpenStatus } from "@/lib/hours";

export default function OpenStatus({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState(() => getOpenStatus(new Date(), business.timezone, weeklyHours, specialHours));

  useEffect(() => {
    const refresh = () => setStatus(getOpenStatus(new Date(), business.timezone, weeklyHours, specialHours));
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={compact ? "open-status open-status-compact" : "open-status"}>
      <span className={status.isOpen ? "status-dot status-open" : "status-dot"} aria-hidden="true" />
      <Clock size={compact ? 17 : 20} aria-hidden="true" />
      <span>
        <strong>{status.label}</strong>
        {!compact && status.note ? <small>{status.note}</small> : null}
      </span>
    </div>
  );
}
