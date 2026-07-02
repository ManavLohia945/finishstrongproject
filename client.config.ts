// ─────────────────────────────────────────────────────────────────────────────
// CLIENT CONFIG — The Finish Strong Project
// Source of truth for all client-specific content across the funnel
// ─────────────────────────────────────────────────────────────────────────────

export interface WhoCard {
  icon: string;
  title: string;
  points: string[];
  footer: string;
}

export interface BlueprintStep {
  side: "left" | "right";
  icon: string;
  step: string;
  title: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface NextStep {
  title: string;
  desc: string;
}

export const clientConfig = {
  // ── Metadata ──────────────────────────────────────────────────────────────
  meta: {
    title: "The Finish Strong Project — Ironman Triathlon Webinar",
    description: "Join 18× Ironman Satyam Sahai & 2024 Australian Long Course Champion Mitch Kibby. Get your complete Sub-6 blueprint for Ironman Triathlon.",
    ogTitle: "The Finish Strong Project — Ironman Triathlon Webinar",
    ogDescription: "Join 18× Ironman Satyam Sahai & 2024 Australian Long Course Champion Mitch Kibby. Get your complete Sub-6 blueprint for Ironman Triathlon.",
  },

  // ── Brand / Footer ────────────────────────────────────────────────────────
  brand: {
    name: "The Finish Strong Project",
    instagramUrl: "#",
    youtubeUrl: "#",
    whatsappUrl: "#",
    copyrightYear: "2026",
  },

  // ── Event ─────────────────────────────────────────────────────────────────
  event: {
    dateDisplay: "12th July",
    timeDisplay: "11am IST",
    platform: "Live Zoom Session",
    countdownTarget: "2026-07-12T05:30:00Z",
    thankYouCommunityUrl: "https://chat.whatsapp.com/IgrcUDTD6CrCn9ve2wsfTl",
  },

  // ── Pricing ───────────────────────────────────────────────────────────────
  pricing: {
    currency: "₹",
    priceNow: "97",
    priceWas: "199",
    seatsTotal: 50,
  },

  // ── Audience Popup (legacy — not shown on main funnel) ────────────────────
  popup: {
    eyebrow: "THE FINISH STRONG PROJECT",
    headline: "HAVE YOU DONE A TRIATHLON\nOR MARATHON BEFORE?",
    option1: {
      icon: "✅",
      title: "Yes, I Have",
      sub: "I want to race stronger and finally go Sub-6",
      route: "/marathoner",
    },
    option2: {
      icon: "🚀",
      title: "No, This Is My First Time",
      sub: "I want to take on Ironman Triathlon as my next big challenge",
      route: "/marathoner",
    },
    footer: "Takes 1 second · Shows you the right blueprint instantly",
  },

  // ── Coaches ───────────────────────────────────────────────────────────────
  coaches: {
    primary: {
      name: "Satyam Sahai",
      title: "18× Ironman Finisher · Entrepreneur · CEO",
      actionImage: "/coach1-action.png",
      bio: [
        "I didn't start as an athlete. At 30, I was overweight, running a business, and had never run more than a kilometre in my life.",
        "What started as a desperate attempt to get fit turned into a marathon. Then a triathlon. Then Ironman. Then 18 of them.",
        "Today at 49, I run a company and train daily. I've built a system that works around the reality of a demanding life — not despite it.",
        "I've seen what breaks Indian athletes on race day — not lack of effort, but lack of the right structure. Wrong pacing. Wrong nutrition. Wrong plan for the wrong climate. I've made every one of those mistakes myself. And I've spent years building the system that fixes them.",
        "This webinar is that system — handed directly to you.",
      ],
      credentials: [
        "🏅 18× Ironman Finisher",
        "🇮🇳 Former Mr. India",
        "💼 Active CEO",
        "🎯 Ironman Triathlon",
      ],
    },
    secondary: {
      name: "Mitch Kibby",
      title: "Professional Triathlete · Director, i4 Coaching Australia",
      image: "/coach2.png",
      eyebrow: "THE COACHING SCIENCE BEHIND THE SYSTEM",
      quote: "Satyam's training methodology is built on the same Australian coaching system I've used with professional and amateur athletes globally. What makes it unique for Indian athletes is how it's been adapted for real-life schedules, Indian race conditions, and the specific demands of Ironman Triathlon. Mitch is in his 15th season of professional racing — with 7 Ironman podium finishes, two Ironman Triathlon World Championship appearances, and the 2024 Australian Long Course Championship title. He has produced 6 Ironman World Championship qualifiers through i4 Coaching and serves as a Triathlon Australia Performance Coach. Everything taught in this webinar is grounded in sport science — and I'll be in the room to answer your questions live.",
      credentials: [
        "🇦🇺 2024 Australian Long Course Champion",
        "🏆 Director, i4 Coaching Australia",
        "⏱️ 15 Years as a Pro Triathlete",
      ],
    },
  },

  // ── Thank-You Page ────────────────────────────────────────────────────────
  thankYou: {
    headline: "You're In.",
    steps: [
      {
        title: "Check Your WhatsApp & Email",
        desc: "Your Zoom link will be sent to you within the next few minutes. If you don't see it, check your spam folder.",
      },
      {
        title: "Save the Date",
        desc: "Block 12th July, 11am IST in your calendar right now. This is a live session — no recording, no replay.",
      },
      {
        title: "Come Prepared",
        desc: "Think about your current fitness baseline, your schedule constraints, and your race goal. Satyam and Mitch will map your exact path live.",
      },
    ] as NextStep[],
    communityBoxTitle: "Join the Exclusive WhatsApp Community",
    communityBoxBody: "Get race updates, training tips, and a reminder before the session. This is where Satyam shares things he doesn't post publicly.",
    communityCtaText: "Click Here to Join Our Community Now",
    communityHeroCtaText: "Click Here to Join Our WhatsApp Community",
    communityHeroNote: "Takes 10 seconds · Don't miss the session reminder",
    communityNote: "Takes 10 seconds · Don't miss the session reminder",
    bottomNote: "© 2026 All rights reserved.",
  },

  // ── Funnel 1 (legacy — not active) ───────────────────────────────────────
  funnel1: {
    slug: "executive",
    pill: "[FUNNEL_1_PILL_TEXT]",
    heroH1Line1: "[FUNNEL_1_HERO_HEADLINE_LINE_1]",
    heroH1Accent: "[FUNNEL_1_HERO_HEADLINE_ACCENT]",
    heroChallengeLine: "[FUNNEL_1_CHALLENGE_LINE]",
    heroBodyCopy: "[FUNNEL_1_BODY_COPY]",
    heroImage: "/coach1.png",
    heroImageAlt: "[FUNNEL_1_HERO_IMAGE_ALT]",
    heroPersonName: "[FUNNEL_1_HERO_PERSON_NAME]",
    heroPersonSub: "[FUNNEL_1_HERO_PERSON_SUB]",
    socialProof1: "[SOCIAL_PROOF_LINE_1]",
    socialProof2: "[SOCIAL_PROOF_LINE_2]",
    whoHeadline: "[WHO_SECTION_HEADLINE]",
    whoSubline: "Read the one that sounds like you",
    whoCard1: {
      icon: "[WHO_CARD_1_ICON]",
      title: "[WHO_CARD_1_TITLE]",
      points: ["[P1]", "[P2]", "[P3]", "[P4]", "[P5]"],
      footer: "[WHO_CARD_1_FOOTER]",
    } as WhoCard,
    whoCard2: {
      icon: "[WHO_CARD_2_ICON]",
      title: "[WHO_CARD_2_TITLE]",
      points: ["[P1]", "[P2]", "[P3]", "[P4]", "[P5]"],
      footer: "[WHO_CARD_2_FOOTER]",
    } as WhoCard,
    whoClosingText: "[WHO_CLOSING_TEXT]",
    whoClosingAccent: "[WHO_CLOSING_ACCENT]",
    blueprintHeadline: "[BLUEPRINT_HEADLINE]",
    blueprintSub: "[BLUEPRINT_SUBHEADLINE]",
    blueprintSteps: [
      { side: "left", icon: "🎯", step: "Step 1", title: "[STEP_1_TITLE]", desc: "[STEP_1_DESC]" },
      { side: "right", icon: "📋", step: "Step 2", title: "[STEP_2_TITLE]", desc: "[STEP_2_DESC]" },
      { side: "left", icon: "⚡", step: "Step 3", title: "[STEP_3_TITLE]", desc: "[STEP_3_DESC]" },
      { side: "right", icon: "🌡️", step: "Step 4", title: "[STEP_4_TITLE]", desc: "[STEP_4_DESC]" },
      { side: "left", icon: "🏅", step: "Step 5", title: "[STEP_5_TITLE]", desc: "[STEP_5_DESC]" },
    ] as BlueprintStep[],
    faqs: [
      { q: "[FAQ_1_Q]", a: "[FAQ_1_A]" },
      { q: "[FAQ_2_Q]", a: "[FAQ_2_A]" },
      { q: "[FAQ_3_Q]", a: "[FAQ_3_A]" },
      { q: "[FAQ_4_Q]", a: "[FAQ_4_A]" },
      { q: "[FAQ_5_Q]", a: "[FAQ_5_A]" },
      { q: "[FAQ_6_Q]", a: "[FAQ_6_A]" },
      { q: "[FAQ_7_Q]", a: "[FAQ_7_A]" },
      { q: "[FAQ_8_Q]", a: "[FAQ_8_A]" },
    ] as FaqItem[],
    thankYouSubheadline: "Your seat for the Ironman Triathlon Blueprint is confirmed.",
  },

  // ── Funnel 2 — Marathoner (ACTIVE) ────────────────────────────────────────
  funnel2: {
    slug: "marathoner",
    pill: "For Triathletes, Marathoners & Endurance Athletes",
    heroH1Main: "Crush Your First (or Next)",
    heroH1AnimatedText: "Ironman Goa 70.3 in Sub-6 Hours",
    heroChallengeLine: "Without guessing your training, gambling your pacing, or dying 10km from the finish",
    heroBodyCopy: "In this webinar, a 18× Ironman finisher hands you the complete 16 weeks Roadmap for acing Ironman Goa 70.3 — the same Australian-coached system that most Indian athletes spend years trying to piece together on their own, and never quite get right.",
    heroImage: "/coach1-alt.png",
    heroImageAlt: "Satyam Sahai — 18× Ironman Finisher",
    heroPersonName: "Satyam & Mitch",
    heroPersonSub: "18× Ironman · Pro Triathlete",
    socialProof1: "🇮🇳 Built by 18× Ironman — Satyam Sahai",
    socialProof2: "🇦🇺 2024 Australian Long Course Champion",
    whoHeadline: "This Webinar Is Built For You If —",
    whoSubline: "Read the one that sounds like you",
    whoCard1: {
      icon: "🏃",
      title: "You're a Marathoner or Endurance Athlete",
      points: [
        "You can swim 25m, ride a bike, and run 3–5km — not starting from zero, starting from ready",
        "You've proven you can endure — now you want to test yourself against the biggest physical challenge of your life",
        "The swim feels like the unknown and Ironman feels like a different universe",
        "You don't know how to train three sports simultaneously without burning out",
        "You're not perfect — maybe you drink socially, skip rest days — and you want someone who works with real life, not ideal conditions",
      ],
      footer: "In 9–12 months, you can be crossing the finish line of your first Ironman Triathlon. This webinar shows you exactly how.",
    } as WhoCard,
    whoCard2: {
      icon: "🏊",
      title: "You're a Triathlete Leaving Time on the Course",
      points: [
        "You've finished a Triathlon but the clock hasn't moved in seasons",
        "Your swim is functional but bleeding energy you need for the bike and run",
        "You go too hard on the bike and your run falls apart — every single time",
        "You've never had your brick sessions, VO2 zones, and race-day pacing working as one system",
        "Generic plans built for Western climates haven't accounted for this level of heat and humidity — and you've felt it.",
      ],
      footer: "This webinar shows you exactly what's breaking your race and gives you the precise system to finally go Sub-6.",
    } as WhoCard,
    whoClosingText: "Different starting points. One finish line.",
    whoClosingAccent: "One webinar.",
    blueprintHeadline: "We'll Cover Your Complete Race Blueprint",
    blueprintSub: "Every step is actionable. You leave with a plan, not just notes.",
    blueprintSteps: [
      {
        side: "left",
        icon: "🎯",
        step: "Step 1",
        title: "Are You Ready for Ironman Triathlon?",
        desc: "An honest assessment of your current swim, bike, and run baseline — and exactly what needs to happen between today and race day.",
      },
      {
        side: "right",
        icon: "📋",
        step: "Step 2",
        title: "The Training Structure That Actually Works",
        desc: "A periodised build — technique first, endurance second, race simulation third — designed around your real life and humid conditions.",
      },
      {
        side: "left",
        icon: "⚡",
        step: "Step 3",
        title: "The Three Skills That Separate Finishers From Racers",
        desc: "Swim technique, cycling cadence, run drills. These aren't fitness gains — they're time gains.",
      },
      {
        side: "right",
        icon: "🌡️",
        step: "Step 4",
        title: "Race-Day Pacing & Nutrition for Indian Conditions",
        desc: "The nutrition protocol that keeps you running at kilometre 18 when everyone around you is walking. Built for humid environment.",
      },
      {
        side: "left",
        icon: "🏅",
        step: "Step 5",
        title: "Your Sub-6 Game Plan — Live Q&A with Satyam & Mitch",
        desc: "Satyam and Mitch map out your specific path live. You leave knowing exactly what to do from tomorrow.",
      },
    ] as BlueprintStep[],
    faqs: [
      {
        q: "Will this webinar be live or pre-recorded?",
        a: "This webinar is 100% Live. No recordings, no replays. Your ₹97 ticket is for the live session only — Satyam and Mitch will be in the room answering questions in real time.",
      },
      {
        q: "I've never done a triathlon before. Is this too advanced for me?",
        a: "Not at all. If you can swim 25m, ride a bike, and run 3–5km, you have everything you need to start. This webinar covers both first-timers and returning athletes — there's a clear path for both.",
      },
      {
        q: "I'm already a triathlete. Will this be too basic for me?",
        a: "No. The system covers VO2 zone training, brick sessions, race-day pacing, and specific nutrition — all built around getting you to Sub-6. If you've been stuck at 6–8 hours, this is exactly where you need to be.",
      },
      {
        q: "How do I join the webinar?",
        a: "Once you register, you'll receive a Zoom link on your Email. Join from any device — phone, tablet, or laptop.",
      },
      {
        q: "Can I ask questions during the session?",
        a: "Yes. The final segment is a live Q&A with Satyam and Mitch where you can ask anything specific to your training, timeline, or race goals.",
      },
      {
        q: "Why is the ticket only ₹97?",
        a: "The ₹97 ensures only serious, committed athletes are in the room. It keeps the session focused, the Q&A valuable, and the energy high. If you attend and feel it wasn't worth it, we'll refund every rupee — no questions asked.",
      },
      {
        q: "What exactly will I walk away with?",
        a: "A complete race blueprint — your pacing strategy, nutrition framework, training structure, and a personalised path to Ironman Triathlon. Not notes. An actual plan you can act on the next morning.",
      },
    ] as FaqItem[],
    thankYouSubheadline: "Your seat for the Ironman Triathlon Blueprint is confirmed.",
  },
};
