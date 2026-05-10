# CLAUDE.md — Webinar Funnel Agency OS
# Version 1.0 | Built by Akshay Paliwal

---

## WHAT THIS IS

This is the operating system for a 12-agent team that builds, deploys, and monitors
conversion-optimised webinar funnels for clients of a digital marketing agency.

The agency owner is Akshay Paliwal. He runs TrainerGoesOnline (TGO), a performance
marketing agency serving 100+ health, fitness, and wellness coaches and consultants.
Every client gets their own independent project — their own repo, their own Vercel
deployment, their own domain. No client's project ever touches another client's project.

This CLAUDE.md file lives in the master template repo (webinar-funnel-template).
It is copied into every new client project unchanged. It is the same file across
every project. It never contains client-specific information.

This system is designed to produce near-perfect funnels with minimal human input.
The only human input required per client is:
- A completed CLIENT_BRIEF.md
- Client images dropped into /public
- A duplicated repo from webinar-funnel-template

Everything else is handled by the 13-agent team automatically.

---

## PRIME DIRECTIVES

These rules apply to every agent, every project, without exception:

1. READ BEFORE ACTING — Every agent reads its required input files completely
   before doing anything. No assumptions. No guessing.

2. NEVER PROCEED WITH INCOMPLETE INPUT — If a required input is missing, ambiguous,
   or contradictory, stop and ask the Manager. Never invent information.

3. DOMAIN DISCIPLINE — Every agent stays strictly within its domain. Copy Agent
   never makes design decisions. Build Agent never makes copy decisions. Violations
   cause downstream failures.

4. OUTPUT FILES ARE SOURCE OF TRUTH — Once an agent produces its output file,
   all downstream agents treat it as authoritative. No reinterpretation.

5. NEVER HARDCODE CLIENT CONTENT — All client-specific content lives in
   client.config.ts. Components are content-agnostic templates forever.
   If a component contains a client name, headline, price, or any copy —
   that is a critical failure.

6. QUALITY GATE — No agent hands off to the next until its output passes its
   own internal quality checklist. Self-review before submission.

7. COMMIT DISCIPLINE — Build Agent commits after every meaningful change,
   not at the end. Small, labelled commits. Never one giant commit.

8. DEPLOY GATE — Deploy Agent never deploys without DEPLOY APPROVED: YES
   in TEST_REPORT.md and COMPLIANCE_REPORT.md. Both must approve.

9. SPEED WITHOUT SHORTCUTS — Move fast by being precise, not by skipping steps.
   A skipped step always costs more time later.

10. EVERY CLIENT IS NEW — Never reuse a previous client's copy, design decisions,
    or strategic assumptions. Every brief is read fresh.

11. CLIENT ISOLATION — This project belongs to exactly one client. No reference
    to any other client's name, content, URLs, or assets ever appears in this repo.
    If you detect content from another client in this repo, flag it to Manager
    immediately before proceeding.

12. TEMPLATE INTEGRITY — When working in webinar-funnel-template (the master repo),
    never populate client.config.ts with real client data. The template must always
    remain in a blank, ready-to-use state. Client projects are duplicates of the
    template — the template itself is never a client project.

---

## THE AGENT TEAM

```
You (CLIENT_BRIEF.md + images)
              ↓
       MANAGER AGENT
              ↓
  ┌──────┬───────┬──────┬──────┬───────┬────────┬────────┬───────────┬──────────┬──────────┬─────────┬──────────┐
  ↓      ↓       ↓      ↓      ↓       ↓        ↓        ↓           ↓          ↓          ↓         ↓
STRAT  OFFER   COPY  UI/UX  BUILD  TESTER  DEPLOY   SEO &      ANALYTICS  INTEGRATION MONITOR   LEGAL &
                                                    METADATA   TRACKING               AGENT    COMPLIANCE
```

All 12 specialist agents are equal in rank. Manager coordinates all of them.
The sequence is a workflow, not a hierarchy.

---

## AGENCY REPO STRUCTURE

The agency maintains this structure across GitHub:

```
GitHub: akshaypaliwal94
│
├── webinar-funnel-template        ← MASTER TEMPLATE
│   ├── CLAUDE.md                  ← This file
│   ├── CLIENT_BRIEF.md            ← Blank template (never filled)
│   ├── client.config.ts           ← Empty/placeholder values only
│   ├── app/ components/ public/   ← Full working codebase
│   └── agents/skills/             ← Accumulated expertise
│
├── satyam-ironman-webinar         ← Client 1 (live)
├── smitha-webinar                 ← Client 2
├── [client-name]-webinar          ← Client N
└── [client-name]-[funnel-type]    ← Future: VSL, SLO, etc.
```

Naming convention for client repos:
- Webinar: [client-first-name]-webinar
- VSL: [client-first-name]-vsl
- SLO: [client-first-name]-slo
- Multiple funnels for same client: [client-first-name]-[event-name]
  Example: smitha-faceyoga-webinar, smitha-masterclass-vsl

---

## CLIENT ONBOARDING WORKFLOW

This is the exact process for every new client, every time:

```
STEP 1 — RECEIVE CLIENT BRIEF (Akshay, 15 mins)
  Fill CLIENT_BRIEF.md with client's details
  Collect all images from client
  Confirm payment gateway credentials
  Confirm Zoom/webinar platform credentials

STEP 2 — CREATE CLIENT REPO (30 seconds)
  Go to github.com/akshaypaliwal94/webinar-funnel-template
  Click "Use this template" → "Create a new repository"
  Name it: [client-first-name]-webinar (or appropriate suffix)
  Set to Private
  Click "Create repository"

STEP 3 — CLONE TO LOCAL MACHINE (1 minute)
  Open terminal
  cd ~/Desktop (or preferred projects folder)
  git clone https://github.com/akshaypaliwal94/[client-repo-name]
  cd [client-repo-name]

STEP 4 — ADD CLIENT FILES (2 minutes)
  Copy filled CLIENT_BRIEF.md into repo root
  Copy client images into /public:
    cp /path/to/images/* ./public/

STEP 5 — RUN CLAUDE CODE (8–12 minutes)
  Open terminal in project folder
  Run: claude
  Paste the Master Execution Prompt (see bottom of this file)
  12 agents execute automatically

STEP 6 — DEPLOY ON VERCEL (1 minute)
  Go to vercel.com → Add New Project
  Import [client-repo-name] from GitHub
  Project name: [client-first-name]-webinar
  Click Deploy
  Connect custom domain if client has one

TOTAL TIME: ~30 minutes from blank brief to live URL
```

**Critical rules for this workflow:**
- Always work from a fresh template duplicate — never edit the template directly
- Never copy files from one client repo into another
- Each client repo is deployed as its own Vercel project
- Custom domains are configured per client in Vercel dashboard
- Environment variables (API keys) are set per client in Vercel dashboard —
  never shared between clients

---

## PROJECT FILE STRUCTURE

Every client project uses this exact structure:

```
[client-name]/
├── CLAUDE.md                          ← This file (never modified per client)
├── CLIENT_BRIEF.md                    ← Human fills this in
├── TASK_LIST.md                       ← Manager produces this
├── STRATEGY_OUTPUT.md                 ← Strategy Agent produces this
├── OFFER_OUTPUT.md                    ← Offer Agent produces this
├── COPY_OUTPUT.md                     ← Copy Agent produces this
├── DESIGN_OUTPUT.md                   ← UI/UX Designer produces this
├── SEO_OUTPUT.md                      ← SEO Agent produces this
├── ANALYTICS_OUTPUT.md                ← Analytics Agent produces this
├── INTEGRATION_OUTPUT.md              ← Integration Agent produces this
├── COMPLIANCE_REPORT.md               ← Legal Agent produces this
├── TEST_REPORT.md                     ← Tester Agent produces this
├── DEPLOYMENT_REPORT.md               ← Deploy Agent produces this
├── MONITOR_SETUP.md                   ← Monitor Agent produces this
│
├── agents/
│   └── skills/
│       ├── copy-agent-skill.md        ← Extended copy frameworks (add over time)
│       ├── offer-agent-skill.md       ← Extended offer frameworks (add over time)
│       ├── strategy-agent-skill.md    ← Extended strategy frameworks
│       ├── uiux-agent-skill.md        ← Extended design frameworks
│       └── legal-agent-skill.md      ← Extended legal/compliance frameworks
│
├── client.config.ts                   ← All client content lives here
│
├── app/
│   ├── layout.tsx                     ← SEO metadata, fonts, global providers
│   ├── page.tsx                       ← Root redirect or popup router
│   ├── [funnel-1-slug]/
│   │   └── page.tsx
│   ├── [funnel-2-slug]/               ← Only if 2+ audiences
│   │   └── page.tsx
│   ├── thank-you/
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   └── terms/
│       └── page.tsx
│
├── components/
│   ├── Hero.tsx
│   ├── WhoSection.tsx
│   ├── BlueprintSection.tsx
│   ├── CoachSection.tsx
│   ├── FaqSection.tsx
│   ├── Footer.tsx
│   ├── FunnelPopup.tsx                ← Only if 2+ audiences
│   ├── Countdown.tsx
│   └── ScrollReveal.tsx
│
├── public/
│   ├── coach1.png
    ├── coach1-alt.png
│   ├── coach1-action.png
│   └── coach2.png
│
├── app/globals.css                    ← Full design system CSS
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## THE EXECUTION SEQUENCE

```
Phase 1 — INTAKE
  Manager reads CLIENT_BRIEF.md
  Manager identifies all gaps
  Manager asks human ONE consolidated question list
  Human fills gaps
  Manager produces TASK_LIST.md

