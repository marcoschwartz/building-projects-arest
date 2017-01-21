// Libraries
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// Credentials
const char* ssid     = "wifi-name";
const char* password = "wifi-pass";

// Zapier settings
String host = "http://hooks.zapier.com";
String hook = "/hooks/catch/676862/h67vwe?test=data";

void setup() {

  // Seroa;
  Serial.begin(115200);
  delay(10);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
}



void loop() {

  if (digitalRead(5)) {

    // Use HTTPclient
    HTTPClient http;
    http.begin(host + hook);
    int result = http.GET();
 
    Serial.println("status code: " + String(result));

  }

}
