# SmartDomus — Aplicação Web para Automação Residencial

Este documento contém o projeto completo (código e instruções) para **SmartDomus**: uma aplicação web hospedada que se comunica com um **Arduino Uno** e controla:

* **Varal retrátil** — microservo com duas posições: *estende* e *recolhe* (detalhes abaixo)
* **Iluminação** — 3 cômodos (liga / desliga). Cômodo 3 possui também um **sensor PIR** que pode ligar a luz automaticamente.
* **Configurações** — espaço para futuras opções (implementado como página/visualização simples)

O sistema é composto por 3 partes:

1. **Arduino Sketch** — controla servo, relés e lê PIR; comunica via Serial (USB).
2. **Servidor Node (Express + socket.io + serialport)** — faz ponte entre a web e o Arduino.
3. **Frontend (SmartDomus)** — SPA simples em React (pode ser servido estaticamente pelo Node).

---

## Observações de hardware importantes

* Muitos microservos padrão aceitam ~0–180°. Você mencionou **220°** para "recolhe" e **180°** para "estende". Nem todos os servos físicos alcançam 220°. No código abaixo eu faço um **mapeamento seguro**:

  * `EXTEND_ANGLE = 180` (estende, sentido anti-horário conforme pedido)
  * `RETRACT_ANGLE = 40` — uso 40° como representação de 220° (porque 220° é além dos 180° típicos).
  * Se o seu servo suportar maior giro (e aceitar microsegundos personalizados), ajuste os valores ou troque por servo compatível.
* Luzes: presumi que você usará **módulos relé** acionados por pinos digitais do Arduino (LOW/HIGH conforme wiring). Ajuste lógica se usar módulos com lógica invertida.
* PIR: conectado a um pino digital (entrada) que retorna HIGH quando detecta movimento. O Arduino notifica o servidor quando o PIR muda.

---

## Estrutura do projeto

```
smartdomus/
├─ arduino/                # código do Arduino
│  └─ SmartDomus.ino
├─ server/                 # Node server
│  ├─ package.json
│  └─ server.js
└─ public/                 # frontend estático
   ├─ index.html
   └─ app.js
```

---

