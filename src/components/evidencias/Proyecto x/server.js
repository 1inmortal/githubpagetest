const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Envía el main.html que está en el mismo directorio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

// Si tienes otros recursos, configúralos (opcional)
// app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
