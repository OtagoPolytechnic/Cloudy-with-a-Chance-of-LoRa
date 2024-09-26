#include <SPL06-007.h>
#include <Wire.h>
#include <SPI.h>
#include <lmic.h>
#include <hal/hal.h>
#include <arduino_lmic_hal_boards.h>
#include <esp_task_wdt.h>  // Include ESP32 watchdog library

// LoRaWAN settings
static const u1_t PROGMEM APPEUI[8] = { 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 };
void os_getArtEui(u1_t* buf) {
  memcpy_P(buf, APPEUI, 8);
}

static const u1_t PROGMEM DEVEUI[8] = { 0x6B, 0xAA, 0x06, 0xD0, 0x7E, 0xD5, 0xB3, 0x70 };
void os_getDevEui(u1_t* buf) {
  memcpy_P(buf, DEVEUI, 8);
}

static const u1_t PROGMEM APPKEY[16] = { 0x7C, 0x0B, 0x79, 0xE6, 0x21, 0x9F, 0xE9, 0x2B, 0xFC, 0x5C, 0x67, 0x06, 0x25, 0x59, 0xE9, 0x85 };
void os_getDevKey(u1_t* buf) {
  memcpy_P(buf, APPKEY, 16);
}

// Variables to track time
unsigned long previousMillis = 0;
const unsigned long interval = 86400000;  // 24 hours in milliseconds 86400000
unsigned long currentMilis = 0;
unsigned long previousMillisWDT = 0;     // Store the last time the WDT was reset
const unsigned long wdtInterval = 1000;  // 1 second interval

unsigned char payload[5];
unsigned char payloadR[11];
static osjob_t sendjob;

const unsigned TX_INTERVAL = 600;

// State variable to track which payload to send
int payloadState = 0;  // 0 = temperature/pressure, 1 = temperature/CO2

void setup() {
  delay(5000);
  Wire.begin();
  Serial.begin(9600);
  Serial.println(F("Starting"));

  // Define the WDT config
  const esp_task_wdt_config_t wdt_config = {
    .timeout_ms = 10000,   // 10 seconds timeout
    .trigger_panic = true  // Set true to trigger panic on timeout
  };

  // Initialize the WDT with the new config structure
  esp_task_wdt_reconfigure(&wdt_config);
  esp_task_wdt_add(NULL);

  // Error handling for I2C request
  if (Wire.requestFrom(0x08, 11) == 11) {
    Wire.readBytes(payloadR, 11);
    // Decode the first two bytes as temperature
    float temperature = decodeTemperature(payloadR[0], payloadR[1]);
    // Decode the next two bytes as CO2
    float CO2 = decodeCO2(payloadR[2], payloadR[3]);
  } else {
    Serial.println("Failed to read from I2C device");
  }

  // LMIC init using the computed target
  const lmic_pinmap* pPinMap = Arduino_LMIC::GetPinmap_ThisBoard();

  // don't die mysteriously; die noisily.
  if (pPinMap == nullptr) {
    pinMode(LED_BUILTIN, OUTPUT);
    for (;;) {
      // flash lights, sleep.
      for (int i = 0; i < 5; ++i) {
        digitalWrite(LED_BUILTIN, 1);
        delay(100);
        digitalWrite(LED_BUILTIN, 0);
        delay(900);
      }
      Serial.println(F("board not known to library; add pinmap or update getconfig_thisboard.cpp"));
    }
  }

  os_init_ex(pPinMap);

  // Reset the MAC state. Session and pending data transfers will be discarded.
  LMIC_reset();
  Serial.println(F("LMIC reset done"));

  LMIC_setLinkCheckMode(0);
  LMIC_setDrTxpow(DR_SF7, 14);
  LMIC_selectSubBand(1);

  // Start job (sending automatically starts OTAA too)
  do_send(&sendjob);
}

void printHex2(unsigned v) {
  v &= 0xff;
  if (v < 16)
    Serial.print('0');
  Serial.print(v, HEX);
}

