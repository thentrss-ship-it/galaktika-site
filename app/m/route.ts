import { NextResponse } from 'next/server';

const MANAGER_PROFILE_BOT_URL =
  'https://t.me/galaxysai_bot?start=manager_profile';

export function GET() {
  return NextResponse.redirect(MANAGER_PROFILE_BOT_URL, 302);
}
