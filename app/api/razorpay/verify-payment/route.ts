import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

async function sendMetaCapiEvent(params: {
  pixelId: string;
  accessToken: string;
  paymentId: string;
  email: string;
  phone: string;
  fbc: string | undefined;
  fbp: string | undefined;
  clientIp: string | undefined;
  clientUserAgent: string | undefined;
}) {
  const hashedEmail = crypto.createHash('sha256').update(params.email.trim().toLowerCase()).digest('hex');
  // Normalise phone to digits only (E.164 without +) before hashing
  const rawPhone = params.phone.replace(/\D/g, '');
  const hashedPhone = rawPhone ? crypto.createHash('sha256').update(rawPhone).digest('hex') : undefined;

  const event = {
    event_name: 'Webinar Purchase',
    event_time: Math.floor(Date.now() / 1000),
    event_id: params.paymentId,
    action_source: 'website',
    user_data: {
      em: [hashedEmail],
      ...(hashedPhone && { ph: [hashedPhone] }),
      ...(params.fbc && { fbc: params.fbc }),
      ...(params.fbp && { fbp: params.fbp }),
      ...(params.clientUserAgent && { client_user_agent: params.clientUserAgent }),
      ...(params.clientIp && { client_ip_address: params.clientIp }),
    },
    custom_data: {
      currency: 'INR',
      value: 97,
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
    }: {
      orderId: string;
      paymentId: string;
      signature: string;
      customer: CustomerData;
      utm: UtmData;
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
      amount:            '97',
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
      try {
        const capiResult = await sendMetaCapiEvent({
          pixelId: metaPixelId,
          accessToken: metaAccessToken,
          paymentId,
          email: customer.email,
          phone: fullPhone,
          fbc,
          fbp,
          clientIp,
          clientUserAgent,
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
