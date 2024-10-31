/**
 * @file This file is the route for the receive-data API
 * @module app/api/receive-data
 * @description This file is the route for the receive-data API
 * - The POST method is used to receive data from the webhook
 * - The data is then seperated into different tables based on the data type
 * - The data is then sent to the database which have been functioned to keep code readable
 * and will be found in the receive-data-helper.js utils file
 */
import {
  DustData,
  TemperatureData,
  PressureData,
  CO2Data,
  GasData,
  WindData,
  RainData,
} from '@/app/utils/receive-data-helper';
export const dynamic = 'force-dynamic';

export const POST = async (request) => {
  try {
    const authHeader = request.headers.get('authorization');
    const data = await request.json();
    let send = [];
    /**
     * Since the webhook will send all data we will  the data
     * into different tables based on there data type
     */

    const decodedPayload = data.uplink_message?.decoded_payload;

    if (!decodedPayload) {
      return new Response(
        JSON.stringify({ message: 'Decoded payload is required' }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
          },
          status: 400,
        },
      );
    }

    const device_id = data.end_device_ids.device_id;
    console.log(decodedPayload);
    const temperature = decodedPayload.temperature ?? null;
    const pressure = decodedPayload.pressure ?? null;
    const co2_level = decodedPayload.co2 ?? null;
    const gas_level = decodedPayload.tvoc ?? null;
    const dust = decodedPayload.dustDensity ?? null;
    const wind_speed = decodedPayload.windSpeed ?? null;
    const wind_direction = decodedPayload.windDir ?? null;
    const rain_gauge = decodedPayload.rain_gauge ?? null;

    console.log(device_id, 'device');
    console.log(temperature, 'temp');

    const sensorData = [
      { condition: dust, fetchData: DustData },
      { condition: temperature, fetchData: TemperatureData },
      { condition: pressure, fetchData: PressureData },
      { condition: co2_level, fetchData: CO2Data },
      { condition: gas_level, fetchData: GasData },
      { condition: wind_direction && wind_speed, fetchData: WindData },
      { condition: rain_gauge, fetchData: RainData },
    ];

    if (!authHeader) return new Response('Authentication Required');

    // console.log(authHeader)
    // const splitAuth = authHeader.split(" ")[1]
    // console.log(splitAuth, "auth")
    // console.log(process.env.PASSWORD, "emv")
    // if (splitAuth !== process.env.PASSWORD) return new Response("You are not authorized to post")

    if (!device_id) {
      return new Response(
        JSON.stringify({ message: 'Device ID is required' }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Allow all origins
            'Access-Control-Allow-Methods': 'POST', // Allow POST method
          },
          status: 400,
        },
      );
    }

    for (const { condition, fetchData } of sensorData) {
      if (condition) {
        const results = await fetchData(
          device_id,
          ...(Array.isArray(condition) ? condition : [condition]),
        );
        send.push(results);
      }
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
      status: 500,
    });
  }
};
