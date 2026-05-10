"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Countdown from "@/components/Countdown";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import MobileCTABar from "@/components/MobileCTABar";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { useTickets } from "@/contexts/TicketContext";
import { clientConfig } from "@/client.config";

const { funnel2, coaches, pricing, event } = clientConfig;

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const metaCards = [
  { icon: <CalendarIcon />, label: "Date",  value: event.dateDisplay,     delay: "reveal-delay-1" },
  { icon: <ClockIcon />,    label: "Time",  value: event.timeDisplay,     delay: "reveal-delay-2" },
  { icon: <ChatIcon />,     label: "Venue", value: event.platform,        delay: "reveal-delay-3" },
  { icon: <UsersIcon />,    label: "Hosts", value: funnel2.heroPersonName, delay: "reveal-delay-4" },
];

export default function MarathonerFunnelPage() {
  const tickets = useTickets();

  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState<number>(-1);

  useEffect(() => {
    const updateLine = () => {
      if (!timelineRef.current || !lineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const progress = Math.min(
        Math.max((window.innerHeight * 0.65 - rect.top) / rect.height, 0),
        1
      );
      lineRef.current.style.height = `${progress * 100}%`;
      const lineTipY = rect.top + progress * rect.height;
      let current = -1;
      iconRefs.current.forEach((icon, i) => {
        if (!icon) return;
        const r = icon.getBoundingClientRect();
        if (lineTipY >= r.top + r.height / 2 - 10) current = i;
      });
      setActiveStep(current);
    };
    window.addEventListener("scroll", updateLine, { passive: true });
    updateLine();
    return () => window.removeEventListener("scroll", updateLine);
  }, []);

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <main className="has-sticky-cta">
      <ScrollReveal />

      {/* ════════════════════════════════════════════════ HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="pill reveal">{funnel2.pill}</div>

          <h1 className="hero-h1 reveal">
            {funnel2.heroH1Main}<br />
            <AnimatedText
              text={funnel2.heroH1AnimatedText}
              strokeColor="var(--red)"
              strokeWidth={3}
              underlineDuration={1.4}
              underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
              underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
              style={{ color: "var(--red)" }}
            />
          </h1>

          <p className="challenge-line reveal">{funnel2.heroChallengeLine}</p>

          <p className="body-copy reveal">{funnel2.heroBodyCopy}</p>

          <div className="social-proof reveal">
            <span>{funnel2.socialProof1}</span>
            <span className="sep">·</span>
            <span>{funnel2.socialProof2}</span>
          </div>

          <Countdown />

          <div className="hero-layout">
            <div className="person-wrap reveal">
              <Image
                src={funnel2.heroImage}
                alt={funnel2.heroImageAlt}
                fill
                style={{ objectFit: "contain", objectPosition: "center center" }}
                priority
              />
              <div className="person-badge">
                <span className="person-name">{funnel2.heroPersonName}</span>
                <span className="person-sub">{funnel2.heroPersonSub}</span>
              </div>
            </div>

            <div className="meta-grid">
              {metaCards.map((card) => (
                <div className={`meta-card reveal ${card.delay}`} key={card.label}>
                  <div className="meta-icon-wrap">{card.icon}</div>
                  <div className="meta-label">{card.label}</div>
                  <div className="meta-value">{card.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-cta-block reveal">
            <div className="price-row">
              <span className="price-was">{pricing.currency}{pricing.priceWas}</span>
              <span className="price-badge">Today Only</span>
              <span className="price-now">{pricing.currency}{pricing.priceNow}</span>
            </div>
            <a href={`/checkout?funnel=${funnel2.slug}`} className="cta">
              Grab Your Ticket Now <div className="cta-arrow">→</div>
            </a>
            <div className="guarantee">🛡️ 100% Money Back Guarantee — Zero Risk</div>
            <div className="urgency">
              🔥 Only <span className="urgency-num">{tickets}</span> tickets left — booking closes once full
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ WHO */}
      <section className="who-section">
        <div className="who-inner">
          <span className="section-label reveal">Who This Is For</span>
          <h2 className="section-headline reveal">{funnel2.whoHeadline}</h2>
          <p className="section-sub reveal">{funnel2.whoSubline}</p>

          <div className="who-grid">
            <div className="who-card reveal">
              <span className="who-card-icon">{funnel2.whoCard1.icon}</span>
              <div className="who-card-title">{funnel2.whoCard1.title}</div>
              <ul className="who-list">
                {funnel2.whoCard1.points.map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
              <div className="who-card-footer">{funnel2.whoCard1.footer}</div>
            </div>

            <div className="who-card reveal reveal-delay-2">
              <span className="who-card-icon">{funnel2.whoCard2.icon}</span>
              <div className="who-card-title">{funnel2.whoCard2.title}</div>
              <ul className="who-list">
                {funnel2.whoCard2.points.map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
              <div className="who-card-footer">{funnel2.whoCard2.footer}</div>
            </div>
          </div>

          <div className="who-closing reveal">
            {funnel2.whoClosingText}{" "}
            <span>{funnel2.whoClosingAccent}</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ BLUEPRINT */}
      <section className="blueprint-section">
        <div className="blueprint-inner">
          <span className="section-label reveal">What We Cover</span>
          <h2 className="section-headline reveal">
            {funnel2.blueprintHeadline}
          </h2>
          <p className="section-sub reveal">{funnel2.blueprintSub}</p>

          <div className="timeline" ref={timelineRef}>
            <div className="timeline-line" ref={lineRef} />
            {funnel2.blueprintSteps.map((step, i) => (
              <div className={`t-row ${step.side} reveal`} key={i}>
                {step.side === "left" ? (
                  <>
                    <div className="t-content">
                      <div className="t-step-label">{step.step}</div>
                      <div className="t-title">{step.title}</div>
                      <p className="t-desc">{step.desc}</p>
                    </div>
                    <div
                      className={`t-icon${activeStep === i ? " t-icon--active" : ""}`}
                      ref={(el) => { iconRefs.current[i] = el; }}
                    >
                      {step.icon}
                    </div>
                    <div className="t-empty" />
                  </>
                ) : (
                  <>
                    <div className="t-empty" />
                    <div
                      className={`t-icon${activeStep === i ? " t-icon--active" : ""}`}
                      ref={(el) => { iconRefs.current[i] = el; }}
                    >
                      {step.icon}
                    </div>
                    <div className="t-content">
                      <div className="t-step-label">{step.step}</div>
                      <div className="t-title">{step.title}</div>
                      <p className="t-desc">{step.desc}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="cta-block reveal">
            <div className="price-row">
              <span className="price-was">{pricing.currency}{pricing.priceWas}</span>
              <span className="price-badge">Today Only</span>
              <span className="price-now">{pricing.currency}{pricing.priceNow}</span>
            </div>
            <a href={`/checkout?funnel=${funnel2.slug}`} className="cta">
              Grab Your Ticket Now <div className="cta-arrow">→</div>
            </a>
            <div className="guarantee">🛡️ 100% Money Back Guarantee — Zero Risk</div>
            <div className="urgency">
              🔥 Only <span className="urgency-num">{tickets}</span> tickets left — booking closes once full
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ COACHES */}
      <section className="coach-section">
        <div className="coach-inner">
          <span className="section-label reveal">Meet Your Coach</span>
          <h2 className="section-headline reveal" style={{ marginBottom: 48 }}>
            The People Behind Your <span className="accent">Race Blueprint</span>
          </h2>

          {/* Primary Coach */}
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
                {coaches.primary.bio.map((para, i) => <p key={i}>{para}</p>)}
              </div>
              <div className="coach-pills">
                {coaches.primary.credentials.map((pill) => (
                  <span className="coach-pill" key={pill}>{pill}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Secondary Coach */}
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

          {/* CTA */}
          <div className="cta-block reveal">
            <div className="price-row">
              <span className="price-was">{pricing.currency}{pricing.priceWas}</span>
              <span className="price-badge">Today Only</span>
              <span className="price-now">{pricing.currency}{pricing.priceNow}</span>
            </div>
            <a href={`/checkout?funnel=${funnel2.slug}`} className="cta">
              Grab Your Ticket Now <div className="cta-arrow">→</div>
            </a>
            <div className="guarantee">🛡️ 100% Money Back Guarantee — Zero Risk</div>
            <div className="urgency">
              🔥 Only <span className="urgency-num">{tickets}</span> tickets left — booking closes once full
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ FAQ */}
      <section className="faq-section">
        <div className="faq-inner">
          <h2 className="faq-headline reveal">Frequently Asked Questions</h2>
          <div className="faq-list">
            {funnel2.faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div className={`faq-item${isOpen ? " open" : ""}`} key={i}>
                  <button className="faq-question" onClick={() => toggle(i)} aria-expanded={isOpen}>
                    {faq.q}
                    <div className="faq-icon">{isOpen ? "−" : "+"}</div>
                  </button>
                  <div className="faq-answer">{faq.a}</div>
                </div>
              );
            })}
          </div>

          <div className="faq-cta-wrap reveal">
            <div className="price-row">
              <span className="price-was">{pricing.currency}{pricing.priceWas}</span>
              <span className="price-badge">Today Only</span>
              <span className="price-now">{pricing.currency}{pricing.priceNow}</span>
            </div>
            <a href={`/checkout?funnel=${funnel2.slug}`} className="cta">
              Grab Your Ticket Now <div className="cta-arrow">→</div>
            </a>
            <div className="guarantee">🛡️ 100% Money Back Guarantee — Zero Risk</div>
            <div className="urgency">
              🔥 Only <span className="urgency-num">{tickets}</span> tickets left — booking closes once full
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTABar funnel={funnel2.slug} />
    </main>
  );
}
