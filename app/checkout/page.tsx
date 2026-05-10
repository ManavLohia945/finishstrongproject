import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import CheckoutForm from '@/components/CheckoutForm';

export const metadata: Metadata = {
  title: 'Secure Checkout — Finish Strong',
  description: 'Complete your registration for the Finish Strong 2-Day Ironman Webinar.',
  robots: { index: false, follow: false },
};

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function CheckoutPage() {
  return (
    <div className="checkout-page">
      {/* Header */}
      <header className="checkout-header">
        <Link href="/marathoner" className="checkout-logo" aria-label="Back to Finish Strong">
          FINISH STRONG
        </Link>
        <div className="checkout-secure-badge">
          <LockIcon />
          Secure Checkout
        </div>
      </header>

      {/* Form + Summary — wrapped in Suspense for search params */}
      <Suspense fallback={null}>
        <CheckoutForm />
      </Suspense>
    </div>
  );
}
