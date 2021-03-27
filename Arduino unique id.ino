#include <ArduinoUniqueID.h>

char IDstring[8] = "";

void setup() {
  Serial.begin(115200);
}
void loop() {
  for (size_t i = 0; i < 8; i++)
    IDstring[i] = UniqueID[i], HEX;

  Serial.println(IDstring);
  delay(1000);
}
