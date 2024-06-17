import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { otp } = await request.json();

  if (otp === '123456') {
    return NextResponse.json({ message: 'OTP verified' });
  } else {
    return NextResponse.json({ error: 'Incorrect OTP' }, { status: 401 });
  }
}
