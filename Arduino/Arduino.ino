int IRsensor = 3;
int IRsensor2 = 5;

void setup()
{
  Serial.begin(9600);
  pinMode(IRsensor, INPUT);
  pinMode(IRsensor2, INPUT);
}

void loop() {
  if (digitalRead(IRsensor) == 1) {
    Serial.print("*1#");
    Serial.print(digitalRead(IRsensor));
  } else {
    Serial.print("*1#");
    Serial.print(digitalRead(IRsensor));
  }

  if (digitalRead(IRsensor2) == 1) {
    Serial.print("*2#");
    Serial.print(digitalRead(IRsensor2));
  } else {
    Serial.print("*2#");
    Serial.print(digitalRead(IRsensor2));
  }
  delay(1000);
}
