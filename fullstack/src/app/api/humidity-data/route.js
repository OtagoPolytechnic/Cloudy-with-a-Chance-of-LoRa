/**
 * @api {get} /api/dust-data get humidity data
 * @description This file is the route for the Humidity-data API
 */
import db from "@/db";

export const GET = async () => {
    try {
        const data = await db.any('SELECT * FROM humidity ORDER BY timestamp DESC LIMIT 2');
        return new Response(JSON.stringify(data), {
            status: 200
        });
    } catch (err) {
        console.error(err);
        response.status(500).send('Server Error');
    }
}