void onEvent(ev_t ev) {
  Serial.print(os_getTime());
  Serial.print(": ");
  switch (ev) {
    case EV_SCAN_TIMEOUT:
      Serial.println(F("EV_SCAN_TIMEOUT"));
      break;
    case EV_BEACON_FOUND:
      Serial.println(F("EV_BEACON_FOUND"));
      break;
    case EV_BEACON_MISSED:
      Serial.println(F("EV_BEACON_MISSED"));
      break;
    case EV_BEACON_TRACKED:
      Serial.println(F("EV_BEACON_TRACKED"));
      break;
    case EV_JOINING:
      Serial.println(F("EV_JOINING"));
      break;
    case EV_JOINED:
      Serial.println(F("EV_JOINED"));
      {
        u4_t netid = 0;
        devaddr_t devaddr = 0;
        u1_t nwkKey[16];
        u1_t artKey[16];
        LMIC_getSessionKeys(&netid, &devaddr, nwkKey, artKey);
        Serial.print("netid: ");
        Serial.println(netid, DEC);
        Serial.print("devaddr: ");
        Serial.println(devaddr, HEX);
        Serial.print("AppSKey: ");
        for (size_t i = 0; i < sizeof(artKey); ++i) {
          if (i != 0)
            Serial.print("-");
          printHex2(artKey[i]);
        }
        Serial.println("");
        Serial.print("NwkSKey: ");
        for (size_t i = 0; i < sizeof(nwkKey); ++i) {
          if (i != 0)
            Serial.print("-");
          printHex2(nwkKey[i]);
        }
        Serial.println();
      }
      // Disable link check validation (automatically enabled
      // during join, but because slow data rates change max TX
      // size, we don't use it in this example.
      LMIC_setLinkCheckMode(0);
      break;
    /*
        || This event is defined but not used in the code. No
        || point in wasting codespace on it.
        ||
        || case EV_RFU1:
        ||     Serial.println(F("EV_RFU1"));
        ||     break;
        */
    case EV_JOIN_FAILED:
      Serial.println(F("EV_JOIN_FAILED"));
      break;
    case EV_REJOIN_FAILED:
      Serial.println(F("EV_REJOIN_FAILED"));
      break;
      break;
    case EV_TXCOMPLETE:
      Serial.println(F("EV_TXCOMPLETE (includes waiting for RX windows)"));
      if (LMIC.txrxFlags & TXRX_ACK)
        Serial.println(F("Received ack"));
      if (LMIC.dataLen) {
        Serial.println(F("Received "));
        Serial.println(LMIC.dataLen);
        Serial.println(F(" bytes of payload"));
      }

      // Transmission is complete, now switch to the other payload
      if (payloadState == 0) {
        payloadState = 1;  // Switch to temperature/CO2
      } else if (payloadState == 1) {
        payloadState = 2;  // Switch to temperature/pressure
      } else if (payloadState == 2) {
        payloadState = 0;
      }

      // Schedule next transmission
      os_setTimedCallback(&sendjob, os_getTime() + sec2osticks(TX_INTERVAL), do_send);
      break;
    case EV_LOST_TSYNC:
      Serial.println(F("EV_LOST_TSYNC"));
      break;
    case EV_RESET:
      Serial.println(F("EV_RESET"));
      break;
    case EV_RXCOMPLETE:
      // data received in ping slot
      Serial.println(F("EV_RXCOMPLETE"));
      break;
    case EV_LINK_DEAD:
      Serial.println(F("EV_LINK_DEAD"));
      break;
    case EV_LINK_ALIVE:
      Serial.println(F("EV_LINK_ALIVE"));
      break;
    /*
        || This event is defined but not used in the code. No
        || point in wasting codespace on it.
        ||
        || case EV_SCAN_FOUND:
        ||    Serial.println(F("EV_SCAN_FOUND"));
        ||    break;
        */
    case EV_TXSTART:
      Serial.println(F("EV_TXSTART"));
      break;
    case EV_TXCANCELED:
      Serial.println(F("EV_TXCANCELED"));
      break;
    case EV_RXSTART:
      /* do not print anything -- it wrecks timing */
      break;
    case EV_JOIN_TXCOMPLETE:
      Serial.println(F("EV_JOIN_TXCOMPLETE: no JoinAccept"));
      break;

    default:
      Serial.print(F("Unknown event: "));
      Serial.println((unsigned)ev);
      break;
  }
}

