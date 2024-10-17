/**
 * @api {get} /api/dust-data Get dust data
 * @description This file is the route for the dust-data API
 */
import db from "@/db";

export const dynamic = 'force-dynamic';

export const GET = async () => {
    try {
        const data = await db.any('select * FROM dust ORDER BY timestamp DESC LIMIT 1');

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store', // Prevent caching
            },
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Server Error' }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
            },
        });
    }
}