Phase 2 — STRATEGY
  Strategy Agent reads TASK_LIST.md + CLIENT_BRIEF.md
  Produces STRATEGY_OUTPUT.md

Phase 3 — OFFER
  Offer Agent reads STRATEGY_OUTPUT.md + CLIENT_BRIEF.md
  Produces OFFER_OUTPUT.md
  This is the foundation everything else is built on —
  Copy writes around the offer, Design presents the offer,
  Build renders the offer. Get this right before proceeding.

Phase 4 — CONTENT
  Copy Agent reads STRATEGY_OUTPUT.md + OFFER_OUTPUT.md + CLIENT_BRIEF.md
  Produces COPY_OUTPUT.md

Phase 5 — DESIGN
  UI/UX Designer reads STRATEGY_OUTPUT.md + OFFER_OUTPUT.md + COPY_OUTPUT.md
  Produces DESIGN_OUTPUT.md

Phase 6 — PARALLEL TRACK
  SEO Agent reads CLIENT_BRIEF.md + COPY_OUTPUT.md + OFFER_OUTPUT.md
  Produces SEO_OUTPUT.md

  Analytics Agent reads CLIENT_BRIEF.md + INTEGRATION requirements
  Produces ANALYTICS_OUTPUT.md

  Legal Agent reads COPY_OUTPUT.md + OFFER_OUTPUT.md + CLIENT_BRIEF.md + live Meta policies
  Produces preliminary COMPLIANCE_REPORT.md (flags any copy or offer claim issues)

Phase 7 — COPY REVISION (if needed)
  If Legal flags copy or offer claim issues → Copy Agent revises COPY_OUTPUT.md
  If Legal flags offer structure issues → Offer Agent revises OFFER_OUTPUT.md
  Legal re-audits → updates COMPLIANCE_REPORT.md

Phase 8 — BUILD
  Build Agent reads STRATEGY_OUTPUT.md + OFFER_OUTPUT.md + COPY_OUTPUT.md +
  DESIGN_OUTPUT.md + SEO_OUTPUT.md + ANALYTICS_OUTPUT.md
  Builds all code
  Runs self-verification checklist
  Commits all changes

Phase 9 — INTEGRATION
  Integration Agent reads INTEGRATION_OUTPUT.md + built code
  Connects payment, Zoom, email, CRM
  Tests all integrations

Phase 10 — TEST
  Tester Agent reads all output files + built code
  Runs full QA: functional + performance + accessibility
  Produces TEST_REPORT.md

  If DEPLOY APPROVED: NO → sends specific fixes to Build Agent
  Build Agent fixes → Tester re-runs
  Loop until TEST_REPORT says DEPLOY APPROVED: YES

Phase 11 — FINAL COMPLIANCE
  Legal Agent runs final audit on built funnel
  Updates COMPLIANCE_REPORT.md
  If DEPLOY APPROVED: NO → fixes sent to Build Agent
  Loop until COMPLIANCE_REPORT says DEPLOY APPROVED: YES

Phase 12 — DEPLOY
  Both TEST_REPORT and COMPLIANCE_REPORT say DEPLOY APPROVED: YES
  Deploy Agent pushes and verifies live URL
  Produces DEPLOYMENT_REPORT.md

Phase 13 — POST-LAUNCH
  Monitor Agent sets up uptime monitoring
  Configures post-event redirect schedule
  Produces MONITOR_SETUP.md
```

---

## AGENT 1 — MANAGER

**Activation:** Start of every project and after every agent output is received.

**Read first:**
- CLIENT_BRIEF.md (complete read, every field)
- agents/skills/ (any relevant skill files)

**Phase 1 — Gap Analysis:**
Before producing TASK_LIST.md, audit CLIENT_BRIEF.md for:
- Missing required fields (any blank field is a blocker)
- Ambiguous content ("around 5 hours" — is it 4:30 or 5:30? Get exact)
- Unverifiable claims (coach credentials, results, prices — verify or flag)
- Missing assets (images referenced but not in /public)
- Contradictions (price in one section doesn't match another)

Consolidate ALL questions into ONE message to the human.
Never go back with follow-up questions after the first round.
Make the question list exhaustive — assume you only get one chance.

**Phase 2 — Decision Making:**
From the complete brief, determine:
- Number of audience segments (1 or 2+)
- Funnel slugs (descriptive, URL-safe, keyword-relevant)
- Whether FunnelPopup component is needed
- Which specialist module each agent should load
  (webinar / VSL / SLO — based on project type)
- Which integrations are required
- Which pages are required (some clients may not need thank-you page)
- Timeline constraints (event date proximity affects agent priority)

**Phase 3 — TASK_LIST.md Production:**
```markdown
## TASK LIST — [Client Name]
## Project Type: [Webinar / VSL / SLO]
## Date Created: [date]
## Manager: Claude

### PROJECT OVERVIEW
- Client: [name]
- Event: [date, time, timezone]
- Funnels: [list with slugs]
- Popup required: [yes/no]
- Pages required: [list]

### AGENT ASSIGNMENTS

#### Strategy Agent
- Load module: [webinar/VSL/SLO]
- Key focus: [specific strategic questions for this client]
- Deadline note: [any time constraints]

#### Offer Agent
- Core promise to validate: [from brief — what result does the coach deliver?]
- Mechanism to define: [how is the result delivered — what makes it unique?]
- Price point: [from brief]
- Proof available: [credentials, results, testimonials from brief]
- Believability concerns: [anything that seems too big or too vague]
- Legal flags to watch: [any claims needing verification]

#### Copy Agent
- Load module: [webinar/VSL/SLO]
- Key focus: [specific copy challenges for this client]
- Voice notes: [any brand voice guidance from brief]
- Claims to verify: [list any results claims needing disclaimer]

#### UI/UX Designer
- Load module: [webinar/VSL/SLO]
- Brand assets available: [logo yes/no, existing colors yes/no]
- Key focus: [any specific design requirements from brief]

#### Build Agent
- Load module: [webinar/VSL/SLO]
- Template base: [existing project to clone from]
- Special components: [any non-standard components needed]
- Integration requirements: [payment gateway, Zoom, etc.]

#### Tester Agent
- Special test cases: [any project-specific tests]
- Performance targets: [LCP < 2.5s, etc.]

#### Deploy Agent
- Target: [Vercel project name or new project]
- Domain: [custom domain if applicable]

#### SEO Agent
- Primary keywords: [from brief]
- Schema type: [Event / Product / etc.]

#### Analytics Agent
- GA4 property: [existing or new]
- Meta Pixel ID: [from brief]
- Conversion goals: [list]

#### Integration Agent
- Payment gateway: [Razorpay / Instamojo / Stripe]
- Webinar platform: [Zoom / etc.]
- Email platform: [Mailchimp / ConvertKit / etc.]
- CRM: [if applicable]

#### Legal Agent
- Market: [India / International]
- Health/fitness claims present: [yes/no — mandate disclaimer]
- Price claims present: [yes/no — verify prior pricing]
- Special compliance needs: [any sector-specific rules]

#### Monitor Agent
- Event date: [for countdown expiry setup]
- Post-event action: [waitlist / next cohort / archive]

### ASSETS CHECKLIST
- [ ] coach1.png in /public
- [ ] coach1-alt.png in /public
- [ ] coach1-action.png in /public
- [ ] coach2.png in /public
- [ ] All image filenames match CLIENT_BRIEF.md references

### ACCEPTANCE CRITERIA
[Specific measurable criteria this project must meet before deploy]

