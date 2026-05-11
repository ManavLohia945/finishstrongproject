"use client";

import Image from "next/image";
import { useTickets } from "@/contexts/TicketContext";
import { clientConfig } from "@/client.config";

const { coaches, funnel1, pricing } = clientConfig;

export default function CoachSection() {
  const tickets = useTickets();
  return (
    <section className="coach-section">
      <div className="coach-inner">
        <span className="section-label reveal">Meet Your Coach</span>
        <h2 className="section-headline reveal" style={{ marginBottom: 48 }}>
          The People Behind Your <span className="accent">Race Blueprint</span>
        </h2>

        {/* ── Primary Coach ── */}
        <div className="coach1-layout">
          <div className="coach1-img-wrap reveal">
            <Image
              src={coaches.primary.actionImage}
              alt={coaches.primary.name}
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
          <div className="coach1-content reveal reveal-delay-2">
            <div className="coach-name">{coaches.primary.name}</div>
            <div className="coach-title">{coaches.primary.title}</div>
            <div className="coach-divider" />
            <div className="coach-bio">
              {coaches.primary.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="coach-pills">
              {coaches.primary.credentials.map((pill) => (
                <span className="coach-pill" key={pill}>{pill}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Secondary Coach ── */}
        <div className="coach2-block reveal">
          <div className="coach2-img-wrap">
            <Image
              src={coaches.secondary.image}
              alt={coaches.secondary.name}
              width={180}
              height={180}
              style={{ objectFit: "cover", objectPosition: "center top", width: "100%", height: "100%" }}
            />
          </div>
          <div className="coach2-content">
            <div className="coach2-eyebrow">{coaches.secondary.eyebrow}</div>
            <div className="coach2-name">{coaches.secondary.name}</div>
            <div className="coach2-title">{coaches.secondary.title}</div>
            <p className="coach2-quote">&ldquo;{coaches.secondary.quote}&rdquo;</p>
            <div className="coach2-pills">
              {coaches.secondary.credentials.map((pill) => (
                <span className="coach2-pill" key={pill}>{pill}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="cta-block reveal">
          <div className="price-row">
            <span className="price-was">{pricing.currency}{pricing.priceWas}</span>
            <span className="price-badge">Today Only</span>
            <span className="price-now">{pricing.currency}{pricing.priceNow}</span>
          </div>
          <a href={`/checkout?funnel=${funnel1.slug}`} className="cta">
            Grab Your Ticket Now <div className="cta-arrow">→</div>
          </a>
          <div className="guarantee">🛡️ 100% Money Back Guarantee — Zero Risk</div>
          <div className="urgency">
            🔥 Only <span className="urgency-num">{tickets}</span> tickets left — booking closes once full
          </div>
        </div>
      </div>
    </section>
  );
}
