/**
 * @api {get} /api/dust-data Get co2 data
 * @description This file is the route for the co2-data API
 */
import db from "@/db";

export const dynamic = 'force-dynamic';

export const GET = async () => {
    try {
        const data = await db.any('select * FROM co2 ORDER BY timestamp DESC LIMIT 1');

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
}