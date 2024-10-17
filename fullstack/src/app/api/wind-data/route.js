/**
 * @api {get} /api/dust-data Get wind data
 * @description This file is the route for the wind-data API
 */
import db from "@/db";

export const dynamic = 'force-dynamic';

export const GET = async () => {
    try {
        const data = await db.any('select * FROM wind ORDER BY timestamp DESC LIMIT 1');

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