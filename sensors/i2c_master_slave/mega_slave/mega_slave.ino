#include <SPI.h>
#include "MHZ19.h"
#include <Wire.h>

#define BAUDRATE 9600

MHZ19 myMHZ19;

// Variables for temperature, CO2, wind speed, and rainfall
float temperature = 0;
float CO2 = 0;
float windSpeed = 0;  
float rainfall = 0;   

// Variables for wind and rain measurements
volatile unsigned long lastWindPulseTime = 0;
volatile unsigned long currentWindPulseTime = 0;
volatile unsigned long rainPulseCount = 0;
volatile unsigned long windPulseCount = 0; // To count wind pulses for a time interval

// Timing variables for daily rainfall reset and wind speed updates
unsigned long previousWindUpdateMillis = 0;
unsigned long previousRainResetMillis = 0;
const unsigned long windUpdateInterval = 1000;  // 10 seconds in milliseconds
const unsigned long rainResetInterval = 86400000;  // 24 hours in milliseconds

// Payload array to hold all sensor data
unsigned char payload[9];  

void setup() {
  Serial.begin(9600);  // Display on serial monitor
  while (!Serial)
    ;

  Serial1.begin(9600);
  myMHZ19.begin(Serial1);    // Initialize the sensor with hardware serial port 1
  Serial1.begin(9600);

  Wire.begin(0x08);
  Wire.onRequest(requestEvent);

  // Initialize interrupts for wind speed and rainfall sensors
  pinMode(2, INPUT_PULLUP);  // Wind sensor on D2
  pinMode(3, INPUT_PULLUP);  // Rain sensor on D3
  attachInterrupt(digitalPinToInterrupt(2), windISR, RISING); // Wind sensor on D2/INT4
  attachInterrupt(digitalPinToInterrupt(3), rainISR, RISING); // Rain sensor on D3/INT5

  // Set up CO2 sensor
  myMHZ19.autoCalibration();  // Turn auto calibration ON (use false to turn it OFF)
  myMHZ19.setRange(5000);     // Set CO2 range to 5000 ppm

  Serial.println("Sensors initialized.");
}

void loop() {
  unsigned long currentMillis = millis();

  // Check if it's time to update wind speed and send data (every 10 seconds)
  if (currentMillis - previousWindUpdateMillis >= windUpdateInterval) {
    // Read the temperature and CO2 from the sensor
    temperature = myMHZ19.getTemperature();
    CO2 = myMHZ19.getCO2(true);

    // Wind speed calculation
    windSpeed = windPulseCount * 2.4 / 10.0;  // Convert pulses to m/s (assuming 2.4 m/s for 1 pulse per second)
    windPulseCount = 0;  // Reset wind pulse count after each update
    previousWindUpdateMillis = currentMillis;  // Update the last wind update time

    // Rainfall calculation (each pulse represents 0.2794 mm of rainfall)
    rainfall = rainPulseCount * 0.2794;

    // Print sensor values to the serial monitor
    // Serial.print("Temperature: ");
    // Serial.print(temperature);
    // Serial.println(" *C");
    // Serial.print("CO2: ");
    // Serial.print(CO2);
    // Serial.println(" ppm");
    // Serial.print("Wind Speed: ");
    // Serial.print(windSpeed);
    // Serial.println(" m/s");
    // Serial.print("Total Rainfall: ");
    // Serial.print(rainfall);
    // Serial.println(" mm");

    // Encode all sensor data
    uint16_t payloadTemp = encodeFixedPoint(temperature);
    uint16_t payloadCO2 = encodeFixedPointCO2(CO2);
    uint16_t payloadWind = encodeFixedPoint(windSpeed);
    uint16_t payloadRain = encodeFixedPointCO2(rainfall);

    // Convert to bytes and fill the payload
    payload[0] = lowByte(payloadTemp);
    payload[1] = highByte(payloadTemp);
    payload[2] = lowByte(payloadCO2);
    payload[3] = highByte(payloadCO2);
    payload[4] = lowByte(payloadWind);
    payload[5] = highByte(payloadWind);
    payload[6] = lowByte(payloadRain);
    payload[7] = highByte(payloadRain);
    payload[8] = 0;  // Reserved or checksum byte (optional)

    // Print payload for debugging
  //   Serial.print("Payload: ");
  //   for (int i = 0; i < sizeof(payload); i++) {
  //     Serial.print(payload[i], HEX);
  //     Serial.print(" ");
  //   }
  //   Serial.println();
  }

  // Daily reset of rainfall
  if (currentMillis - previousRainResetMillis >= rainResetInterval) {
    rainPulseCount = 0;  // Reset rain pulse count every 24 hours
    previousRainResetMillis = currentMillis;  // Update the last reset time
    Serial.println("Rainfall count reset for the day.");
  }
}

void requestEvent() {
  // Send the payload via I2C
  Wire.write((char*)&payload, sizeof(payload));
}

uint16_t encodeFixedPoint(float value) {
  // Convert float to fixed-point (scale by 100 for 2 decimal places)
  int16_t fixedPointValue = (int16_t)(value * 100);
  return (uint16_t)fixedPointValue;
}

uint16_t encodeFixedPointCO2(float value) {
  // Convert CO2 float value (no decimal places)
  int16_t fixedPointValue = (int16_t)(value);
  return (uint16_t)fixedPointValue;
}

// ISR for wind sensor on D2/INT4
void windISR() {
  windPulseCount++;  // Increment wind pulse count
}

// ISR for rain sensor on D3/INT5
void rainISR() {
  rainPulseCount++;  // Increment the rainfall pulse count
}