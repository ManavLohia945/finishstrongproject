import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

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

    return NextResponse.json({ success: true, paymentId });
  } catch (error) {
    console.error('[verify-payment]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
