"use client";

import { useEffect, useState, Fragment } from "react";
import { clientConfig } from "@/client.config";

const EVENT_DATE = new Date(clientConfig.event.countdownTarget);

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft() {
  const diff = EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: "00", hours: "00", mins: "00", secs: "00" };
  return {
    days: pad(Math.floor(diff / 86400000)),
    hours: pad(Math.floor((diff % 86400000) / 3600000)),
    mins: pad(Math.floor((diff % 3600000) / 60000)),
    secs: pad(Math.floor((diff % 60000) / 1000)),
  };
}

export default function Countdown() {
  const [time, setTime] = useState({ days: "--", hours: "--", mins: "--", secs: "--" });

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown-wrap reveal">
      <span className="countdown-label">Event in</span>
      {(
        [
          [time.days, "Days"],
          [time.hours, "Hours"],
          [time.mins, "Mins"],
          [time.secs, "Secs"],
        ] as [string, string][]
      ).map(([value, label], i) => (
        <Fragment key={label}>
          {i > 0 && <span className="countdown-sep">:</span>}
          <div className="countdown-unit">
            <span className="countdown-num">{value}</span>
            <span className="countdown-unit-label">{label}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
