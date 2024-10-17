/**
 * @api {get} /api/dust-data Get gas data
 * @description This file is the route for the gas-data API
 */
import db from "@/db";

export const dynamic = 'force-dynamic';

export const GET = async () => {
    try {
        const data = await db.any('select * FROM gas ORDER BY timestamp DESC LIMIT 1');
        
        return new Response(JSON.stringify(data), {
            status: 200
        });
    } catch (err) {
        console.error(err);
        response.status(500).send('Server Error');
    }
}