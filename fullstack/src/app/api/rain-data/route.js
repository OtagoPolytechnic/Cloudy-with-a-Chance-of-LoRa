/**
 * @api {get} /api/rain-data Get Barometric Pressure Data
 */
import db from '@/db';
import { isRateLimited } from '@/app/utils/ratelimit';

export const dynamic = 'force-dynamic';

export const GET = async (request) => {
  try {
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.connection.remoteAddress;
    const MAX_REQUESTS = 7 * 15;

    if (isRateLimited(ip, MAX_REQUESTS)) {
      return new Response('Too many requests', { status: 429 });
    }

    const data = await db.any(
      'SELECT * FROM rainfall_measurement ORDER BY timestamp DESC LIMIT 1',
    );
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store', // Prevent caching
      },
    });
  } catch (err) {
    console.error(err);
    response.status(500).send('Server Error');
  }
};
