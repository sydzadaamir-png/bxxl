import { ipAddress, next } from '@vercel/functions';

// ===== BXXL VISIT LOGGING ONLY — NO filter, NO block =====
// Har visit ko note karo (bot ho ya real user — sab): time, page, IP,
// country, city, UA, ASN. Koi bhi visitor roka nahi jata — sab ko
// seedha site dikhao. Ye logging sirf record ke liye hai.

export default function middleware(request) {
  const url = new URL(request.url);

  const userAgent = (request.headers.get('user-agent') || "").toLowerCase();
  const clientASN = request.headers.get('x-vercel-ip-as-number') || "";
  const clientCountry = request.headers.get('x-vercel-ip-country') || "";
  const clientCity = request.headers.get('x-vercel-ip-city') || "";
  const clientIP = ipAddress(request) || "";

  console.log('[BXXL-VISIT] ' + JSON.stringify({
    t: new Date().toISOString(),
    path: url.pathname,
    ip: clientIP,
    country: clientCountry || '-',
    city: clientCity || '-',
    ua: userAgent.slice(0, 120),
    asn: clientASN || '-',
  }));

  return next();
}

export const config = {
  matcher: ['/', '/how-to-upload-bulk-reels.html', '/donald-trump-live-update.html'],
};
