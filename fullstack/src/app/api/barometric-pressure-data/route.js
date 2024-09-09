/**
 * @api {get} /api/barometric-pressure-data Get Barometric Pressure Data
 */
import db from "@/db";


export const GET = async () => {
    try {
        const data = await db.any('SELECT * FROM sensor_pressure');

        return new Response(JSON.stringify(data), {
            status: 200
        });
    } catch (err) {
        console.error(err);
        response.status(500).send('Server Error');
    }
}