'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import { setMetaAdvancedMatching } from '@/lib/analytics';

// ── Types ────────────────────────────────────────────────────────────────────

interface Country {
  code: string;   // ISO 3166-1 alpha-2
  name: string;
  dial: string;
  flag: string;
}

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  city?: string;
  phone?: string;
}

interface UtmData {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

// Razorpay window type
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  image?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
}
interface RazorpayInstance { open: () => void; }
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// ── Country data (top countries + full list) ─────────────────────────────────

const COUNTRIES: Country[] = [
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
  { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬' },
  { code: 'AE', name: 'UAE', dial: '+971', flag: '🇦🇪' },
  { code: 'NZ', name: 'New Zealand', dial: '+64', flag: '🇳🇿' },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
  { code: 'NL', name: 'Netherlands', dial: '+31', flag: '🇳🇱' },
  { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦' },
  { code: 'MY', name: 'Malaysia', dial: '+60', flag: '🇲🇾' },
  { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵' },
  { code: 'NG', name: 'Nigeria', dial: '+234', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', dial: '+254', flag: '🇰🇪' },
  { code: 'CH', name: 'Switzerland', dial: '+41', flag: '🇨🇭' },
  { code: 'SE', name: 'Sweden', dial: '+46', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', dial: '+47', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', dial: '+45', flag: '🇩🇰' },
  { code: 'PH', name: 'Philippines', dial: '+63', flag: '🇵🇭' },
  { code: 'BD', name: 'Bangladesh', dial: '+880', flag: '🇧🇩' },
  { code: 'PK', name: 'Pakistan', dial: '+92', flag: '🇵🇰' },
  { code: 'LK', name: 'Sri Lanka', dial: '+94', flag: '🇱🇰' },
  { code: 'NP', name: 'Nepal', dial: '+977', flag: '🇳🇵' },
];

// ── Validation ───────────────────────────────────────────────────────────────

const NAME_RE = /^[a-zA-Z\s\-'.]{2,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateFields(fields: FormFields, countryCode: string): FormErrors {
  const errors: FormErrors = {};

  if (!fields.firstName.trim()) {
    errors.firstName = 'First name is required.';
  } else if (!NAME_RE.test(fields.firstName.trim())) {
    errors.firstName = 'Letters, spaces, and hyphens only.';
  }

  if (!fields.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  } else if (!NAME_RE.test(fields.lastName.trim())) {
    errors.lastName = 'Letters, spaces, and hyphens only.';
  }

  if (!fields.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_RE.test(fields.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!fields.city.trim()) {
    errors.city = 'City is required.';
  } else if (fields.city.trim().length < 2) {
    errors.city = 'Enter your city name.';
  }

  if (!fields.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else {
    const country = COUNTRIES.find(c => c.code === countryCode);
    if (country) {
      try {
        const fullNumber = `${country.dial}${fields.phone.trim()}`;
        const valid = isValidPhoneNumber(fullNumber, countryCode as Parameters<typeof isValidPhoneNumber>[1]);
        if (!valid) {
          errors.phone = `Invalid number for ${country.name}. Check digits.`;
        }
      } catch {
        errors.phone = 'Enter a valid phone number.';
      }
    }
  }

  return errors;
}

// ── UTM helpers ──────────────────────────────────────────────────────────────

const UTM_KEY = 'fs_utm';

function captureUtm(searchParams: URLSearchParams): UtmData {
  const utm: UtmData = {
    source: searchParams.get('utm_source') ?? undefined,
    medium: searchParams.get('utm_medium') ?? undefined,
    campaign: searchParams.get('utm_campaign') ?? undefined,
    content: searchParams.get('utm_content') ?? undefined,
    term: searchParams.get('utm_term') ?? undefined,
  };
  const hasAny = Object.values(utm).some(Boolean);
  if (hasAny) {
    try { sessionStorage.setItem(UTM_KEY, JSON.stringify(utm)); } catch { /* noop */ }
  }
  return utm;
}

function restoreUtm(): UtmData {
  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    return raw ? (JSON.parse(raw) as UtmData) : {};
  } catch { return {}; }
}

// ── CheckoutPhoneInput (isolated leaf) ───────────────────────────────────────

interface PhoneInputProps {
  value: string;
  countryCode: string;
  onValueChange: (v: string) => void;
  onCountryChange: (code: string) => void;
  error?: string;
  touched: boolean;
  onBlur: () => void;
}

function CheckoutPhoneInput({
  value, countryCode, onValueChange, onCountryChange, error, touched, onBlur,
}: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedCountry = COUNTRIES.find(c => c.code === countryCode) ?? COUNTRIES[0];

  const filtered = search.trim()
    ? COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search) ||
      c.code.toLowerCase().includes(search.toLowerCase())
    )
    : COUNTRIES;

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const hasError = touched && !!error;
  const isValid = touched && !error && value.trim().length > 0;

  return (
    <div
      ref={wrapRef}
      className={`checkout-phone-wrap${hasError ? ' input-error' : ''}${isValid ? ' input-valid' : ''}`}
    >
      <button
        type="button"
        className="country-btn"
        onClick={() => setOpen(o => !o)}
        aria-label="Select country code"
        aria-expanded={open}
      >
        <span className="country-btn-flag">{selectedCountry.flag}</span>
        <span className="country-btn-code">{selectedCountry.dial}</span>
        <span className={`country-btn-chevron${open ? ' open' : ''}`}>▾</span>
      </button>

      <input
        ref={inputRef}
        type="tel"
        className="phone-digit-input"
        placeholder={countryCode === 'IN' ? '9876543210' : 'Phone number'}
        value={value}
        onChange={e => onValueChange(e.target.value.replace(/\D/g, ''))}
        onBlur={onBlur}
        inputMode="numeric"
        autoComplete="tel-national"
        aria-label="Phone number"
      />

      {open && (
        <div className="country-dropdown">
          <div className="country-search">
            <input
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
              aria-label="Search country"
            />
          </div>
          <div className="country-list" role="listbox">
            {filtered.map(country => (
              <div
                key={country.code}
                role="option"
                aria-selected={country.code === countryCode}
                className={`country-option${country.code === countryCode ? ' selected' : ''}`}
                onClick={() => {
                  onCountryChange(country.code);
                  setOpen(false);
                  setSearch('');
                  inputRef.current?.focus();
                }}
              >
                <span className="country-option-flag">{country.flag}</span>
                <span className="country-option-name">{country.name}</span>
                <span className="country-option-code">{country.dial}</span>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: '12px 14px', fontSize: 13, color: 'var(--text-light)' }}>
                No results
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Mobile Summary Accordion ─────────────────────────────────────────────────

function MobileSummary() {
  const [open, setOpen] = useState(false);

  return (
    <div className="checkout-summary-mobile" onClick={() => setOpen(o => !o)}>
      <div className="checkout-summary-mobile-bar">
        <span className="checkout-summary-mobile-title">Finish Strong — Ironman Webinar</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span className="checkout-summary-mobile-price">₹97</span>
          <span className={`checkout-summary-mobile-chevron${open ? ' open' : ''}`}>▾</span>
        </div>
      </div>
      <div className={`checkout-summary-expand${open ? ' open' : ''}`}>
        <div className="checkout-summary-expand-inner">
          <div className="checkout-event-pill" style={{ marginBottom: 12 }}>
            21st June · 11am IST
          </div>
          <div className="checkout-divider" />
          <div className="checkout-value-stack" style={{ marginBottom: 12 }}>
            {[
              'Complete race-day execution blueprint',
              'Live Q&A with Satyam & Mitch',
              '1 session · No recording · Limited seats',
            ].map(item => (
              <div key={item} className="checkout-value-item">
                <span className="checkout-check">✓</span>
                {item}
              </div>
            ))}
          </div>
          <div className="checkout-divider" />
          <div className="checkout-price-row" style={{ marginTop: 10 }}>
            <span className="checkout-price-was">₹199</span>
            <span className="checkout-price-now">₹97</span>
            <span className="checkout-save-badge">SAVE ₹102</span>
          </div>
          <p className="checkout-guarantee" style={{ marginTop: 8 }}>
            ✦ 100% Money Back Guarantee — Zero Risk
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main CheckoutForm ─────────────────────────────────────────────────────────

export default function CheckoutForm() {
  const router = useRouter();

  const [fields, setFields] = useState<FormFields>({
    firstName: '', lastName: '', email: '', city: '', phone: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormFields, boolean>>({
    firstName: false, lastName: false, email: false, city: false, phone: false,
  });
  const [countryCode, setCountryCode] = useState('IN');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Capture / restore UTM on mount
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const hasUtm = sp.has('utm_source') || sp.has('utm_medium') || sp.has('utm_campaign');
    if (hasUtm) {
      captureUtm(sp);
    }
  }, []);

  // Toast auto-dismiss
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 5000);
  }, []);

  const dismissToast = () => {
    setToast(null);
    if (toastTimer.current) clearTimeout(toastTimer.current);
  };

  // Per-field change + blur
  function handleChange(field: keyof FormFields, value: string) {
    setFields(f => ({ ...f, [field]: value }));
    if (touched[field]) {
      const updated = { ...fields, [field]: value };
      const newErrors = validateFields(updated, countryCode);
      setErrors(e => ({ ...e, [field]: newErrors[field] }));
    }
  }

  function handleBlur(field: keyof FormFields) {
    setTouched(t => ({ ...t, [field]: true }));
    const newErrors = validateFields(fields, countryCode);
    setErrors(e => ({ ...e, [field]: newErrors[field] }));
  }

  function handlePhoneBlur() {
    setTouched(t => ({ ...t, phone: true }));
    const newErrors = validateFields(fields, countryCode);
    setErrors(e => ({ ...e, phone: newErrors.phone }));
  }

  // Submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Mark all touched and validate
    setTouched({ firstName: true, lastName: true, email: true, city: true, phone: true });
    const allErrors = validateFields(fields, countryCode);
    setErrors(allErrors);

    if (Object.keys(allErrors).length > 0) {
      // Scroll to first error
      const firstErrorKey = Object.keys(allErrors)[0] as keyof FormFields;
      document.getElementById(`field-${firstErrorKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);

    try {
      // 1. Create Razorpay order
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 9700, currency: 'INR' }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json();
        throw new Error(err.error ?? 'Could not initiate payment.');
      }

      const { orderId, keyId, amount } = await orderRes.json();

      const selectedCountry = COUNTRIES.find(c => c.code === countryCode) ?? COUNTRIES[0];

      // 2. Open Razorpay modal
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Payment system unavailable. Please refresh and try again.');
      }

      const rzp = new window.Razorpay({
        key: keyId ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? '',
        amount: amount ?? 9700,
        currency: 'INR',
        order_id: orderId,
        name: 'Finish Strong',
        description: 'Ironman Webinar · 21st June',
        prefill: {
          name: `${fields.firstName.trim()} ${fields.lastName.trim()}`,
          email: fields.email.trim(),
          contact: `${selectedCountry.dial}${fields.phone.trim()}`,
        },
        theme: { color: '#E8360A' },
        handler: async (response: RazorpayResponse) => {
          await handlePaymentSuccess(response, selectedCountry.dial, amount ?? 9700);
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      });

      rzp.open();
    } catch (err) {
      setLoading(false);
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      showToast(msg);
    }
  }

  async function handlePaymentSuccess(response: RazorpayResponse, dialCode: string, paidAmountPaise: number) {
    try {
      const utm = restoreUtm();

      const verifyRes = await fetch('/api/razorpay/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
          customer: {
            firstName: fields.firstName.trim(),
            lastName: fields.lastName.trim(),
            email: fields.email.trim(),
            city: fields.city.trim(),
            phone: fields.phone.trim(),
            countryCode,
            dialCode,
          },
          utm,
          // Actual amount paid (paise) — sent so server CAPI value isn't hardcoded.
          amount: paidAmountPaise,
          eventSourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      });

      const result = await verifyRes.json();

      if (!result.success) {
        throw new Error(result.error ?? 'Payment verification failed.');
      }

      const tyParams = new URLSearchParams({ funnel: 'marathoner' });
      if (utm.source) tyParams.set('utm_source', utm.source);
      if (utm.medium) tyParams.set('utm_medium', utm.medium);
      if (utm.campaign) tyParams.set('utm_campaign', utm.campaign);
      if (utm.content) tyParams.set('utm_content', utm.content);
      if (utm.term) tyParams.set('utm_term', utm.term);
      // Set Meta Pixel Advanced Matching BEFORE the redirect so the auto-
      // PageView that fires on /thank-you carries hashed user identity.
      setMetaAdvancedMatching({
        email: fields.email,
        phone: `${dialCode}${fields.phone}`,
        firstName: fields.firstName,
        lastName: fields.lastName,
        city: fields.city,
        country: countryCode,
      });
      router.push(`/thank-you?${tyParams.toString()}`);
    } catch (err) {
      setLoading(false);
      const msg = err instanceof Error ? err.message : 'Payment received but verification failed. Please contact us.';
      showToast(msg);
    }
  }

  // Field helper
  function fieldState(key: keyof FormFields) {
    const hasError = touched[key] && !!errors[key];
    const isValid = touched[key] && !errors[key] && fields[key].trim().length > 0;
    return {
      hasError,
      isValid,
      inputClass: `checkout-input${hasError ? ' input-error' : ''}${isValid ? ' input-valid' : ''}`,
    };
  }

  return (
    <>
      {/* Error Toast */}
      <div className={`checkout-toast${toast ? ' visible' : ''}`} role="alert">
        {toast}
        <button className="checkout-toast-close" onClick={dismissToast} aria-label="Dismiss">✕</button>
      </div>

      {/* Mobile summary */}
      <MobileSummary />

      <div className="checkout-main">
        {/* ── Left: Form ── */}
        <div className="checkout-form-panel">
          <div className="checkout-form-heading">
            <div className="checkout-section-label">Secure Registration</div>
            <h1 className="checkout-form-title">Your Details</h1>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="checkout-fields">
              {/* Row 1: First + Last */}
              <div className="checkout-fields-row">
                <div className="checkout-field" id="field-firstName">
                  <label className="checkout-label" htmlFor="firstName">
                    First Name <span>*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className={fieldState('firstName').inputClass}
                    placeholder="Arjun"
                    value={fields.firstName}
                    onChange={e => handleChange('firstName', e.target.value)}
                    onBlur={() => handleBlur('firstName')}
                    autoComplete="given-name"
                    aria-describedby={errors.firstName ? 'err-firstName' : undefined}
                    aria-invalid={fieldState('firstName').hasError}
                  />
                  <span
                    id="err-firstName"
                    className={`checkout-error-msg${fieldState('firstName').hasError ? ' visible' : ''}`}
                    role="alert"
                  >
                    {errors.firstName}
                  </span>
                </div>

                <div className="checkout-field" id="field-lastName">
                  <label className="checkout-label" htmlFor="lastName">
                    Last Name <span>*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className={fieldState('lastName').inputClass}
                    placeholder="Sharma"
                    value={fields.lastName}
                    onChange={e => handleChange('lastName', e.target.value)}
                    onBlur={() => handleBlur('lastName')}
                    autoComplete="family-name"
                    aria-describedby={errors.lastName ? 'err-lastName' : undefined}
                    aria-invalid={fieldState('lastName').hasError}
                  />
                  <span
                    id="err-lastName"
                    className={`checkout-error-msg${fieldState('lastName').hasError ? ' visible' : ''}`}
                    role="alert"
                  >
                    {errors.lastName}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="checkout-field" id="field-email">
                <label className="checkout-label" htmlFor="email">
                  Email Address <span>*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className={fieldState('email').inputClass}
                  placeholder="arjun@example.com"
                  value={fields.email}
                  onChange={e => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  autoComplete="email"
                  inputMode="email"
                  aria-describedby={errors.email ? 'err-email' : undefined}
                  aria-invalid={fieldState('email').hasError}
                />
                <span
                  id="err-email"
                  className={`checkout-error-msg${fieldState('email').hasError ? ' visible' : ''}`}
                  role="alert"
                >
                  {errors.email}
                </span>
              </div>

              {/* City */}
              <div className="checkout-field" id="field-city">
                <label className="checkout-label" htmlFor="city">
                  City <span>*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  className={fieldState('city').inputClass}
                  placeholder="Mumbai"
                  value={fields.city}
                  onChange={e => handleChange('city', e.target.value)}
                  onBlur={() => handleBlur('city')}
                  autoComplete="address-level2"
                  aria-describedby={errors.city ? 'err-city' : undefined}
                  aria-invalid={fieldState('city').hasError}
                />
                <span
                  id="err-city"
                  className={`checkout-error-msg${fieldState('city').hasError ? ' visible' : ''}`}
                  role="alert"
                >
                  {errors.city}
                </span>
              </div>

              {/* Phone */}
              <div className="checkout-field" id="field-phone">
                <label className="checkout-label" htmlFor="phone">
                  Phone Number <span>*</span>
                </label>
                <CheckoutPhoneInput
                  value={fields.phone}
                  countryCode={countryCode}
                  onValueChange={v => {
                    handleChange('phone', v);
                  }}
                  onCountryChange={code => {
                    setCountryCode(code);
                    if (touched.phone) {
                      const newErrors = validateFields({ ...fields }, code);
                      setErrors(e => ({ ...e, phone: newErrors.phone }));
                    }
                  }}
                  error={errors.phone}
                  touched={touched.phone}
                  onBlur={handlePhoneBlur}
                />
                <span
                  id="err-phone"
                  className={`checkout-error-msg${touched.phone && !!errors.phone ? ' visible' : ''}`}
                  role="alert"
                >
                  {errors.phone}
                </span>
              </div>
            </div>

            {/* Submit */}
            <div className="checkout-submit-wrap" style={{ marginTop: 28 }}>
              <button
                type="submit"
                className="cta"
                disabled={loading}
                style={{ width: '100%', maxWidth: '100%', opacity: loading ? 0.75 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <span className="btn-spinner" />
                    Processing…
                  </>
                ) : (
                  <>
                    Pay ₹97 Now
                    <span className="cta-arrow">→</span>
                  </>
                )}
              </button>

              <div className="checkout-trust">
                <span>🔒 Razorpay Secured</span>
                <span className="checkout-trust-sep">·</span>
                <span>SSL Encrypted</span>
                <span className="checkout-trust-sep">·</span>
                <span>24-hr Money-Back</span>
              </div>
            </div>
          </form>
        </div>

        {/* ── Right: Order Summary ── */}
        <aside className="checkout-summary" aria-label="Order summary">
          <p className="checkout-summary-label">ORDER SUMMARY</p>
          <h2 className="checkout-product-name">Finish Strong — Ironman Webinar</h2>
          <div className="checkout-event-pill">
            21st June · 11am IST
          </div>

          <div className="checkout-divider" />

          <div className="checkout-value-stack">
            {[
              'Complete race-day execution blueprint',
              'Live Q&A with Satyam & Mitch',
              '1 session · No recording · Limited seats',
            ].map(item => (
              <div key={item} className="checkout-value-item">
                <span className="checkout-check">✓</span>
                {item}
              </div>
            ))}
          </div>

          <div className="checkout-divider" />

          <div className="checkout-price-block">
            <div className="checkout-price-row">
              <span className="checkout-price-was">₹199</span>
              <span className="checkout-price-now">₹97</span>
              <span className="checkout-save-badge">SAVE ₹102</span>
            </div>
            <p className="checkout-guarantee">✦ 100% Money Back Guarantee — Zero Risk</p>
          </div>

          <div className="checkout-coaches">
            <div className="checkout-coach-avatars">
              <div className="checkout-coach-avatar">S</div>
              <div className="checkout-coach-avatar">M</div>
            </div>
            <div className="checkout-coach-names">
              <strong>Satyam Sahai &amp; Mitch Kibby</strong>
              Your coaches for this webinar
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
