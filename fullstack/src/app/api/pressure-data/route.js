/**
 * @api {get} /api/barometric-pressure-data Get Barometric Pressure Data
 */
import db from "@/db";


export const GET = async () => {
    try {
        const data = await db.any('select * FROM pressure ORDER BY timestamp DESC LIMIT 2');
        return new Response(JSON.stringify(data), {
            status: 200
        });
    } catch (err) {
        console.error(err);
        response.status(500).send('Server Error');
    }
}