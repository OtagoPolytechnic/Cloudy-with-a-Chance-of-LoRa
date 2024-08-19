#include <Arduino.h>
#include "MHZ19.h"

#define BAUDRATE 9600

MHZ19 myMHZ19;  // Constructor for the library

void setup() {
    Serial.begin(9600);           // Serial monitor for debugging
    Serial1.begin(BAUDRATE);      // Use hardware serial port 1 for MH-Z19 communication
    myMHZ19.begin(Serial1);       // Initialize the sensor with hardware serial port 1
    myMHZ19.autoCalibration();    // Turn auto calibration ON (use false to turn it OFF)
}

void loop() {
    static unsigned long getDataTimer = 0;

    if (millis() - getDataTimer >= 2000) {
        int CO2 = myMHZ19.getCO2();  // Request CO2 (ppm)
        Serial.print("CO2 (ppm): ");
        Serial.println(CO2);

        int8_t Temp = myMHZ19.getTemperature();  // Request Temperature (Celsius)
        Serial.print("Temperature (C): ");
        Serial.println(Temp);

        getDataTimer = millis();
    }
}
