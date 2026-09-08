"use client";

import { useEffect, useState } from "react";

export type CountdownParts = {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

export function getCountdownParts(endsAt: string | Date, now = Date.now()): CountdownParts {
  const end = typeof endsAt === "string" ? new Date(endsAt).getTime() : endsAt.getTime();
  const totalMs = Math.max(0, end - now);
  const expired = totalMs <= 0;
  const sec = Math.floor(totalMs / 1000);
  return {
    totalMs,
    days: Math.floor(sec / 86400),
    hours: Math.floor((sec % 86400) / 3600),
    minutes: Math.floor((sec % 3600) / 60),
    seconds: sec % 60,
    expired,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Countdown real a partir de ISO deadline. */
export default function Countdown({
  endsAt,
  className = "",
  compact = false,
}: {
  endsAt: string;
  className?: string;
  compact?: boolean;
}) {
  const [parts, setParts] = useState<CountdownParts>(() => getCountdownParts(endsAt));

  useEffect(() => {
    setParts(getCountdownParts(endsAt));
    const id = window.setInterval(() => setParts(getCountdownParts(endsAt)), 1000);
    return () => window.clearInterval(id);
  }, [endsAt]);

  if (parts.expired) {
    return <span className={className}>Oferta encerrada</span>;
  }

  const cells = [
    ...(parts.days > 0 ? [["d", parts.days]] as const : []),
    ["h", parts.hours] as const,
    ["m", parts.minutes] as const,
    ["s", parts.seconds] as const,
  ];

  if (compact) {
    return (
      <span className={`font-mono tabular-nums ${className}`} aria-live="polite">
        {parts.days > 0 ? `${parts.days}d ` : ""}
        {pad(parts.hours)}:{pad(parts.minutes)}:{pad(parts.seconds)}
      </span>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 ${className}`} aria-live="polite">
      {cells.map(([label, value]) => (
        <div
          key={label}
          className="min-w-[2.75rem] rounded-lg bg-black/25 px-2 py-1.5 text-center backdrop-blur-sm"
        >
          <div className="font-mono text-base font-bold tabular-nums leading-none md:text-lg">
            {pad(value)}
          </div>
          <div className="mt-1 text-[9px] font-semibold uppercase tracking-wider opacity-70">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
