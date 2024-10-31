/**
 * @api {get} /api/get-graph-data Get all data
 * @description This file is the route for the get-graph-data API
 */
import { isRateLimited } from '@/app/utils/ratelimit';
import db from '@/db';

export const dynamic = 'force-dynamic';

/**
 * @description Gets a month worth of data of any type
 */
export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.connection.remoteAddress;
    const MAX_REQUESTS = 7 * 15;
    const [table, value, length] = ['table', 'value', 'length'].map((param) =>
      searchParams.get(param),
    );

    if (isRateLimited(ip, MAX_REQUESTS)) {
      return new Response('Too many requests', { status: 429 });
    }

    const allowedTypes = [
      { table: 'temperature', value: 'temperature' },
      { table: 'pressure', value: 'pressure' },
      { table: 'humidity', value: 'humidity' },
      { table: 'wind', value: 'wind_speed' },
      { table: 'rain_gauge', value: 'rain_gauge' },
      { table: 'dust', value: 'dust' },
      { table: 'co2', value: 'co2_level' },
      { table: 'gas', value: 'gas_level' },
    ];
    const allowedValues = [7, 30];

    if (!allowedValues.includes(Number(length))) {
      return new Response(
        JSON.stringify({ error: 'Invalid data length requested' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const isValidType = allowedTypes.some(
      (type) => type.table === table && type.value === value,
    );

    if (!isValidType) {
      return new Response(
        JSON.stringify({ error: 'Invalid data type requested' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const query = `SELECT * FROM get_daily_avg_data('${table}', '${value}', ${length});`;

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
