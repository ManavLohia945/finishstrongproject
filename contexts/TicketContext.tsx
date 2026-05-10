"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { clientConfig } from "@/client.config";

const TicketContext = createContext(clientConfig.pricing.seatsTotal);

export function TicketProvider({ children }: { children: React.ReactNode }) {
  const [tickets, setTickets] = useState(clientConfig.pricing.seatsTotal);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickets((prev) => (prev > 1 ? prev - 1 : prev));
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return <TicketContext.Provider value={tickets}>{children}</TicketContext.Provider>;
}

export function useTickets() {
  return useContext(TicketContext);
}
