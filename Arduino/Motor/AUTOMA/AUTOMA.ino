#include <Servo.h>

// ----------------------------------------
// 1. PINOS DO SISTEMA VARAL/CLIMA (Não Alterado)
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
const int VARAL_RECOLHIDO_0 = 0;    // Posição Final quando MOLHADO
const int VARAL_EXPOSTO_180 = 180;  // Posição Final quando SECO

// Tempo de giro para a simulação do movimento
const long TEMPO_GIRO_COMPLETO_MS = 3000; 

// Variável para evitar checagem de umidade a cada micro-loop (checa a cada 500ms)
unsigned long ultimoCheckUmidade = 0;
const long INTERVALO_CHECK_UMIDADE_MS = 500;


// ----------------------------------------
// 2. PINOS DO SISTEMA ILUMINAÇÃO POR PRESENÇA (PIR)
// ----------------------------------------
const int pinoPIR = 2;             // Pino do sensor de presença 
const int ledDistancia1 = 6;       // LED auxiliar 
const int ledDistancia2 = 8;       // LED principal de iluminação 
const int ledDistancia3 = 7;       // LED auxiliar

// Variáveis de estado do PIR e do LED de iluminação
bool estadoLuzesAcesas = false; // Armazena se as luzes estão HIGH ou LOW

// Tempo que as luzes permanecem acesas após a última detecção (5 segundos)
const long TEMPO_LUZ_ACESO_MS = 5000; 

// Variável para rastrear o último momento em que o movimento foi detectado
unsigned long ultimoMovimentoDetectado = 0; 

// --------------------------------------------------------------------------------

// FUNÇÃO PARA O SISTEMA DE ILUMINAÇÃO POR PRESENÇA (PIR)
void controlarPresenca() {
  // Realiza a leitura do sensor de presença
  int leituraPIR = digitalRead(pinoPIR); 

  if (leituraPIR == HIGH) { 
    // Se o movimento foi detectado
    
    // Atualiza o tempo da última detecção, resetando o timer de desligamento
    ultimoMovimentoDetectado = millis();
    
    // Se as luzes estavam apagadas, acende e imprime
    if (!estadoLuzesAcesas) {
      digitalWrite(ledDistancia1, HIGH); 
      digitalWrite(ledDistancia2, HIGH);
      digitalWrite(ledDistancia3, HIGH);
      Serial.println("Movimento detectado. Luzes LIGADAS.");
      estadoLuzesAcesas = true;
    }
    
  } 
  
  // Lógica de Desligamento: 
  // Verifica se as luzes estão acesas E se o TEMPO DE LUZ ACESA já passou
  if (estadoLuzesAcesas && (millis() - ultimoMovimentoDetectado >= TEMPO_LUZ_ACESO_MS)) {
    // Desliga as luzes
    digitalWrite(ledDistancia1, LOW); 
    digitalWrite(ledDistancia2, LOW);
    digitalWrite(ledDistancia3, LOW);
    Serial.println("Tempo esgotado. Sem movimento. Luzes Desligadas.");
    estadoLuzesAcesas = false; 
  }
}

// --------------------------------------------------------------------------------

void setup() {
  // CONFIGURAÇÃO DO SISTEMA VARAL/CLIMA
  pinMode(pinoLED_Clima, OUTPUT);
  
  // Inicia o servo na posição recolhida (0°)
  meuServo.attach(pinoServo);
  meuServo.write(VARAL_RECOLHIDO_0); 
  delay(100); 
  meuServo.detach(); // Desanexa para liberar o timer e evitar oscilação

  
  // CONFIGURAÇÃO DO SISTEMA DE ILUMINAÇÃO POR PRESENÇA (PIR)
  pinMode(ledDistancia1, OUTPUT);
  pinMode(ledDistancia2, OUTPUT);
  pinMode(ledDistancia3, OUTPUT);
  pinMode(pinoPIR, INPUT); 
  
  Serial.begin(9600);
  Serial.println(">>> Automação Residencial Integrada - Varal e Iluminação PIR <<<");
}

// --------------------------------------------------------------------------------

void loop() {
  
  // 1. EXECUTA O SISTEMA VARAL/CLIMA (Lógica de Umidade) - SÓ CHECA A CADA 500MS
  if (millis() - ultimoCheckUmidade >= INTERVALO_CHECK_UMIDADE_MS) {
    ultimoCheckUmidade = millis(); // Reseta o timer de umidade
    
    int valorUmidade = analogRead(pinoSensorAgua);
    Serial.print("Umidade: ");
    Serial.println(valorUmidade);
    
    // CONDIÇÃO 1: MOLHADO -> RECOLHER VARAL (0°)
    // Move APENAS se estiver MOLHADO E o varal estiver EXPOSTO (!varalEstaRecolhido)
    if (valorUmidade > LIMITE_AGUA && !varalEstaRecolhido) {
      Serial.println("Chuva detectada. Recolhendo Varal para 0 graus.");
      
      meuServo.attach(pinoServo); 
      meuServo.write(VARAL_RECOLHIDO_0);  
      delay(TEMPO_GIRO_COMPLETO_MS);
      meuServo.detach(); // Desanexa!
      
      digitalWrite(pinoLED_Clima, LOW); 
      varalEstaRecolhido = true;      
    }  
    
    // CONDIÇÃO 2: SECO -> EXPOR VARAL (180°)
    // Move APENAS se estiver SECO E o varal estiver RECOLHIDO (varalEstaRecolhido)
    else if (valorUmidade <= LIMITE_AGUA && varalEstaRecolhido) {
      Serial.println("Tempo seco. Expondo Varal para 180 graus.");

      meuServo.attach(pinoServo); 
      meuServo.write(VARAL_EXPOSTO_180);  
      delay(TEMPO_GIRO_COMPLETO_MS);
      meuServo.detach(); // Desanexa!
      
      digitalWrite(pinoLED_Clima, HIGH); 
      varalEstaRecolhido = false;       
    }
  }

  // 2. EXECUTA O SISTEMA DE ILUMINAÇÃO POR PRESENÇA (PIR)
  // Esta função é executada a cada micro-loop, garantindo resposta rápida
  controlarPresenca();
  
  // Pequeno atraso para estabilidade e evitar leituras muito rápidas, mas não trava.
  delay(10); 
}