// Libraries
#include <SPI.h>
#include <WiFi101.h>
#include <aREST.h>
#include "DHT.h"

// Status
int status = WL_IDLE_STATUS;

// DHT 11 sensor
#define DHTPIN 7
#define DHTTYPE DHT11 

// Remote server
char* servername = "10.5.243.147";
int port = 3000;

// WiFi parameters
char ssid[] = "toya123467892";
char password[] = "85266214";

// DHT sensor
DHT dht(DHTPIN, DHTTYPE);

// Ethernet server & client
WiFiServer server(80);
WiFiClient restClient;

// Create aREST instance
aREST rest = aREST(servername, port);

// Counter
int counter;

// Measurement interval
int measurement_interval = 60 * 1000; // 1 minute

// Variables to be exposed to the API
int temperature;
int humidity;

void setup(void)
{
  // Start Serial
  Serial.begin(115200);

  // Init variables and expose them to REST API
  rest.variable("temperature",&temperature);
  rest.variable("humidity",&humidity);
  
  // Give name and ID to device
  rest.set_id("1");
  rest.set_name("mkr1000_record");

  // Connect to WiFi
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid, password);

    // Wait 10 seconds for connection:
    delay(10000);
  }
  
  Serial.println("WiFi connected");
  
  // Start the server
  server.begin();
  Serial.println("Server started");

  // Print the IP address
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // Start counter 
  counter = millis();

}

void loop() {

  // Make measurements
  humidity = (int)dht.readHumidity();
  temperature = (int)dht.readTemperature();

  // Publish
  if ( (millis() - counter) > measurement_interval) {
    if (restClient.connect(servername, port)) {
      rest.publish(restClient, "temperature", temperature);
      rest.publish(restClient, "humidity", humidity);
    }
    counter = millis();
  }

 // Handle REST calls
  WiFiClient client = server.available();
  if (!client) {
    return;
  }
  while(!client.available()){
    delay(1);
  }
  rest.handle(client);

}

