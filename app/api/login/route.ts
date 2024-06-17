import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === 'incorrect@email.com') {
    return NextResponse.json({ error: 'Incorrect email' }, { status: 401 });
  }
  if (password === 'incorrect-password') {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json({ message: 'OTP sent' });
}
