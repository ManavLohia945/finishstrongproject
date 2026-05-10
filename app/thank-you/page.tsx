"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import { clientConfig } from "@/client.config";

const { thankYou, event, funnel1, funnel2 } = clientConfig;

function ThankYouContent() {
  const searchParams = useSearchParams();
  const funnel = searchParams.get("funnel") || funnel1.slug;

  const subheadline =
    funnel === funnel2.slug
      ? funnel2.thankYouSubheadline
      : funnel1.thankYouSubheadline;

  const backHref = funnel === funnel2.slug ? `/${funnel2.slug}` : `/${funnel1.slug}`;

  return (
    <main>
      <ScrollReveal />

      {/* ── TOP — navy ── */}
      <section className="ty-hero">
        <div className="ty-hero-inner">
          <div className="ty-check-icon reveal">✅</div>
          <h1 className="ty-headline reveal">{thankYou.headline}</h1>
          <p className="ty-subheadline reveal">{subheadline}</p>
          <div className="ty-pill reveal">
            {event.dateDisplay} · {event.timeDisplay} · {event.platform}
          </div>

          <div className="ty-hero-cta reveal">
            <p className="ty-hero-cta-label">One last step — join the community:</p>
            <a href={event.thankYouCommunityUrl} className="cta cta--amber">
              {thankYou.communityHeroCtaText}
              <div className="cta-arrow">→</div>
            </a>
            <p className="ty-wa-note" style={{ marginTop: "12px" }}>{thankYou.communityHeroNote}</p>
          </div>
        </div>
      </section>

      {/* ── MIDDLE — white ── */}
      <section className="ty-body">
        <div className="ty-body-inner">

          {/* What happens next */}
          <div className="ty-block reveal">
            <h2 className="ty-block-title">What Happens Next</h2>
            <div className="ty-steps">
              {thankYou.steps.map((step, i) => (
                <div className="ty-step" key={i}>
                  <div className="ty-step-num">{i + 1}</div>
                  <div className="ty-step-body">
                    <div className="ty-step-title">{step.title}</div>
                    <p className="ty-step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community box */}
          <div className="ty-whatsapp-box reveal">
            <div className="ty-wa-title">{thankYou.communityBoxTitle}</div>
            <p className="ty-wa-body">{thankYou.communityBoxBody}</p>
            <a href={event.thankYouCommunityUrl} className="cta cta--amber">
              {thankYou.communityCtaText}
              <div className="cta-arrow">→</div>
            </a>
            <p className="ty-wa-note">{thankYou.communityNote}</p>
          </div>

        </div>
      </section>

      {/* ── BOTTOM — navy ── */}
      <Footer />
      {/* <section className="ty-bottom">
        <p className="ty-bottom-text reveal">{thankYou.bottomNote}</p>
        <a href={backHref} className="ty-back-link reveal">
          ← Back to the webinar page
        </a>
      </section> */}
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouContent />
    </Suspense>
  );
}
