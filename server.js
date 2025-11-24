// server/server.js
line = line.trim();
console.log('Arduino ->', line);
// Repassa para clientes conectados
io.emit('arduino', line);
});


port.on('open', () => console.log('Serial port opened', SERIAL_PORT));
port.on('error', (err) => console.error('Serial error', err.message));
} catch (err) {
console.error('Falha ao abrir porta serial:', err.message);
}
}


// Serve frontend estático
app.use('/', express.static(path.join(__dirname, '..', 'public')));


// Endpoints REST simples (opcionais)
app.get('/api/varal/extend', (req, res) => {
sendToArduino('VARAL:EXTEND');
res.json({ ok: true });
});
app.get('/api/varal/retract', (req, res) => {
sendToArduino('VARAL:RETRACT');
res.json({ ok: true });
});
app.get('/api/light/:n/:action', (req, res) => {
const { n, action } = req.params;
sendToArduino(`LIGHT:${n}:${action.toUpperCase()}`);
res.json({ ok: true });
});


function sendToArduino(msg) {
if (port && port.isOpen) {
port.write(msg + '\n', (err) => {
if (err) console.error('Erro ao enviar serial:', err.message);
else console.log('Sent to Arduino:', msg);
});
} else {
console.warn('Porta serial não aberta. Mensagem não enviada:', msg);
}
}


// WebSocket (socket.io)
io.on('connection', (socket) => {
console.log('Client connected', socket.id);


socket.on('cmd', (data) => {
console.log('Client cmd', data);
// data { type: 'VARAL'|'LIGHT', payload: ... }
// aceitamos também mensagens simples
if (typeof data === 'string') sendToArduino(data);
else if (data && data.cmd) sendToArduino(data.cmd);
});


socket.on('disconnect', () => console.log('Client disconnected', socket.id));
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
startSerial();
});
