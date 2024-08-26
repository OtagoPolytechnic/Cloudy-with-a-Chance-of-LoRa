#include <Arduino.h>
#include <MHZ19.h>
#include <lmic.h>
#include <hal/hal.h>
#include <SPI.h>
#include "TinyLoRa.h"

const lmic_pinmap lmic_pins = {
    .nss = 8,
    .rxtx = LMIC_UNUSED_PIN,
    .rst = 3,
    .dio = {7, 6, LMIC_UNUSED_PIN},
    .rxtx_rx_active = 0,
    .rssi_cal = 8,
    .spi_freq = 1000000,
};

MHZ19 myMHZ19;
#define MHZ19_RX_PIN 4
#define MHZ19_TX_PIN 5

unsigned char loraData[8];

// Pinout for radio
TinyLoRa lora = TinyLoRa(7, 8, 4);

// How many times data transfer should occur, in seconds
const unsigned int sendInterval = 300;

uint8_t APPEUI[8] = { 0xF6, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 };
uint8_t APPKEY[16] = { 0x46, 0x57, 0xF0, 0xC8, 0xAF, 0x53, 0x44, 0xF9, 0xDB, 0xAF, 0x7A, 0xF9, 0x8C, 0x67, 0xC8, 0xD1 };
uint8_t DEVEUI[8] = { 0xF5, 0x9A, 0x06, 0xD0, 0x7E, 0xD5, 0xB3, 0x70 };
uint8_t DevAddr[4] = { 0x0E, 0x2B, 0x0D, 0x26 };
uint8_t NwkSkey[16] = { 0xC2, 0x7E, 0x85, 0x67, 0x13, 0x9A, 0xF0, 0x6B, 0x2D, 0xBD, 0xBE, 0xF9, 0x60, 0xA4, 0x30, 0xF8 };
uint8_t AppSkey[16] = { 0x02, 0x04, 0x6B, 0xF8, 0x24, 0x2F, 0xAD, 0xA2, 0x25, 0x03, 0x47, 0x1F, 0xC2, 0xBA, 0x15, 0xF2 };

void os_getDevKey (u1_t* buf) {  memcpy_P(buf, APPKEY, 16); }
void os_getDevEui (u1_t* buf) { memcpy_P(buf, DEVEUI, 8); }
void os_getArtEui (u1_t* buf) { memcpy_P(buf, APPEUI, 8); }

const unsigned TX_INTERVAL = 60;
static osjob_t sendjob;

void setup() {
    delay(2000);
    Serial.begin(9600);
    Serial.println(F("Starting"));

    // Initialize MH-Z19
    Serial1.begin(9600); 
    myMHZ19.begin(Serial1);
    myMHZ19.autoCalibration();
    Serial.println("MH-Z19 initialization successful.");

    // Initialize pin LED_BUILTIN as an output
    pinMode(LED_BUILTIN, OUTPUT);
    lora.begin();
    // Initialize LoRa
    Serial.print("Starting LoRa...");
    lora.setChannel(MULTI);
    lora.setDatarate(SF8BW125);
    if (!lora.begin()) {
        Serial.println("Failed");
        Serial.println("Check your radio");
        while (true);
    }
    Serial.println("OK");
}

void loop() {
    static unsigned long getDataTimer = 0;
    if (millis() - getDataTimer >= 2000) {
        // Read CO2 and Temperature
        int8_t CO2 = myMHZ19.getCO2();
        int8_t Temp = myMHZ19.getTemperature();
        
        // Format data for LoRa
        String payloadStr = String(CO2) + "," + String(Temp);
        payloadStr.toCharArray(loraData, sizeof(loraData) - 1);
        loraData[sizeof(loraData) - 1] = '\0';  // Ensure null-termination
    
        Serial.print("Sent data: ");
        Serial.println(payloadStr);
        Serial.println("Sending LoRa Data...");
        lora.sendData(loraData, sizeof(loraData), lora.frameCounter);
        Serial.print("Frame Counter: "); Serial.println(lora.frameCounter);
        lora.frameCounter++;

        // Blink LED to indicate packet sent
        digitalWrite(LED_BUILTIN, HIGH);
        delay(1000);
        digitalWrite(LED_BUILTIN, LOW);

        getDataTimer = millis();
    }
}
