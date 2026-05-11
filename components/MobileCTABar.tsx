"use client";
import { useTickets } from "@/contexts/TicketContext";
import { clientConfig } from "@/client.config";

const { pricing } = clientConfig;

export default function MobileCTABar({ checkoutUrl }: { checkoutUrl: string }) {
  const tickets = useTickets();
  return (
    <div className="mobile-cta-bar" aria-label="Register now">
      <div className="mobile-cta-left">
        <div className="mobile-cta-pricing">
          <span className="mobile-cta-was">{pricing.currency}{pricing.priceWas}</span>
          <span className="mobile-cta-now">{pricing.currency}{pricing.priceNow}</span>
        </div>
        <div className="mobile-cta-urgency">🔥 Only {tickets} seats left</div>
      </div>
      <a href={checkoutUrl} className="mobile-cta-btn">
        Grab Your Seat <span className="mobile-cta-arrow">→</span>
      </a>
    </div>
  );
}
