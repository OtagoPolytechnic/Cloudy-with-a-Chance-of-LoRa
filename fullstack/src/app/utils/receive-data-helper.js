import db from "@/db"

export const PressureData = async (device_id, pressure) => {
    const send = await db.one(
        'INSERT INTO pressure (device_id, pressure) VALUES ($1, $2) RETURNING *',
        [device_id, pressure]
    )
    return send;
}

export const DustData = async (device_id, dust) => {
    const send = await db.one(
        'INSERT INTO dust (device_id, dust) VALUES ($1, $2) RETURNING *',
        [device_id, dust]
    )
    return send;
}

export const HumidityData = async (device_id, humidity) => {
    const send = await db.one(
        'INSERT INTO humidity (device_id, humidity) VALUES ($1, $2) RETURNING *',
        [device_id, humidity]
    )
    return send;
}

export const TemperatureData = async (device_id, temperature) => {
    const send = await db.one(
        'INSERT INTO temperature (device_id, temperature) VALUES ($1, $2) RETURNING *',
        [device_id, temperature]
    )
    return send;
}

export const CO2Data = async (device_id, co2_level) => {
    const send = await db.one(
        'INSERT INTO co2 (device_id, co2_level) VALUES ($1, $2) RETURNING *',
        [device_id, co2_level]
    )
    return send;
}

export const GasData = async (device_id, gas_level) => {
    const send = await db.one(
        'INSERT INTO gas (device_id, gas_level) VALUES ($1, $2) RETURNING *',
        [device_id, gas_level]
    )
    return send;
}


export const WindData = async (device_id, wind_speed, wind_direction) => {
    const send = await db.one(
        'INSERT INTO wind (device_id, wind_speed, wind_direction) VALUES ($1, $2, $3) RETURNING *',
        [device_id, wind_speed, wind_direction]
    )
    return send;
}