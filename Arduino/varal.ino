#include <Servo.h>


// Inicializa relés desligados (ajuste conforme necessidade)
digitalWrite(RELAY_1_PIN, LOW);
digitalWrite(RELAY_2_PIN, LOW);
digitalWrite(RELAY_3_PIN, LOW);


// Posição inicial do varal (recolhido)
varal.write(RETRACT_ANGLE);
delay(500);


Serial.println("READY");
}


void loop() {
// Ler PIR e enviar alterações ao host
int curPir = digitalRead(PIR_PIN);
if (curPir != pirState) {
pirState = curPir;
Serial.print("PIR:");
Serial.println(pirState);
}


// Ler serial para comandos do servidor
if (Serial.available()) {
String cmd = Serial.readStringUntil('\n');
cmd.trim();
handleCommand(cmd);
}
}


void handleCommand(const String &cmd) {
// Comandos esperados:
// VARAL:EXTEND -> estender (girar anti-horário para EXTEND_ANGLE)
// VARAL:RETRACT -> recolher para RETRACT_ANGLE
// LIGHT:<n>:ON -> liga luz do cômodo n (1..3)
// LIGHT:<n>:OFF -> desliga luz do cômodo n


if (cmd.startsWith("VARAL:")) {
if (cmd.endsWith("EXTEND")) {
// girar sentido anti-horário — garantia de movimento suave
for (int a = varal.read(); a <= EXTEND_ANGLE; a += 5) {
varal.write(a);
delay(50);
}
Serial.println("VARAL:EXTENDED");
} else if (cmd.endsWith("RETRACT")) {
for (int a = varal.read(); a >= RETRACT_ANGLE; a -= 5) {
varal.write(a);
delay(50);
}
Serial.println("VARAL:RETRACTED");
}
} else if (cmd.startsWith("LIGHT:")) {
// parse LIGHT:n:ON/OFF
int firstCol = cmd.indexOf(':');
int secondCol = cmd.indexOf(':', firstCol + 1);
if (firstCol >= 0 && secondCol >= 0) {
String numS = cmd.substring(firstCol + 1, secondCol);
int num = numS.toInt();
String action = cmd.substring(secondCol + 1);
int pin = -1;
if (num == 1) pin = RELAY_1_PIN;
if (num == 2) pin = RELAY_2_PIN;
if (num == 3) pin = RELAY_3_PIN;
if (pin != -1) {
if (action == "ON") digitalWrite(pin, HIGH);
else digitalWrite(pin, LOW);
Serial.print("LIGHT:");
Serial.print(num);
Serial.print(":");
Serial.println(action);
}
}
} else if (cmd == "STATUS") {
Serial.print("STATUS:PIR:");
Serial.println(pirState);
}
}
