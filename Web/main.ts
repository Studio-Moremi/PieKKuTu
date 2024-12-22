const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const clients = new Map();

wss.on('connection', (ws, req) => {
  const id = generateUniqueId();
  clients.set(id, ws);
  console.log(`CLIENT CONNECT ${id}`);

  ws.on('message', (message) => {
    broadcastMessage(id, message);
  });

  ws.on('close', () => {
    clients.delete(id);
    console.log(`CLIENT CONNECTION OFF: ${id}`);
  });

  ws.on('error', (err) => {
    console.error(`ERROR: ${err.message}`);
  });
});

function broadcastMessage(senderId, message) {
  for (const [id, client] of clients.entries()) {
    if (id !== senderId && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

function generateUniqueId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`서버가 ${PORT}포트로 localhost에서 구동되고 있습니다.`);
});