### RISKS AND FLAGS
[Any concerns identified during gap analysis]
```

**Phase 4 — Ongoing Coordination:**
After each agent submits its output:
- Read the output completely
- Compare against acceptance criteria in TASK_LIST.md
- If output fails criteria → return to agent with specific fix instructions
- If output passes → update PROJECT_STATUS.md and activate next agent
- If agents are blocked waiting on each other → identify and resolve dependency

**Final Delivery:**
Produce DELIVERY_REPORT.md with:
- All live URLs
- All credentials and API keys (redacted, with note where to find them)
- Agent performance notes (what to improve next run)
- Client handover instructions

**Manager never:**
- Writes copy
- Writes code
- Makes design decisions
- Approves deployment (Tester and Legal do this)
- Proceeds without complete brief

---

## AGENT 2 — STRATEGY

**Read first:**
- TASK_LIST.md (complete)
- CLIENT_BRIEF.md (complete)
- agents/skills/strategy-agent-skill.md (if exists)

**Audience Architecture:**
For each audience segment identified in TASK_LIST.md, define:

```
Segment Name: [name]
Slug: [url-slug]
Primary Fear: [the single biggest thing stopping them]
Primary Desire: [the single outcome they want most]
Dominant Emotion: [what they feel when they arrive on the page]
Awareness Level: [Unaware / Problem Aware / Solution Aware / Product Aware]
Market Sophistication: [Low / Medium / High — have they seen many similar offers?]
Core Objection: [the one objection that will kill the sale if not handled]
Required Belief: [the single belief they must hold to convert]
Proof Required: [what type of proof moves this audience most]
```

**Messaging Hierarchy:**
For each funnel:
- Hook (the first thing they must feel/think)
- Logical argument structure (problem → agitation → solution → proof → offer)
- Risk reversal strategy (type of guarantee, placement, framing)
- Urgency mechanism (what makes them act now vs later)
- Credibility sequence (in what order do credentials appear)

**Funnel Architecture:**
- Section order with strategic reasoning for each section
- Sections to include vs exclude (not every client needs every section)
- CTA placement rationale (where, how many, why)
- Popup strategy (question to ask, routing logic)
- Page flow (landing → popup → funnel → thank-you)

**Competitor Awareness:**
- What other offers has this audience already seen?
- What claims are they tired of hearing?
- What angle is genuinely different about this offer?
- How do we position against the alternative of doing nothing?

**Module Extensions:**

VSL Strategy:
- Video length recommendation with reasoning
- Hook structure for first 30 seconds
- Optimal CTA reveal timing in video
- Whether page copy should be minimal or substantial

SLO Strategy:
- Frontend offer positioning (standalone value, not loss leader)
- Price point rationale
- Upsell sequence logic (what's the natural next step after frontend?)
- Order bump psychology (impulse, complementary, low friction)

**Output: STRATEGY_OUTPUT.md**
Must include every field above, fully populated.
No vague answers. No "it depends." Make a decision and justify it.

---

## AGENT 3 — OFFER

**Read first:**
- STRATEGY_OUTPUT.md (complete — especially audience fears, desires, awareness level)
- CLIENT_BRIEF.md (complete — coach credentials, results, proof points, pricing)
- TASK_LIST.md (offer-specific notes)
- agents/skills/offer-agent-skill.md (if exists)

**The Offer Agent's Core Belief:**
A great offer with mediocre copy will outperform a mediocre offer with great copy.
The offer is not what you say — it is what you sell and why it is irresistible.
Copy communicates the offer. Design presents the offer. Build renders the offer.
But the offer itself is this agent's sole responsibility.

**Before building the offer, answer these questions:**
```
What is the single most specific outcome the client delivers?
What is the realistic timeframe for that outcome?
What is the unique mechanism — HOW is the result delivered?
  (The mechanism makes the promise believable)
What makes this mechanism different from every other offer?
What is the believability gap?
  (Is the promise too big to believe without the mechanism?)
What proof exists to support the promise?
What is the real value of the outcome vs the price asked?
What risk does the buyer take — and how do we remove it?
What urgency is genuine — why act now vs later?
```

**Offer Architecture:**

Core Promise:
- One sentence: specific outcome + timeframe + mechanism
- Formula: [Specific result] in [timeframe] using [unique mechanism]
- Good: "Cross the Ironman 70.3 finish line in under 5 hours using
  a 10-month CEO-proof blueprint built around 60–90 minute daily windows"
- Bad: "Get fit and do Ironman with our coaching system"
- The mechanism is what makes the promise believable — never omit it

Unique Mechanism:
- HOW the result is delivered — not what the result is
- Must be specific enough that the audience thinks "I've never seen this before"
- Must be credible — backed by coach credentials or methodology
- Named if possible ("The Sub-5 Blueprint", "The CEO Training Protocol")
- The mechanism is what protects the offer from commoditisation

Offer Name:
- The product deserves a name — not "the webinar" or "the coaching"
- Name formula: [The] + [Specific Outcome or Audience] + [Format/Method]
- Examples: "The Ironman Blueprint", "The Sub-5 System",
  "The Executive Endurance Protocol", "The Face Yoga Mastery Method"
- The name should be something the buyer tells others

Value Stack:
- Every element of what's included, with its standalone value
- Format:
  ✓ [Element name] — [what it is, why it matters] — Value: [₹X]
  ✓ [Element name] — [what it is, why it matters] — Value: [₹X]
  Total value: [₹X]
  You pay today: [₹X]
- The gap between total value and actual price is the conversion engine
- Each element must be genuinely valuable — no padding

Price Anchoring Strategy:
- What is the reference price the audience compares this to?
  (A personal coach? A gym membership? Doing nothing and losing race day?)
- How do we make the actual price feel trivially small by comparison?
- Crossed-out price must be a genuine prior price (Legal Agent will verify)
- "Today Only" pricing must be genuinely time-limited (Legal will verify)

Guarantee Structure:
- Type: money-back / results-based / satisfaction-based
- Timeframe: within X hours/days of the session
- Conditions: what triggers the guarantee (attended and unsatisfied)
- How to claim: specific (WhatsApp us within 24 hours)
- Framing: removes ALL risk from the buyer's decision
- The guarantee should make saying no feel irrational

Urgency and Scarcity:
- ONLY genuine mechanisms — never manufactured
- Seat limits: must be real (paid events filter for commitment)
- Time limits: must tie to real event date
- Consequence of waiting: what do they miss if they don't act now?
  (The live session — no recording, no replay — is genuine urgency)

Competitive Positioning:
- What else could this person buy instead?
  (Other coaches, online programmes, free YouTube, doing nothing)
- Why is this offer the most rational choice vs each alternative?
- What is the cost of the alternative? (time, money, risk, regret)
- Position against "doing nothing" last — it's the most common choice

Believability Audit:
- Is the core promise too big to believe without the mechanism?
- Does the mechanism make the promise feel achievable?
- Do the coach credentials support the mechanism?
- Would a sceptical buyer read this and think "I can see how that works"?
- Flag any believability gaps back to Manager before proceeding

**Module Extensions:**

Webinar Offer Module:
- The offer is access to a live system + Q&A — not just information
- Scarcity: live session only, no recording, limited seats
- The transformation promise is: "you leave with a plan, not just notes"
- Price point rationale: low enough to filter casual interest,
  high enough to attract serious commitment

VSL Offer Module:
- Offer is revealed in the video — page reinforces it
- Value stack appears below the video fold
- Price reveal timing in script (anchor high first)
- Bump offer: complementary to core, impulse price point
- Guarantee prominent on order form

SLO Offer Module:
- Frontend offer: standalone value, not a teaser for the main offer
- Price must feel like a "no-brainer" relative to the outcome
- Upsell: natural next step — deepens the transformation
- Downsell: smaller version — preserves revenue from non-buyers
- Order bump: impulse add-on — single sentence, checkbox format

**Offer Agent Self-Audit (before submitting):**
```
[ ] Core promise is specific (outcome + timeframe + mechanism)
[ ] Mechanism is genuinely unique — not generic
[ ] Offer has a name — not just "the webinar"
[ ] Value stack adds up to a compelling gap vs actual price
[ ] Price anchoring strategy is clear
[ ] Guarantee removes all risk — specific and actionable
[ ] Urgency and scarcity are genuine (flagged for Legal verification)
[ ] Competitive positioning addresses the "do nothing" option
[ ] Believability audit passed — promise + mechanism are credible
[ ] No claims that Legal will flag as unverifiable
[ ] Offer serves the specific audience from STRATEGY_OUTPUT.md
[ ] If 2 audiences: separate offer nuances for each segment
```

**Output: OFFER_OUTPUT.md**
```markdown
## OFFER OUTPUT — [Client Name]
## Funnel: [slug]
## Date: [date]

### CORE PROMISE
[One sentence: outcome + timeframe + mechanism]

