/**
 * Client-side analytics helpers.
 * Meta Pixel client-side init + PageView lives in app/layout.tsx (Script tag).
 * Server-side Meta CAPI (custom 'Webinar Purchase' event) lives in
 * app/api/razorpay/verify-payment/route.ts.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Mirror of the literal in app/layout.tsx so this helper can re-init the pixel
// with Advanced Matching. Pixel IDs aren't secrets — they're already exposed in
// the client bundle — so duplicating as a literal is fine.
const META_PIXEL_ID = '1704247700948915';

/**
 * Re-initialise the Meta Pixel with Manual Advanced Matching (MAM) once we
 * know the buyer's identity. Pass raw form values — Meta's pixel library
 * SHA-256 hashes them client-side before transmitting, so PII never leaves
 * the browser unhashed.
 *
 * Call this on the /checkout success path RIGHT BEFORE the redirect to
 * /thank-you, so the auto-PageView that fires on /thank-you (via Meta's SPA
 * hook into pushState) carries the matching signals.
 *
 * Per Meta spec normalisation (applied here so the caller passes raw form
 * values): em/fn/ln are lowercased + trimmed; ph is digits-only with country
 * code (no +); ct is lowercase a-z only (no spaces or punctuation); country
 * is lowercase 2-letter ISO. Meta hashes the result with SHA-256.
 */
export function setMetaAdvancedMatching(data: {
  email?: string;
  phone?: string;       // raw with or without country code/dial code
  firstName?: string;
  lastName?: string;
  city?: string;
  country?: string;     // 2-letter ISO; case-insensitive
}) {
  if (typeof window === 'undefined' || !window.fbq) return;
  const matching: Record<string, string> = {};
  if (data.email) matching.em = data.email.trim().toLowerCase();
  if (data.phone) {
    const digits = data.phone.replace(/\D/g, '');
    if (digits) matching.ph = digits;
  }
  if (data.firstName) matching.fn = data.firstName.trim().toLowerCase();
  if (data.lastName) matching.ln = data.lastName.trim().toLowerCase();
  if (data.city) {
    const ct = data.city.trim().toLowerCase().replace(/[^a-z]/g, '');
    if (ct) matching.ct = ct;
  }
  if (data.country) {
    const country = data.country.trim().toLowerCase();
    if (country) matching.country = country;
  }
  if (Object.keys(matching).length === 0) return;
  window.fbq('init', META_PIXEL_ID, matching);
}
