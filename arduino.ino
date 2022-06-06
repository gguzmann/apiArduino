
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>

//Conectarse a Wifi
const char* ssid = "Nombre red";
const char* password = "Password red";

// Conectarse a Wifi
void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando...");
  }
}

void loop() {
  // SI ESTA CONECTADO A UN WIFI:    
  if (WiFi.status() == WL_CONNECTED) {
    
    WiFiClient client;
    HTTPClient http;

    // URL API
    //String link = "http://nodemcuesp8266test.herokuapp.com/contacto";
    String link = "http://192.168.0.9:3000/";

    Serial.println("coneccion http: ", link);
    http.begin(client, link);

    //POST request
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST("{\"temperatura\":\"19°\"}");
    Serial.println("POST");

    //GET request
    //int httpResponseCode = http.GET();
    //Serial.println("GET");

    // RESPUESTA DESDE SERVIDOR
    String payload = http.getString();
    Serial.print("HTTP responde code: ");
    Serial.println(httpResponseCode);
    Serial.print(payload);

    // CERRAR CONECION
    http.end();
  }
    // ESPERAR 1 MIN Y VOLVER A EJECUTAR LOOP
    delay(60000);
}