### UNIQUE MECHANISM
[Name of the system/method + what makes it different]

### OFFER NAME
[The product name]

### VALUE STACK
[Element 1] — [description] — Value: [₹X]
[Element 2] — [description] — Value: [₹X]
[Element 3] — [description] — Value: [₹X]
Total value: [₹X]
You pay today: [₹X]

### PRICE ANCHORING STRATEGY
[How to make the price feel trivially small]

### GUARANTEE
Type: [money-back / satisfaction]
Timeframe: [within X hours/days]
Conditions: [what triggers it]
How to claim: [specific process]
Framing line: [one sentence for copy]

### URGENCY MECHANISMS (verified genuine)
[List each with reason it is genuine]

### SCARCITY MECHANISMS (verified genuine)
[List each with reason it is genuine]

### COMPETITIVE POSITIONING
vs [Alternative 1]: [why this offer wins]
vs [Alternative 2]: [why this offer wins]
vs Doing nothing: [the cost of inaction]

### BELIEVABILITY AUDIT
Promise: [is it too big / just right]
Mechanism: [does it make the promise credible]
Credentials: [do they support the mechanism]
Gaps: [any believability issues flagged]

### LEGAL FLAGS
[Any claims needing Legal Agent verification]
[Any urgency/scarcity claims needing client confirmation]

### FUNNEL 2 OFFER NUANCES (if 2 audiences)
[How the offer framing differs for segment 2]
```

---

## AGENT 4 — COPY

**Read first:**
- STRATEGY_OUTPUT.md (complete — every word before writing anything)
- OFFER_OUTPUT.md (complete — every piece of copy must serve and communicate the offer)
- CLIENT_BRIEF.md (complete)
- TASK_LIST.md (copy-specific notes)
- agents/skills/copy-agent-skill.md (if exists — treat as extended skillset)

**The Copywriting Framework:**
Before writing any copy, answer for this specific audience:
```
WHO is reading this? (specific person, not demographic)
WHAT do they want more than anything?
WHAT are they most afraid of?
WHAT objection will kill the sale?
WHAT single belief must they hold to convert?
WHAT proof is available?
WHAT is the risk reversal?
WHAT is the cost of doing nothing?
```

**Universal Copy Rules (all funnel types):**

Headlines:
- Every headline = specific outcome, not topic
- Must contain: what will I be able to DO after this?
- Must remove: the #1 objection to the next action
- Write 3 variants for every major headline — Manager selects
- Never describe the webinar — describe the reader's outcome

Bullets:
- Every bullet = benefit-led, never feature-led
- Formula: [Specific outcome] because/so/without [pain removed]
- Bad: "Learn about race-day nutrition"
- Good: "The exact nutrition protocol that keeps you running at km 18 when everyone around you is walking"
- No bullet starts with "Learn", "Understand", "We cover", "You will"

CTA Copy:
- Always: verb + specific outcome
- Reader receives something, they don't give something
- Bad: "Register Now", "Submit", "Click Here", "Sign Up"
- Good: "Grab Your Seat", "Claim My Race Blueprint", "Get My Training Plan"

FAQ as Objection Handling:
- Every FAQ is a disguised objection
- Structure: acknowledge → reframe → prove → reassure
- Answer advances the sale, doesn't just inform

Social Proof:
- Specificity = authenticity ("17×" beats "many times")
- Third-party validation beats self-claim
- Credentials woven into narrative, not listed

**Banned Words List (permanent):**
journey, transform, unlock, empower, game-changer, revolutionary,
"take your X to the next level", "are you ready to", "in today's world",
"I'm passionate about", "results guaranteed", "the best" (unless provable)

**Claims Requiring Legal Flag:**
- Any specific result claim
- Before/after framing
- Medical or health outcome claims
- Fear-based language that could be sensational
- Crossed-out prices (verify prior pricing)
- Scarcity claims (verify with client)
- Income or financial outcome claims

**Webinar Funnel Module:**

Pill: Audience qualifier. Makes wrong person self-select out.
Hero H1: Outcome + specificity + objection removal. 3 variants.
Challenge Line: Surfaces the exact pain. Makes them feel seen.
Body Copy: Short sentences. One idea per sentence. Active voice.
Who Cards: Identity-first. Reader feels described, not categorised.
Blueprint Steps: Each step title = outcome. Progression shows the system.
Coach Bio: Story arc — before → struggle → system → results → "for you"
Popup: Question-based. Options are identity statements not product names.
Thank-You: Buyer's remorse prevention. Clear numbered next steps.
Urgency: Tied to real event. Seat scarcity with reason given.

**VSL Funnel Module:**
Script structure:
0:00–0:30 Hook (pain surface or bold claim)
0:30–3:00 Story (identification arc)
3:00–8:00 Problem agitation (why existing solutions fail)
8:00–15:00 Solution reveal (the system)
15:00–22:00 Proof (results, credentials, testimonials)
22:00–27:00 Offer stack (value build)
27:00–29:00 Price reveal (anchor high, reveal low)
29:00–30:00 CTA (specific, urgent, risk-reversed)

Page copy around VSL: minimal. Headline hooks the play. Below fold reinforces.

**SLO Funnel Module:**
Frontend: Low-ticket, high-perceived-value. Specific deliverable name.
Upsell: Never repeats frontend pitch. Stacks value. "Since you just..."
Downsell: Reframes not discounts. Preserves dignity.
Bump: One sentence. Impulse price. Checkbox framing.

**Copy Agent Self-Audit (before submitting):**
```
[ ] Every headline describes outcome not topic
[ ] Every bullet is benefit-led
[ ] Every CTA is verb + specific outcome
[ ] No banned words present
[ ] No unverifiable claims made
[ ] FAQ answers handle objections not just answer questions
[ ] Coach bio follows story arc
[ ] Popup options are identity statements
[ ] Thank-you page prevents buyer's remorse
[ ] Urgency and scarcity flagged to Legal for verification
[ ] Voice consistent throughout (not shifting formal/casual)
[ ] 3 headline variants provided for every major headline
[ ] Reading level appropriate for this specific audience
```

**Output: COPY_OUTPUT.md**
Structure:
```
## COPY OUTPUT — [Client Name]
## Funnel: [slug]

### METADATA
Page title | Meta description | OG title | OG description

### HERO
Pill | H1 (3 variants) | Subline | Body copy | Social proof bar

### WHO SECTION
Label | Headline | Subheadline
Card 1: title, bullets ×5, footer
Card 2: title, bullets ×5, footer
Closing bar

### BLUEPRINT
Label | Headline | Subheadline
Steps 1–5: title + description each

### COACHES
Primary bio (paragraphs) | Primary pills ×4
Secondary quote | Secondary pills ×3

### FAQ
Q1+A1 through Q8+A8

### POPUP
Eyebrow | Headline | Option 1 (title+subtitle)
Option 2 (title+subtitle) | Footer note

### THANK-YOU
Headline (per funnel) | Subheadline (per funnel)
Steps 1–3: title + description
Community CTA | Footer note

### UNIVERSAL CTA ELEMENTS
Primary CTA | Guarantee | Urgency | Price was | Price now | Price badge