void do_send(osjob_t* j) {
  esp_task_wdt_reset();  // Reset the watchdog timer to prevent it from timing out
  // Check if there is not a current TX/RX job running
  if (LMIC.opmode & OP_TXRXPEND) {
    Serial.println(F("OP_TXRXPEND, not sending"));
  } else {
    // Error handling for I2C request
    if (Wire.requestFrom(0x08, 11) == 11) {
      Wire.readBytes(payloadR, 11);
      Serial.print("Received Data: ");
      for (int i = 0; i < 11; i++) {
        Serial.print(payloadR[i], HEX);
        Serial.print(" ");
      }
      Serial.println();

      // Decide which payload to send based on the payloadState
      if (payloadState == 0) {
        // Encode and send temperature and pressure
        float temperaturePres = get_temp_c();
        float pressure = get_pressure();

        uint16_t payloadTempPress = encodeFixedPoint100(temperaturePres);
        uint16_t payloadPressure = encodeFixedPoint1(pressure);

        payload[0] = lowByte(payloadTempPress);
        payload[1] = highByte(payloadTempPress);
        payload[2] = lowByte(payloadPressure);
        payload[3] = highByte(payloadPressure);

        LMIC_setTxData2(1, payload, 4, 0);  // Send on port 1
        Serial.println(F("Sending temperature/pressure"));

      } else if (payloadState == 1) {
        // Encode and send temperature and CO2
        float temperatureR = decodeTemperature(payloadR[0], payloadR[1]);
        float CO2R = decodeCO2(payloadR[2], payloadR[3]);

        uint16_t payloadTempCO2 = encodeFixedPoint100(temperatureR);
        uint16_t payloadCO2 = encodeFixedPoint1(CO2R);

        payload[0] = lowByte(payloadTempCO2);
        payload[1] = highByte(payloadTempCO2);
        payload[2] = lowByte(payloadCO2);
        payload[3] = highByte(payloadCO2);

        LMIC_setTxData2(2, payload, 4, 0);  // Send on port 3
        Serial.println(F("Sending temperature/CO2"));
      } else if (payloadState == 2) {
        // Encode and send wind data and rain
        float WindSpeed = decodeTemperature(payloadR[4], payloadR[5]);
        float Rain = decodeCO2(payloadR[6], payloadR[7]);
        float WindDir = decodeCO2(payloadR[8], payloadR[9]);

        uint16_t payloadWindSpeed = encodeFixedPoint100(WindSpeed);
        uint16_t payloadRain = encodeFixedPoint1(Rain);
        uint16_t payloadWindDir = encodeFixedPoint1(WindDir);

        payload[0] = lowByte(payloadWindSpeed);
        payload[1] = highByte(payloadWindSpeed);
        payload[2] = lowByte(payloadRain);
        payload[3] = highByte(payloadRain);
        payload[4] = lowByte(payloadWindDir);
        payload[5] = highByte(payloadWindDir);

        Serial.print("Payload Data: ");
        for (int i = 0; i < 6; i++) {
          Serial.print(payload[i], HEX);
          Serial.print(" ");
        }
        Serial.println();

        LMIC_setTxData2(3, payload, 6, 0);  // Send on port 3
        Serial.println(F("Sending wind/rain"));
      }
      esp_task_wdt_reset();  // Reset WDT again after processing
    } else {
      Serial.println("Failed to read from I2C device");
    }
  }
}

void loop() {
  currentMilis = millis();

  // Check if it's time to reset the watchdog timer (every 1 second)
  if (currentMilis - previousMillisWDT >= wdtInterval) {
    previousMillisWDT = currentMilis;  // Save the last time WDT was reset
    esp_task_wdt_reset();              // Reset (feed) the watchdog timer
  }

  // Check if 24 hours have passed
  if (currentMilis >= interval) {
    Serial.println("Restarting ESP32 after 24 hours...");
    ESP.restart();  // Restart the ESP32
  }

  os_runloop_once();  // Continue LMIC task processing
}

uint16_t encodeFixedPoint100(float value) {
  // Convert float to fixed-point (scale by 100 for 2 decimal places)
  int16_t fixedPointValue = (int16_t)(value * 100);
  return (uint16_t)fixedPointValue;
}

uint16_t encodeFixedPoint1(float value) {
  // Convert float to fixed-point (scale by 1 for 0 decimal places)
  int16_t fixedPointValue = (int16_t)(value);
  return (uint16_t)fixedPointValue;
}

// Function to decode temperature from the first two bytes of payload
float decodeTemperature(uint8_t tempLow, uint8_t tempHigh) {
  // Combine the two bytes into a single 16-bit integer
  int16_t fixedPointTemp = (tempHigh << 8) | tempLow;
  // Convert back to float by dividing by 100 to account for the fixed-point scaling
  return (float)fixedPointTemp / 100.0;
}

// Function to decode CO2 from the next two bytes of payload
float decodeCO2(uint8_t CO2Low, uint8_t CO2High) {
  // Combine the two bytes into a single 16-bit integer
  int16_t fixedPointCO2 = (CO2High << 8) | CO2Low;
  // Convert back to float by dividing by 1 (no scaling applied for CO2)
  return (float)fixedPointCO2;
}
