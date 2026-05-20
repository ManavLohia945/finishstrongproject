import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

async function sendMetaCapiEvent(params: {
  pixelId: string;
  accessToken: string;
  paymentId: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  city: string;
  countryCode: string;
  eventSourceUrl: string;
  fbc: string | undefined;
  fbp: string | undefined;
  clientIp: string | undefined;
  clientUserAgent: string | undefined;
  valueRupees: number;
  currency: string;
}) {
  const hashedEmail = sha256(params.email.trim().toLowerCase());

  // Phone: digits only (E.164 without +) before hashing.
  const rawPhone = params.phone.replace(/\D/g, '');
  const hashedPhone = rawPhone ? sha256(rawPhone) : undefined;

  // Per Meta spec: fn/ln are lowercase + trim. ct is lowercase a-z only (no
  // whitespace/punctuation). country is lowercase 2-letter ISO. Adding these
  // raises Event Match Quality so Meta can attribute the conversion back to
  // ad clicks more reliably.
  const fn = params.firstName.trim().toLowerCase();
  const ln = params.lastName.trim().toLowerCase();
  const ct = params.city.trim().toLowerCase().replace(/[^a-z]/g, '');
  const country = params.countryCode.trim().toLowerCase();

  const hashedFn = fn ? sha256(fn) : undefined;
  const hashedLn = ln ? sha256(ln) : undefined;
  const hashedCt = ct ? sha256(ct) : undefined;
  const hashedCountry = country ? sha256(country) : undefined;

  const event = {
    event_name: 'Webinar Purchase',
    event_time: Math.floor(Date.now() / 1000),
    event_id: params.paymentId,
    action_source: 'website',
    // Required for action_source=website. Without it Meta drops the event
    // from reporting/optimisation and flags a diagnostic warning.
    event_source_url: params.eventSourceUrl,
    user_data: {
      em: [hashedEmail],
      ...(hashedPhone && { ph: [hashedPhone] }),
      ...(hashedFn && { fn: [hashedFn] }),
      ...(hashedLn && { ln: [hashedLn] }),
      ...(hashedCt && { ct: [hashedCt] }),
      ...(hashedCountry && { country: [hashedCountry] }),
      ...(params.fbc && { fbc: params.fbc }),
      ...(params.fbp && { fbp: params.fbp }),
      ...(params.clientUserAgent && { client_user_agent: params.clientUserAgent }),
      ...(params.clientIp && { client_ip_address: params.clientIp }),
    },
    custom_data: {
      currency: params.currency,
      value: params.valueRupees,
      payment_id: params.paymentId,
    },
  };

  const res = await fetch(
    `https://graph.facebook.com/v25.0/${params.pixelId}/events?access_token=${params.accessToken}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [event] }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(JSON.stringify(err));
  }

  return res.json();
}

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
  countryCode: string;
  dialCode: string;
}

interface UtmData {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orderId,
      paymentId,
      signature,
      customer,
      utm,
      amount: amountPaise,
      eventSourceUrl,
    }: {
      orderId: string;
      paymentId: string;
      signature: string;
      customer: CustomerData;
      utm: UtmData;
      amount?: number | string;
      eventSourceUrl?: string;
    } = body;

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { success: false, error: 'Missing required payment fields.' },
        { status: 400 }
      );
    }

    // Check if Razorpay secret is configured
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error('[verify-payment] Razorpay secret not configured');
      return NextResponse.json(
        { success: false, error: 'Payment verification not configured.' },
        { status: 500 }
      );
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { success: false, error: 'Payment verification failed.' },
        { status: 400 }
      );
    }

    // Payment verified — build payload and fire Pabbly webhook (non-blocking)
    const now = new Date();
    // Resolve amount paid (paise → rupees). Client sends the order amount from
    // Razorpay so CAPI value isn't hardcoded; fall back to ₹97 if missing.
    const paidPaiseNumeric = typeof amountPaise === 'string' ? Number(amountPaise) : amountPaise;
    const paidRupees = Number.isFinite(paidPaiseNumeric) && (paidPaiseNumeric as number) > 0
      ? (paidPaiseNumeric as number) / 100
      : 97;
    const pabblyPayload = {
      // Customer
      first_name:        customer.firstName,
      last_name:         customer.lastName,
      full_name:         `${customer.firstName} ${customer.lastName}`,
      email:             customer.email,
      phone:             `${customer.dialCode}${customer.phone}`,
      city:              customer.city,
      country_code:      customer.countryCode,
      // Payment
      payment_id:        paymentId,
      order_id:          orderId,
      amount:            String(paidRupees),
      currency:          'INR',
      payment_date:      now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }),
      payment_time:      now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
      payment_timestamp: now.toISOString(),
      // UTM
      utm_source:        utm?.source   ?? '',
      utm_medium:        utm?.medium   ?? '',
      utm_campaign:      utm?.campaign ?? '',
      utm_content:       utm?.content  ?? '',
      utm_term:          utm?.term     ?? '',
    };

    console.log('[verify-payment] Verified purchase:', pabblyPayload);

    const webhookUrl = process.env.PABBLY_WEBHOOK_URL;
    if (webhookUrl) {
      console.log('[verify-payment] Firing Pabbly webhook to:', webhookUrl);
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pabblyPayload),
        });
        
        if (webhookResponse.ok) {
          console.log('[verify-payment] Pabbly webhook successful:', webhookResponse.status);
        } else {
          console.error('[verify-payment] Pabbly webhook failed with status:', webhookResponse.status, webhookResponse.statusText);
        }
      } catch (err) {
        console.error('[verify-payment] Pabbly webhook error:', err);
      }
    } else {
      console.error('[verify-payment] CRITICAL: PABBLY_WEBHOOK_URL not set — webhook skipped');
    }

    // Meta Conversions API — fire "Webinar Purchase" custom event
    const metaPixelId = process.env.META_PIXEL_ID;
    const metaAccessToken = process.env.META_CAPI_ACCESS_TOKEN;
    if (metaPixelId && metaAccessToken) {
      const fbc = req.cookies.get('_fbc')?.value;
      const fbp = req.cookies.get('_fbp')?.value;
      const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
        ?? req.headers.get('x-real-ip')
        ?? undefined;
      const clientUserAgent = req.headers.get('user-agent') ?? undefined;
      const fullPhone = `${customer.dialCode}${customer.phone}`;
      // Meta requires event_source_url for action_source=website. Prefer the
      // URL the client was on when the purchase completed; fall back to the
      // request referer if the client didn't send one.
      const resolvedEventSourceUrl =
        eventSourceUrl ?? req.headers.get('referer') ?? '';
      try {
        const capiResult = await sendMetaCapiEvent({
          pixelId: metaPixelId,
          accessToken: metaAccessToken,
          paymentId,
          email: customer.email,
          phone: fullPhone,
          firstName: customer.firstName,
          lastName: customer.lastName,
          city: customer.city,
          countryCode: customer.countryCode,
          eventSourceUrl: resolvedEventSourceUrl,
          fbc,
          fbp,
          clientIp,
          clientUserAgent,
          valueRupees: paidRupees,
          currency: 'INR',
        });
        console.log('[verify-payment] Meta CAPI event sent:', capiResult);
      } catch (err) {
        console.error('[verify-payment] Meta CAPI error:', err);
      }
    } else {
      console.error('[verify-payment] Meta CAPI skipped — META_PIXEL_ID or META_CAPI_ACCESS_TOKEN not set');
    }

    return NextResponse.json({ success: true, paymentId });
  } catch (error) {
    console.error('[verify-payment]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