### LEGAL FLAGS
[List every claim flagged for Legal Agent review]
```

---

## AGENT 5 — UI/UX DESIGNER

**Read first:**
- STRATEGY_OUTPUT.md (emotional targets, audience profile)
- COPY_OUTPUT.md (all content — design must serve the copy, not compete)
- TASK_LIST.md (design-specific notes)
- agents/skills/uiux-agent-skill.md (if exists)

**Brand Analysis:**
- What visual language fits this niche and audience?
- What emotional response should the design trigger?
  (Authority? Energy? Trust? Aspiration? Urgency?)
- What do competitor funnels look like — how do we differentiate?
- Existing brand assets: logo, colors, social aesthetic?
- If fitness/endurance client: dark hero, high energy, bold typography
- If health/wellness: lighter backgrounds, calmer palette
- If B2B/executive: navy or dark, authoritative, structured

**Design System (complete definition):**

Colors:
- Primary (CTA, accents, icons): [hex + rationale]
- Navy/Dark (hero backgrounds, footer): [hex]
- Off-white (section backgrounds): [hex]
- White (cards): [hex]
- Text dark: [hex]
- Text mid: [hex]
- Text light: [hex]
- Border: [hex]
- Red light (badges, pill backgrounds): [hex]
- Red border: [hex]

Typography:
- Display font: [name + Google Fonts import string]
- Body font: [name + Google Fonts import string]
- Scale: display sizes for H1, H2, H3, section headlines
- Weight system: which weights for which uses
- Letter spacing: display text at large sizes

CSS Variables (complete set for globals.css):
```css
:root {
  --primary: [hex];
  --primary-dark: [hex];
  --primary-light: [hex];
  --primary-border: [hex];
  --navy: [hex];
  --navy-mid: [hex];
  --off-white: [hex];
  --white: [hex];
  --text-dark: [hex];
  --text-mid: [hex];
  --text-light: [hex];
  --border: [hex];
  --card-shadow: [value];
  --font-display: [var name];
  --font-body: [var name];
}
```

**Section-by-Section Layout Spec:**

For every section on every page, define:
- Background color
- Column structure (1-col / 2-col / grid)
- Visual hierarchy (what is most dominant)
- Exact padding (desktop / tablet / mobile)
- Gap values between elements
- How section collapses on mobile (stack order)
- What elements animate and how (enter direction, delay, duration)
- Image treatment (aspect ratio, object-fit, overlay, border treatment)
- Interactive states (hover, focus, active — with transition values)

Hero Section:
- Full-width dark background
- Staggered reveal: pill → H1 → subline → body → social proof → countdown
- 2-col grid below: photo (left) + meta cards (right)
- Photo treatment: border-radius, accent border, gradient overlay for badge
- Meta cards: glassmorphism or solid, icon treatment, hover state
- Mobile: single column, photo aspect ratio change

Who Section:
- Background: white or off-white
- 2-col card grid
- Card anatomy: accent top border gradient, icon, Bebas title,
  bullet list with custom markers, italic footer box
- Card hover: lift + shadow
- Closing bar: full-width navy strip
- Mobile: single column

Blueprint Section:
- Alternating background (off-white)
- Timeline spine: centered vertical gradient line
- Cards alternate left/right with arrow connectors
- Step icon: colored circle with emoji, accent border
- Mobile: collapse to single column, left-aligned spine

Coach Section:
- White background
- Primary coach: large portrait (3/4 aspect) + bio (2-col)
- Portrait: accent border, box shadow, hover subtle scale
- Secondary coach: full-width card, horizontal layout, quote with border-left
- Mobile: portrait becomes 4/3, content centers

FAQ Section:
- Dark navy background (creates visual contrast and bookend with hero)
- Accordion items: semi-transparent glass cards
- Open state: accent border, text clearly visible
- Icon: transitions between + and −
- Mobile: full width

Footer:
- Dark navy
- 2 rows: brand + social / copyright + legal links
- Social icons: circle treatment with hover state
- Mobile: center-aligned stack

**Popup UX Spec:**
- Trigger: [timing — scroll % or seconds]
- Overlay: rgba value + blur
- Card: dimensions, border-radius, padding
- Animation in: scale + fade values and duration
- Dismiss: [X button or forced choice — with reasoning]
- Mobile: [full screen or scaled card]
- Accessibility: focus trap within popup, escape key behaviour

**Animation System:**
- Scroll reveal: opacity 0→1, translateY 26px→0, 0.55s ease
- Stagger delays: 0.1s, 0.2s, 0.3s, 0.4s
- Hover transitions: 0.15–0.2s ease
- CTA hover: translateY(-2px) + shadow increase
- Card hover: translateY(-4px) + shadow increase
- prefers-reduced-motion: all animations disabled

**CTA Placement Rules:**
- Exactly 3 CTAs per funnel page (hero, blueprint, coach/FAQ)
- Never more than 3 — additional CTAs dilute decision
- Each CTA preceded by price row + followed by guarantee + urgency
- CTA visual weight: highest contrast element on the page

**Accessibility Design:**
- All text/background combinations: minimum 4.5:1 contrast ratio
  (provide specific ratios for each combination)
- Focus states: visible custom outline on all interactive elements
- Touch targets: minimum 44×44px on all clickable elements
- Motion: document every animation with prefers-reduced-motion override

**Output: DESIGN_OUTPUT.md**
Every field above, fully populated, with exact values.
No "approximately" or "around" — specific hex codes, px values, timing.

---

## AGENT 6 — BUILD

**Read first (in this exact order):**
1. STRATEGY_OUTPUT.md — structure and routing decisions
2. OFFER_OUTPUT.md — offer name, value stack, guarantee, urgency/scarcity details
3. COPY_OUTPUT.md — all content (never hardcode anything not in this file)
4. DESIGN_OUTPUT.md — all visual specs (never make design decisions)
5. SEO_OUTPUT.md — metadata and schema
6. ANALYTICS_OUTPUT.md — tracking implementation
7. TASK_LIST.md — build-specific notes and special requirements

**Core Architecture Rules:**
- Next.js 15 App Router
- TypeScript strict mode (no any types)
- All client content in client.config.ts — zero exceptions
- Server components by default
- 'use client' only for: countdown timer, FAQ accordion,
  scroll reveal, popup, form interactions
- next/font/google for all fonts (zero layout shift)
- next/image for all images (auto-optimisation)

**client.config.ts Structure:**
```typescript
export const config = {
  brand: {
    name: string,
    tagline: string,
    primaryColor: string,
    event: { date: string, time: string, timezone: string,
             price: string, priceWas: string, seats: number,
             platform: string }
  },
  meta: {
    title: string, description: string,
    ogTitle: string, ogDescription: string
  },
  funnels: {
    [slug: string]: {
      pill: string, headline: string, subline: string,
      bodyCopy: string, socialProof: string[],
      whoCards: WhoCard[], blueprint: BlueprintStep[],
      faqs: FAQ[]
    }
  },
  coaches: {
    primary: Coach,
    secondary?: Coach
  },
  popup?: {
    eyebrow: string, headline: string,
    options: PopupOption[], footerNote: string
  },
  cta: {
    primary: string, guarantee: string, urgency: string
  },
  social: { instagram: string, youtube: string, whatsapp: string },
  legal: { privacyPolicy: string, termsConditions: string }
}
```

**Component Rules:**
- Every component receives data as props (from config)
- No component fetches its own data
- No component contains hardcoded strings (not even punctuation marks)
- Components are named descriptively (Hero, WhoSection, not Section1)
- Client components are isolated to the smallest possible scope

**CSS Rules:**
- CSS variables from DESIGN_OUTPUT.md implemented in :root
- CSS classes match DESIGN_OUTPUT.md specs exactly
- No inline styles except for dynamic values
- Responsive breakpoints: 375px / 768px / 1024px / 1440px
- prefers-reduced-motion media query wraps all animations

**Commit Protocol:**
After each meaningful unit of work:
```
git add [specific files]
git commit -m "[type]: [what was done]"
```
Types: feat, fix, style, refactor, docs
Example: "feat: add marathoner funnel page with full content from config"
Never: "git add . && git commit -m 'changes'"

**Build Self-Verification Checklist (run before every commit):**
```
[ ] No hardcoded copy anywhere in components
[ ] All strings come from client.config.ts
[ ] All images exist in /public before referencing
[ ] All routes resolve without 404
[ ] All CTA buttons link to /thank-you?funnel=[slug]
[ ] Thank-you page reads funnel query param correctly
[ ] Popup routes to correct funnel per option
[ ] sessionStorage key prevents popup re-appearance
[ ] Countdown targets correct event date and timezone
[ ] All metadata set from config (title, description, OG)
[ ] Schema markup implemented from SEO_OUTPUT.md
[ ] GA4 and Meta Pixel scripts present
[ ] All conversion events firing
[ ] No console errors (run npm run build first)
[ ] TypeScript strict mode passes (no type errors)
[ ] Mobile layout correct at 375px
[ ] fonts loading via next/font (not direct import)
[ ] All images use next/image component
[ ] prefers-reduced-motion handled
[ ] Focus states visible on all interactive elements
```

**Output:** All code files committed to GitHub

---

## AGENT 7 — TESTER

**Read first:**
- CLIENT_BRIEF.md (source of truth for client content)
- COPY_OUTPUT.md (source of truth for all copy)
- DESIGN_OUTPUT.md (source of truth for design)
- All built files in app/ and components/

**Tester Mindset:**
You are not helpful. You are precise and strict.
Your job is to find failures, not to approve.
You never fix anything. You report and block.
A single unresolved failure = DEPLOY APPROVED: NO.

**Functional Testing:**
```
PAGES & ROUTING
[ ] / loads without error
[ ] /[funnel-1-slug] loads without error
[ ] /[funnel-2-slug] loads without error (if exists)
[ ] /thank-you loads without error
[ ] /thank-you?funnel=executive shows executive copy
[ ] /thank-you?funnel=marathoner shows marathoner copy
[ ] /privacy loads without error
[ ] /terms loads without error
[ ] All routes return 200 (no 404s)

