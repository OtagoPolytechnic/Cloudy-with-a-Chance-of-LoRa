/**
 * @api {get} /api/dust-data Get co2 data
 * @description This file is the route for the co2-data API
 */
import db from "@/db";

export const GET = async () => {
    try {
        const data = await db.any('select * FROM gas ORDER BY timestamp DESC LIMIT 2');
        
        return new Response(JSON.stringify(data), {
            status: 200
        });
    } catch (err) {
        console.error(err);
        response.status(500).send('Server Error');
    }
}