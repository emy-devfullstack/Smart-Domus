#define pot A0 

int i,j, pins[] = {8,9}, side = 0, velocidade;

void setup() {
  Serial.begin(9600);
  Serial.print("Digite 0 ou 1");
  for(i=0;i<2;i++){
    pinMode(pins[i],OUTPUT);
  }
}

void loop() {
  
  if(Serial.available() > 0){  
    side = Serial.read();
  }
  velocidade = analogRead(pot); 
  velocidade = map(velocidade,0,1023,1,100);
      
  if(side == 49){ 
    digitalWrite(pins[1],HIGH); 
    Serial.println("Horario");
    Serial.println(velocidade);
    digitalWrite(pins[0],HIGH);
    delay(velocidade); 
    digitalWrite(pins[0],LOW);
  }
  if(side == 48){ 
    digitalWrite(pins[1],LOW); 
    Serial.println("Anti-Horario");
    Serial.println(velocidade);
    digitalWrite(pins[0],HIGH); 
    delay(velocidade);
    digitalWrite(pins[0],LOW); 
  }
}
