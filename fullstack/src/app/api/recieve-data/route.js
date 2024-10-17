/**
 * @file This file is the route for the receive-data API
 * @module app/api/receive-data
 * @description This file is the route for the receive-data API
 * - The POST method is used to receive data from the webhook
 * - The data is then seperated into different tables based on the data type
 * - The data is then sent to the database which have been functioned to keep code readable
 * and will be found in the receive-data-helper.js utils file
 */
import { DustData, HumidityData, TemperatureData, PressureData, CO2Data, GasData, WindData } from "@/app/utils/receive-data-helper";

export const POST = async (request) => {
    try {
        const data = await request.json();
        let send = []
        /**
         * Since the webhook will send all data we will seperate the data
         * into different tables based on there data type
         */
        const device_id = data.end_device_ids.device_id;
        const humidity = data.uplink_message.decoded_payload.humidity ? data.uplink_message.decoded_payload.humidity : null;
        const temperature = data.uplink_message.decoded_payload.temperature ? data.uplink_message.decoded_payload.temperature : null;
        const pressure = data.uplink_message.decoded_payload.pressure ? data.uplink_message.decoded_payload.pressure : null;
        const co2_level = data.uplink_message.decoded_payload.co2 ? data.uplink_message.decoded_payload.co2 : null;
        const gas_level = data.uplink_message.decoded_payload.gas ? data.uplink_message.decoded_payload.gas : null;
        const dust = data.uplink_message.decoded_payload.dustDensity ? data.uplink_message.decoded_payload.dustDensity : null;
        const wind_speed = data.uplink_message.decoded_payload.wind_speed ? data.uplink_message.decoded_payload.wind_speed : null;
        const wind_direction = data.uplink_message.decoded_payload.wind_direction ? data.uplink_message.decoded_payload.wind_direction : null;

        if (!device_id){
            return new Response(JSON.stringify({ message: 'Device ID is required' }), {
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*', // Allow all origins
                    'Access-Control-Allow-Methods': 'POST', // Allow POST method
                },
                status: 400
            });
        }

        if (dust){
            const dustResults = await DustData(device_id, dust);
            send.push(dustResults)
        }

        if (humidity){
            const humidityResults = await HumidityData(device_id, humidity);
            send.push(humidityResults)
        }

        if (temperature){
            const temperatureResults = await TemperatureData(device_id, temperature);
            send.push(temperatureResults)
        }

        if (pressure){
            const pressureResults = await PressureData(device_id, pressure);
            send.push(pressureResults)
        }

        if (co2_level){
            const co2Results = await CO2Data(device_id, co2_level);
            send.push(co2Results)
        }

        if (gas_level){
            const gasResults = await GasData(device_id, gas_level);
            send.push(gasResults)
        }

        if (wind_direction && wind_speed){
            const windResults = await WindData(device_id, wind_speed, wind_direction);
            send.push(windResults)
        }

        return new Response(JSON.stringify(send), {
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow all origins
                'Access-Control-Allow-Methods': 'POST', // Allow POST method
            },
            status: 200,
        });
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), {
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow all origins
                'Access-Control-Allow-Methods': 'POST', // Allow POST method
            },
            status: 500
        });
    }
}
