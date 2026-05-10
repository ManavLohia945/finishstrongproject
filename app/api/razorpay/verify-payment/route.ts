import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
  countryCode: string;
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

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { success: false, error: 'Payment verification failed.' },
        { status: 400 }
      );
    }

    // Payment verified — log for now, wire Pabbly/email automation here later
    console.log('[verify-payment] Verified purchase:', {
      paymentId,
      orderId,
      customer: {
        name: `${customer.firstName} ${customer.lastName}`,
        email: customer.email,
        city: customer.city,
        phone: `${customer.countryCode}${customer.phone}`,
      },
      utm,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, paymentId });
  } catch (error) {
    console.error('[verify-payment]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
