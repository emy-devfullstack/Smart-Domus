#include <Servo.h>

// ----------------------------------------
// 1. PINOS DO SISTEMA VARAL/CLIMA 
// ----------------------------------------
const int pinoSensorAgua = A0;      // Sensor de Umidade/Água
const int pinoServo = 10;           // Servo Motor (VARAL AUTOMÁTICO)
const int pinoLED_Clima = 13;       // LED de Status (Indica Varal Exposto/Recolhido)
const int pinoSensorTemperatura = A1; // Sensor de Temperatura (Mantido, mas não usado na lógica)

// --- Criação de Objetos e Constantes do Varal/Clima ---
Servo meuServo;
// O estado inicial lógico é 'recolhido' (true), correspondente a 0 graus.
bool varalEstaRecolhido = true; 

// Constantes de calibração
const int LIMITE_AGUA = 250; 

// POSIÇÕES FINAIS (0°, 180°)
const int VARAL_RECOLHIDO_0 = 0;   // Posição Final quando MOLHADO
const int VARAL_EXPOSTO_180 = 180;  // Posição Final quando SECO

// Tempo de giro para a simulação do movimento
const long TEMPO_GIRO_COMPLETO_MS = 3000; 

// ----------------------------------------
// 2. PINOS DO SISTEMA DISTÂNCIA/ILUMINAÇÃO
// ----------------------------------------
const int trigPin = 2; // Trigger (HC-SR04)
const int echoPin = 3; // Echo (HC-SR04)

// Pinos dos LEDs de Iluminação (Distância)
const int ledDistancia1 = 6;
const int ledDistancia2 = 7;
const int ledDistancia3 = 8;

// Constante de Distância CRÍTICA (em cm)
const int DISTANCIA_LIMITE = 20; // Limite para acender as luzes

// --------------------------------------------------------------------------------

// FUNÇÃO PARA O SISTEMA DE DISTÂNCIA
long lerDistancia() {
  // Gera um pulso no pino Trigger
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Mede a duração do pulso de retorno
  long duracao = pulseIn(echoPin, HIGH);
  // Converte o tempo de duração em distância (cm)
  long distancia = duracao * 0.034 / 2;
  return distancia;
}

void controlarDistancia() {
  long distanciaAtual = lerDistancia();
  
  // LÓGICA DE ILUMINAÇÃO: Acende os LEDs se a distância for crítica
  if (distanciaAtual < DISTANCIA_LIMITE && distanciaAtual > 0) {
    digitalWrite(ledDistancia1, HIGH);
    digitalWrite(ledDistancia2, HIGH);
    digitalWrite(ledDistancia3, HIGH);
  } else {
    digitalWrite(ledDistancia1, LOW);
    digitalWrite(ledDistancia2, LOW);
    digitalWrite(ledDistancia3, LOW);
  }
}

// --------------------------------------------------------------------------------

void setup() {
  // CONFIGURAÇÃO DO SISTEMA VARAL/CLIMA
  pinMode(pinoLED_Clima, OUTPUT);
  
  // No início, se o varal está logicamente recolhido, movemos o servo para 0° e o desligamos.
  meuServo.attach(pinoServo);
  meuServo.write(VARAL_RECOLHIDO_0); 
  delay(100); 
  meuServo.detach();
  
  // CONFIGURAÇÃO DO SISTEMA DE DISTÂNCIA/ILUMINAÇÃO
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(ledDistancia1, OUTPUT);
  pinMode(ledDistancia2, OUTPUT);
  pinMode(ledDistancia3, OUTPUT);
  
  Serial.begin(9600);
  Serial.println(">>> Automação Residencial Integrada - Varal e Iluminação <<<");
}

// --------------------------------------------------------------------------------

void loop() {
  // 1. EXECUTA O SISTEMA VARAL/CLIMA (Lógica de Umidade)
  int valorUmidade = analogRead(pinoSensorAgua);
  Serial.print("Umidade: ");
  Serial.println(valorUmidade);
  
  // CONDIÇÃO 1: MOLHADO (valorUmidade > 250) -> RECOLHER VARAL (0°)
  // Move APENAS se estiver MOLHADO E o varal estiver EXPOSTO (!varalEstaRecolhido)
  if (valorUmidade > LIMITE_AGUA && !varalEstaRecolhido) {
    Serial.println("Chuva detectada. Recolhendo Varal para 0 graus.");
    
    // 1. ANEXA o servo para ativar o movimento
    meuServo.attach(pinoServo); 
    
    // 2. Gira para a posição de Recolhido (0°)
    meuServo.write(VARAL_RECOLHIDO_0);  
    delay(TEMPO_GIRO_COMPLETO_MS);
    
    // 3. DESANEXA o servo para PARAR O SINAL e evitar oscilação, mantendo 0°
    meuServo.detach(); 
    
    // 4. Atualiza o status e LED
    digitalWrite(pinoLED_Clima, LOW); // LED desligado = Recolhido/Seguro
    varalEstaRecolhido = true;      
  }  
  
  // CONDIÇÃO 2: SECO (valorUmidade <= 250) -> EXPOR VARAL (180°)
  // Move APENAS se estiver SECO E o varal estiver RECOLHIDO (varalEstaRecolhido)
  else if (valorUmidade <= LIMITE_AGUA && varalEstaRecolhido) {
    Serial.println("Tempo seco. Expondo Varal para 180 graus.");

    // 1. ANEXA o servo para ativar o movimento
    meuServo.attach(pinoServo); 
    
    // 2. Gira para a posição de Exposto (180°)
    meuServo.write(VARAL_EXPOSTO_180);  
    delay(TEMPO_GIRO_COMPLETO_MS);
    
    // 3. DESANEXA o servo para PARAR O SINAL e evitar oscilação, mantendo 180°
    meuServo.detach();
    
    // 4. Atualiza o status e LED
    digitalWrite(pinoLED_Clima, HIGH); // LED ligado = Exposto/Secando
    varalEstaRecolhido = false;      
  }
  
  // 2. EXECUTA O SISTEMA DE DISTÂNCIA/ILUMINAÇÃO
  controlarDistancia();
  
  // Pequeno atraso para estabilidade
  delay(100); 
}