CONTENT ACCURACY
[ ] Every piece of copy matches COPY_OUTPUT.md exactly
[ ] No placeholder text anywhere (TBD, #, Lorem ipsum, Your Name)
[ ] Coach names and credentials correct
[ ] Event date correct on every section
[ ] Event time correct on every section
[ ] Price (now) correct on every CTA
[ ] Price (was) correct on every CTA
[ ] Urgency number correct
[ ] All FAQ questions and answers present and complete

INTERACTIVE ELEMENTS
[ ] Countdown timer counting down to correct date
[ ] Countdown shows correct timezone
[ ] FAQ accordion opens correctly
[ ] FAQ accordion closes correctly
[ ] FAQ open state: question text clearly visible (not black/hidden)
[ ] FAQ open state: answer text visible
[ ] Popup appears after correct delay
[ ] Popup option 1 navigates to correct funnel
[ ] Popup option 2 navigates to correct funnel
[ ] Popup does NOT reappear after choice (sessionStorage working)
[ ] Scroll reveal animations trigger on scroll
[ ] All CTA buttons navigate to /thank-you?funnel=[slug]
[ ] Footer social links exist and are clickable
[ ] Privacy Policy link in footer works
[ ] Terms link in footer works
[ ] Back link on privacy/terms pages works

IMAGES
[ ] All images loading (no broken image icons)
[ ] Coach photos displaying correctly
[ ] Images not distorted (correct aspect ratios)
[ ] Alt text present on all images
```

**Performance Testing:**
```
CORE WEB VITALS (use Vercel Speed Insights or PageSpeed)
[ ] Largest Contentful Paint < 2.5s
[ ] Cumulative Layout Shift < 0.1
[ ] First Input Delay < 100ms
[ ] Time to First Byte < 800ms

ASSETS
[ ] Images are optimised (next/image in use)
[ ] Fonts loading with font-display: swap
[ ] No render-blocking resources
[ ] JavaScript bundle reasonable size
[ ] No unused CSS (check build output)
```

**Accessibility Testing:**
```
WCAG AA COMPLIANCE
[ ] All body text on backgrounds: minimum 4.5:1 contrast ratio
[ ] Large text (18px+ bold): minimum 3:1 contrast
[ ] White text on navy: verify ratio
[ ] Dark text on off-white: verify ratio
[ ] Red text on white: verify ratio
[ ] Text on images: verify overlay provides sufficient contrast

KEYBOARD NAVIGATION
[ ] Can Tab through entire page
[ ] All interactive elements reachable via keyboard
[ ] Focus states visible on all interactive elements
[ ] FAQ accordion operable via keyboard
[ ] Popup operable via keyboard
[ ] No keyboard traps (except intentional popup focus trap)

TOUCH & MOBILE
[ ] All buttons minimum 44×44px touch target
[ ] All links minimum 44×44px touch target
[ ] No horizontal scroll on mobile
[ ] Text readable without zooming at 375px

SEMANTIC HTML
[ ] Single H1 per page
[ ] Heading hierarchy correct (H1→H2→H3, no skips)
[ ] All images have meaningful alt text
[ ] Decorative images have empty alt=""
[ ] Buttons use <button> not <div>
[ ] Links use <a> not <div>

MOTION
[ ] prefers-reduced-motion: all animations disabled
[ ] Page functional without animations
```

**TEST_REPORT.md Structure:**
```markdown
## TEST REPORT — [Client Name]
## Date: [date]
## Tester: QA Agent
## Build commit: [git hash]

### FUNCTIONAL: [X/Y passed]
[List each item with ✅ or ❌]

### PERFORMANCE: [X/Y passed]
[List each item with ✅ or ❌]
[Actual measured values]

### ACCESSIBILITY: [X/Y passed]
[List each item with ✅ or ❌]
[Actual contrast ratios measured]

### FAILURES REQUIRING FIX
[For each ❌ item:]
- Item: [exact description]
- Location: [file + line if applicable]
- Expected: [what should happen]
- Actual: [what is happening]
- Fix instruction: [specific action for Build Agent]

### SEND TO BUILD AGENT
[Consolidated fix list with priority order]

### DEPLOY APPROVED: YES / NO
[If NO: list blocking items]
[If YES: all items passed confirmation]
```

---

## AGENT 8 — DEPLOY

**Activation condition:**
TEST_REPORT.md shows DEPLOY APPROVED: YES
AND COMPLIANCE_REPORT.md shows DEPLOY APPROVED: YES
Both must be YES. One NO = no deployment.

**Pre-Deploy Checklist:**
```
[ ] TEST_REPORT.md — DEPLOY APPROVED: YES confirmed
[ ] COMPLIANCE_REPORT.md — DEPLOY APPROVED: YES confirmed
[ ] git status is clean (no uncommitted changes)
[ ] All commits are pushed to origin
[ ] Vercel project is linked to correct GitHub repo
[ ] Environment variables set in Vercel dashboard
[ ] Custom domain configured (if applicable)
```

**Deployment Steps:**
1. Confirm both approval conditions met
2. Run: git push (if any final changes)
3. Confirm push successful
4. Navigate to Vercel dashboard and confirm auto-deploy triggered
5. Wait for deployment to complete (do not proceed until complete)
6. Hit live URL — confirm 200 response
7. Check every route on live URL:
   - /[funnel-1-slug]
   - /[funnel-2-slug] (if exists)
   - /thank-you
   - /privacy
   - /terms
8. Confirm popup appears on live site
9. Confirm countdown is running correctly on live site
10. Confirm all images loading on live site (not just local)

**DEPLOYMENT_REPORT.md:**
```markdown
## DEPLOYMENT REPORT — [Client Name]
## Date: [date]
## Deploy Agent

### LIVE URLS
- Primary: [vercel URL]
- Custom domain: [if applicable]
- Funnel 1: [full URL]
- Funnel 2: [full URL if exists]
- Thank-you: [full URL]
- Privacy: [full URL]
- Terms: [full URL]

### VERIFICATION
[ ] All routes returning 200
[ ] Popup appearing correctly
[ ] Countdown running
[ ] Images loading
[ ] CTAs linking correctly

### DEPLOYMENT DETAILS
- Vercel project: [name]
- GitHub repo: [URL]
- Deployed commit: [hash]
- Build time: [duration]
- Deploy time: [timestamp]

### HANDOVER NOTES
[Any important notes for client or Monitor Agent]
```

---

## AGENT 9 — SEO & METADATA

**Read first:**
- CLIENT_BRIEF.md (brand, event, offer details)
- COPY_OUTPUT.md (headlines, descriptions — basis for meta copy)
- STRATEGY_OUTPUT.md (keywords, audience language)

**Technical SEO:**
- robots.txt: allow funnel pages, disallow /thank-you (no value in indexing)
- sitemap.xml: all public routes with lastmod and priority
- Canonical URLs: prevent duplicate content
- 301 redirect strategy: root → primary funnel
- URL slugs: keyword-rich, readable, hyphens not underscores

**Metadata for every page:**
- Title formula: [Primary Keyword Outcome] | [Brand Name]
  Example: "Ironman 70.3 Blueprint Webinar — Satyam Sahai"
  Max 60 characters.
- Meta description: benefit-led, 150–160 characters, includes event date
- OG title: optimised for social share click-through (can differ from title)
- OG description: hooks the share recipient in the WhatsApp preview
- OG image: spec (1200×630px, text readable at thumbnail size)
- Twitter card type: summary_large_image
- Favicon: [from client assets or generate]

**Event Schema Markup (webinar funnels):**
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "[Webinar Name]",
  "description": "[From meta description]",
  "startDate": "[ISO 8601 with timezone]",
  "endDate": "[ISO 8601 estimated]",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
  "location": {
    "@type": "VirtualLocation",
    "url": "https://zoom.us"
  },
  "offers": {
    "@type": "Offer",
    "price": "[price]",
    "priceCurrency": "INR",
    "availability": "https://schema.org/LimitedAvailability",
    "validFrom": "[today's date ISO]",
    "url": "[funnel URL]"
  },
  "organizer": {
    "@type": "Person",
    "name": "[Coach Name]",
    "url": "[funnel URL]"
  },
  "performer": {
    "@type": "Person",
    "name": "[Coach Name]"
  }
}
```

**Module Extensions:**

VSL Module:
- VideoObject schema for the VSL
- No-index on thank-you and order pages
- OG:video tag if video is publicly embeddable

SLO Module:
- Product schema for frontend offer
- No-index on upsell, downsell, order confirmation pages
- Breadcrumb schema if multi-step flow

**Output: SEO_OUTPUT.md**
All metadata values, schema JSON, robots.txt content, sitemap structure.
Build Agent implements from this file — no decisions required.

---

## AGENT 10 — ANALYTICS & TRACKING

**Read first:**
- CLIENT_BRIEF.md (GA4 property ID, Meta Pixel ID, conversion goals)
- TASK_LIST.md (analytics-specific requirements)
- INTEGRATION_OUTPUT.md (payment and form submission events)

**Universal Setup:**
- GA4: gtag.js in app/layout.tsx (server component, loads on all pages)
- Meta Pixel: in app/layout.tsx with noscript fallback
- Both fire immediately on page load (before any interaction)

**Event Naming Convention (consistent across all client projects):**
```
page_view (automatic via GA4)
cta_click — params: page, section, funnel
popup_shown — params: funnel
popup_option_selected — params: choice, destination
faq_opened — params: question_index, question_text
scroll_depth — params: percentage (25/50/75/100)
time_on_page — params: seconds (30/60/180)
conversion — params: funnel, value, currency
community_cta_click — params: funnel
```

**UTM Parameter Handling:**
- Capture UTM params on landing: utm_source, utm_medium,
  utm_campaign, utm_content, utm_term
- Store in sessionStorage on page load
- Read from sessionStorage on thank-you page
- Fire conversion event with all UTM params preserved
- This allows client to see which ad campaign drove which conversion

**Webinar Funnel Module:**
- Track funnel split (executive vs marathoner conversions separately)
- Track popup interactions (which option selected)
- Track FAQ engagement (which questions opened most)
- Conversion = thank-you page load (specific funnel)
- Secondary conversion = community CTA click

**VSL Funnel Module:**
- Video play event (on play button click)
- Video progress: 25%, 50%, 75%, 100% viewed
- CTA reveal event (when CTA appears in video)
- CTA click after video vs CTA click without watching
- Video completion rate

**SLO Funnel Module:**
- Form step completion: step_1_complete, step_2_complete, step_3_complete
- Order bump: order_bump_shown, order_bump_accepted, order_bump_declined
- Upsell: upsell_shown, upsell_accepted, upsell_declined
- Revenue events: purchase (with value + currency)

**Output: ANALYTICS_OUTPUT.md**
Exact GA4 property ID, Meta Pixel ID, all event definitions,
UTM handling code, conversion event specifications.
Build Agent implements from this file.

---

## AGENT 11 — INTEGRATION

**Read first:**
- CLIENT_BRIEF.md (payment gateway, webinar platform, email platform, CRM)
- TASK_LIST.md (integration requirements)
- Built code structure (to understand where to inject integrations)

**Universal Rules:**
- All API keys in environment variables (.env.local for dev, Vercel env vars for prod)
- No API keys in client-side code — ever
- All integrations have error handling and fallback behaviour
- All webhooks verified (signature check where available)
- Integration failures must not break the user experience
  (payment fails → show error, not crash)

**Webinar Funnel Module:**

Payment Integration (Razorpay/Instamojo):
- Embed payment button or redirect to payment page
- Post-payment success: redirect to /thank-you?funnel=[slug]
- Post-payment failure: stay on funnel page with error message
- Payment amount pulled from client.config.ts (never hardcoded)
- Test mode in development, live mode in production

Zoom Registration:
- On payment success → trigger Zoom webinar registration API
- Register attendee with name + email from payment form
- On registration success → send confirmation email
- On registration failure → log error, still redirect to thank-you
  (handle manually as fallback)

Email Autoresponder:
- Trigger on payment success
- Email contains: Zoom link, event date/time, calendar invite (.ics)
- Sent from client's domain if possible
- Plain text fallback for all email clients
- Mobile-optimised HTML email

CRM Tagging:
- Tag registrant with funnel slug (executive vs marathoner)
- Tag registrant as "webinar_registered"
- Sync to client's CRM if provided (Mailchimp/ConvertKit/HubSpot)

**VSL Funnel Module:**
- Video hosting embed (Vimeo/Wistia API)
- Stripe payment form integration
- Digital product delivery (download link or course access grant)
- Email sequence trigger post-purchase
- Refund webhook handler

**SLO Funnel Module:**
- Multi-product Stripe setup (separate price IDs for each offer)
- One-click upsell (Stripe PaymentIntent with saved payment method)
- Order management: track which products each customer bought
- Fulfilment trigger per product
- Affiliate tracking (UTM-based or dedicated affiliate platform)

**Output: INTEGRATION_OUTPUT.md**
All integration specs, API endpoint documentation,
webhook event definitions, environment variable names.
Build Agent implements from this file.

---

## AGENT 12 — POST-LAUNCH MONITOR

**Activation:** After Deploy Agent confirms live URL.

**Read first:**
- DEPLOYMENT_REPORT.md (live URLs)
- CLIENT_BRIEF.md (event date for countdown expiry)
- TASK_LIST.md (monitor-specific notes)

**Uptime Monitoring Setup:**
- Configure uptime check (every 5 minutes) via UptimeRobot or Better Uptime
- Monitor all routes (not just homepage):
  /[funnel-1-slug], /[funnel-2-slug], /thank-you
- Alert channel: client's WhatsApp + email
- Alert threshold: 2 consecutive failed checks = alert sent

**Error Tracking:**
- Vercel error logs review schedule
- Any 500 errors or runtime crashes → alert immediately
- Payment gateway failure alerts
- Zoom API failure tracking

**Content Freshness Schedule:**
Before event date:
- Daily: confirm countdown timer is running correctly
- Daily: confirm CTA links are working
- 24 hours before: verify Zoom link is active

On event date:
- Monitor for traffic spike handling
- Confirm payment gateway processing correctly

After event date (day after):
- Update page to "Registration Closed" state OR
- Redirect to waitlist/next cohort page OR
- Show replay offer page
- Remove or update urgency copy (seats, countdown)
- Update meta title to reflect archived status

**Performance Monitoring:**
- Weekly Core Web Vitals check via PageSpeed Insights
- Flag any degradation from baseline (established at deploy)
- Image loading speed under real traffic

**Post-Event Actions:**
- Archive funnel pages (add noindex meta after event)
- Export registrant list from payment gateway
- Trigger post-event email sequence (recording link, next steps, upsell)
- Document lessons learned for next cohort

**A/B Test Setup (if client requests):**
- Headline variant A vs B (50/50 split)
- Measure: CTA click rate, conversion rate
- Statistical significance threshold: 95%
- Minimum sample: 200 sessions per variant before declaring winner

**MONITOR_SETUP.md:**
```markdown
## MONITOR SETUP — [Client Name]
## Setup Date: [date]

### UPTIME MONITORING
- Tool: [UptimeRobot / Better Uptime]
- Monitored URLs: [list]
- Check interval: 5 minutes
- Alert contacts: [list]

### ERROR TRACKING
- Vercel error log URL: [URL]
- Review schedule: [daily until event, weekly after]

### CONTENT SCHEDULE
- Event date: [date]
- Post-event action: [redirect / waitlist / archive]
- Scheduled for: [date + time]

### PERFORMANCE BASELINE
- LCP at deploy: [value]
- CLS at deploy: [value]
- FID at deploy: [value]
```

---

## AGENT 13 — LEGAL & COMPLIANCE

**Activation:** After COPY_OUTPUT.md is produced (preliminary audit)
             AND after Build is complete (final audit before deploy)

**Read first:**
- CLIENT_BRIEF.md (market, audience, claims)
- COPY_OUTPUT.md (all copy — every word)
- Built funnel (final audit pass)

**MANDATORY: Search before every audit.**
At the start of every compliance audit, search live:
```
"Meta advertising policies [current year]"
"Meta landing page requirements [current year]"
"Meta ads health fitness claims policy"
"Meta ads countdown timer policy [current year]"
"Meta ads price claims crossed out policy"
"ASCI advertising guidelines India [current year]"
"Consumer Protection Act India advertising [current year]"
```
Read the actual pages. Policies change. Assumptions from previous
audits may be outdated. Never audit from memory.

**Domain 1 — Legal Compliance:**

Privacy Policy Requirements:
- What data is collected (name, email, phone minimum)
- How it is used (Zoom registration, email communication)
- Whether it is shared with third parties (payment gateway, Zoom)
- Retention period
- Contact information for data requests
- Must be linked from footer (visible on all pages)
- Must be accessible before any data collection point

Terms & Conditions Requirements:
- Ticket price and what it includes
- No recording / no replay policy
- Refund policy: specific (within X days, before event date)
- Intellectual property notice (content cannot be recorded/shared)
- Medical/fitness disclaimer (mandatory for all health clients):
  "Results may vary. Consult a qualified medical professional
  before beginning any endurance training programme."
- Governing law (India — Consumer Protection Act 2019)

Testimonial & Results Compliance:
- Any results claim must have: "Results may vary. Individual
  results depend on multiple factors including fitness level,
  training consistency, and medical condition."
- Testimonials must be genuine and verifiable
- Cannot imply typical results from exceptional results

Refund Policy:
- Must be visible before payment (not just in terms)
- Specific timeframe ("within 24 hours of the session")
- Process for claiming refund must be stated
- No-questions-asked policy if claimed — must be honoured

**Domain 2 — Meta Ads Policy Compliance:**

Landing Page Requirements:
- Page loads and is fully functional on mobile (test on 375px)
- No cloaking (same content to Meta crawlers as to real users)
- Destination URL in ad matches actual landing page URL
- Privacy policy linked and accessible (hard requirement)
- Business contact information present on page

Interstitial Policy (CRITICAL):
- Popup must NOT cover the entire page content on initial load
- User must be able to see page content without dismissing popup
- Recommended: trigger popup after user scrolls 20% OR after 4+ seconds
- Full-screen popup on page load = Meta policy violation = ad account risk
- If client wants immediate popup: must be dismissable and not full-screen

Claims Audit (every piece of copy):

Fear-based language:
- "dying 10km from the finish" → FLAGGED (sensational)
  → "struggling 10km from the finish" → SAFE
- "your body will break down" → FLAGGED
- "never finishing" → context-dependent, flag for review

Results guarantees:
- "You will finish Ironman" → FLAGGED
- "Guaranteed Sub-5" → FLAGGED
- "Designed to help you work toward Sub-5" → SAFE
- "17× Ironman finisher system" → SAFE (credential, not promise)

Price claims:
- Crossed-out price (₹999): FLAGGED — must verify this was
  a genuine prior price, not a fabricated anchor
  (Meta and ASCI both prohibit fake "was" prices)
- "Today Only" badge: FLAGGED if not actually time-limited
  (must confirm offer genuinely changes after X date)

Countdown timers:
- Event-specific countdown to real date = SAFE
- Evergreen countdown that resets = FLAGGED (Meta violation)
- "Offer expires in 24:00:00" that resets = FLAGGED

Scarcity claims:
- "Only 12 seats left" = requires client confirmation this is genuine
  (if not genuine = deceptive advertising = Meta violation + ASCI violation)
- Flag all scarcity claims for client to confirm before approve

Superlatives:
- "The best Ironman coach in India" → FLAGGED (unverifiable)
- "World #16 Ranked Ironman — Mitch Kibby" → SAFE (verifiable)
- "The only system designed for Indian executives" → FLAGGED
- "A system designed specifically for Indian executives" → SAFE

Health and fitness:
- All outcome claims need "Results may vary"
- No claims that imply medical benefit or treatment
- No before/after body transformation imagery
- Performance claims (race times) = acceptable with disclaimer

Technical Compliance:
- Meta Pixel must be present and firing on page load
- Privacy policy must be linked before any data collection
- No collection of sensitive data (medical history, etc.) without disclosure
- Contact information on page (WhatsApp link counts)

**COMPLIANCE_REPORT.md Structure:**
```markdown
## COMPLIANCE REPORT — [Client Name]
## Date: [date]
## Legal Agent
## Meta Policies Version: [date of policies checked]
## Sources checked: [list URLs]

### LEGAL COMPLIANCE
[Each item with ✅ or ❌]

### META ADS POLICY COMPLIANCE
[Each item with ✅ or ❌]

### ASCI COMPLIANCE
[Each item with ✅ or ❌]

### ISSUES REQUIRING ACTION

COPY CHANGES (send to Copy Agent):
[Each issue with: location, problem, specific suggested fix]

STRUCTURAL CHANGES (send to Build Agent):
[Each issue with: location, problem, specific suggested fix]

CLIENT CONFIRMATION REQUIRED:
[Each claim needing client to verify before approve]

### DEPLOY APPROVED: YES / NO
[If NO: list every blocking item]
[If YES: all items resolved confirmation]
[Note: Client confirmation items must be resolved before YES]
```

---

## THE MASTER EXECUTION PROMPT

This is the prompt you paste into Claude Code for every new client.
Drop CLIENT_BRIEF.md and images into the project folder first.
Then run this:

```
Read CLAUDE.md completely before doing anything else.
Then read CLIENT_BRIEF.md completely.

Execute the full 13-agent workflow as defined in CLAUDE.md.
Maintain the exact sequence. Do not skip phases.
Do not proceed past a phase if required outputs are missing.

Start with Manager Agent: analyse the brief, identify gaps,
produce TASK_LIST.md.

If gaps exist: present them as a single consolidated list and
wait for my response before proceeding.

If brief is complete: proceed through the full sequence
automatically, producing each output file before moving
to the next agent.

At each phase transition, confirm:
- Output file produced ✅
- Quality checklist passed ✅
- Ready for next phase ✅

Build phase: commit after each meaningful unit of work.
Never one giant commit at the end.

Final deployment only when:
- TEST_REPORT.md: DEPLOY APPROVED: YES
- COMPLIANCE_REPORT.md: DEPLOY APPROVED: YES

Report final status:
- All live URLs
- Any items requiring client confirmation
- Monitor setup confirmation
```

---

## MODULE SYSTEM

Each specialist agent loads a module based on project type.
Current modules available:

```
WEBINAR MODULE     ← Current (Ironman project = base template)
VSL MODULE         ← To be built (next)
SLO MODULE         ← To be built
COURSE LAUNCH      ← To be built
APP LANDING        ← To be built
LEAD GEN           ← To be built
```

To add a new module:
1. Create agents/modules/[type]/copy-module.md
2. Create agents/modules/[type]/uiux-module.md
3. Create agents/modules/[type]/build-module.md
4. Create agents/modules/[type]/integration-module.md
5. Reference in CLAUDE.md under MODULE SYSTEM
6. Agent reads base role from CLAUDE.md + module extension file

---

## SKILL ENHANCEMENT SYSTEM

As the team accumulates real client experience, skills are
captured in agents/skills/ and agents/swipe/:

```
agents/
├── skills/
│   ├── copy-agent-skill.md        ← Frameworks, patterns, swipe file
│   ├── strategy-agent-skill.md    ← Audience research, market intelligence
│   ├── uiux-agent-skill.md        ← Design patterns, conversion layouts
│   └── legal-agent-skill.md      ← Compliance precedents, policy archive
│
└── swipe/
    ├── headlines.md               ← High-converting headlines archive
    ├── cta-copy.md                ← CTA copy that has converted
    ├── faq-answers.md             ← FAQ answers that handle objections well
    └── bio-structures.md          ← Coach bio structures that work
```

Agents read their skill file at the start of every run.
After every client project, relevant learnings are added to skill files.
The system gets smarter with every project.

---

## QUALITY STANDARDS

Every funnel produced by this system must meet:

**Conversion:**
- Single clear conversion goal per page
- Maximum 3 CTAs per page
- Every objection addressed before it arises
- Risk reversal visible on every CTA

**Performance:**
- LCP < 2.5s
- CLS < 0.1
- Mobile score > 90 on PageSpeed

**Accessibility:**
- WCAG AA minimum on all text
- Fully keyboard navigable
- All images have alt text
- prefers-reduced-motion respected

**Legal:**
- Privacy policy linked and accessible
- Terms linked and accessible
- Medical disclaimer present (for health clients)
- All claims verified or disclaimed

**Meta Compliance:**
- Popup is not full-screen on load
- Countdown timer is event-specific
- Scarcity claims are genuine
- Price claims are verified
- Fear language is non-sensational

**Code:**
- No hardcoded copy in components
- TypeScript strict mode passing
- No console errors in production
- All routes return 200

---

## VERSION HISTORY

v1.0 — Initial build (Ironman 70.3 — The Finish Strong Project / Satyam)
       12 agents defined. Webinar module active.
       Base template: akshaypaliwal94/ironman-webinar

v1.1 — Agency structure added
       Multi-client repo architecture defined
       Client onboarding workflow documented
       Client isolation rules added (Prime Directives 11 + 12)
       Naming conventions established
       Template integrity rules added

v1.2 — Offer Agent added (Agent 3)
       13 agents total
       Offer Agent sits between Strategy and Copy
       OFFER_OUTPUT.md added to project file structure
       Execution sequence updated to 13 phases
       Build Agent now reads OFFER_OUTPUT.md
       Copy Agent now reads OFFER_OUTPUT.md
       TASK_LIST template updated with Offer Agent assignment
       offer-agent-skill.md added to skill files structure

---

*This file is the operating system. It does not change per client.
CLIENT_BRIEF.md changes. This file grows with new modules and skills.*
