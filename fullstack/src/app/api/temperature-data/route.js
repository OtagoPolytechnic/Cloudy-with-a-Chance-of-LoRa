/**
 * @api {get} /api/temp-data Get temperature data
 * @description This file is the route for the temperature-data API
 */
import db from "@/db";

export const dynamic = 'force-dynamic';

export const GET = async () => {
    try {
        const data = await db.any('SELECT average_temp() AS avg_temperature');
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