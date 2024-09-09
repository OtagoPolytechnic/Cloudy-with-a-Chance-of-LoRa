import db from "@/db"

export const BarometricPressureData = async () => {
    const send = await db.one(
        'INSERT INTO sensor_pressure (device_id, pressure) VALUES ($1, $2) RETURNING *',
        [device_id, pressure]
    )

    return send;
}