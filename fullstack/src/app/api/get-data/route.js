/**
 * @api {get} /api/get-data Get all data
 * @description This file is the route for the get-data API
 */
import { isRateLimited } from '@/app/utils/ratelimit';
import db from '@/db';

export const dynamic = 'force-dynamic';

/**
 * @description Gets a month worth of data of any type
 */
export const GET = async (request) => {
  try {
    const authHeader = request.headers.get('authorization');
    const { searchParams } = new URL(request.url);
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.connection.remoteAddress;
    const MAX_REQUESTS = 10;
    const type = searchParams.get('type');

    if (!authHeader) return new Response('Authentication Required');

    const splitAuth = authHeader.split(' ')[1];

    if (splitAuth !== process.env.PASSWORD)
      return new Response('You are not authorized to post');

    if (isRateLimited(ip, MAX_REQUESTS)) {
      return new Response('Too many requests', { status: 429 });
    }

    const allowedTypes = [
      'temperature',
      'pressure',
      'humidity',
      'wind',
      'rain_gauge',
      'dust',
      'co2',
      'gas',
    ];

    if (!allowedTypes.includes(type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid data type requested' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const query = `SELECT * FROM ${type} WHERE timestamp >= NOW() - INTERVAL '30 days';`;

    const data = await db.any(query);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify(err.message), {
      status: 500,
    });
  }
};
