import express from "express";
import http from "http";
import { Server } from "socket.io";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// -------- SERVIR FRONT (opcional se fizer build) --------
// app.use(express.static("dist"));

// -------- SERIAL ARDUINO --------
const port = new SerialPort({
  path: "COM3",    // ALTERAR AQUI
  baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on("data", (data) => {
  data = data.trim();
  console.log("Arduino:", data);

  // Enviar para o FRONT
  io.emit("arduino-data", data);
});

// -------- RECEBER COMANDOS DO FRONT --------
io.on("connection", (socket) => {
  console.log("Cliente conectado!");

  socket.on("comando", (cmd) => {
    console.log("Comando recebido:", cmd);

    if (cmd === "ESTENDER") {
      port.write("ESTENDER\n");
    } else if (cmd === "RECOLHER") {
      port.write("RECOLHER\n");
    }
  });
});

server.listen(3000, () => {
  console.log("Server rodando em http://localhost:3000");
});
