// backend/server.js
import express from 'express';
import { WebSocketServer } from 'ws';
import { signals } from './data/signals.js';

const app = express();
app.use(express.json());

// Enable CORS for frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
});

// In-memory state: all signals start RED
const state = {};
signals.forEach(s => { state[s.id] = 'RED'; });

// Interlocking logic: check if all conflicts are RED
function canSetToProceed(signalId) {
  const signal = signals.find(s => s.id === signalId);
  if (!signal) return false;
  return signal.conflicts.every(id => state[id] === 'RED');
}

// Set signal aspect
function setSignalAspect(signalId, aspect) {
  if (aspect === 'GREEN' && !canSetToProceed(signalId)) {
    return false; // SPAD prevented
  }
  state[signalId] = aspect;
  return true;
}

// --- REST API Endpoints ---

// Get all signal states
app.get('/api/signals', (req, res) => {
  res.json(state);
});

// Set signal to PROCEED (GREEN)
app.post('/api/signals/:id/proceed', (req, res) => {
  const { id } = req.params;
  const success = setSignalAspect(id, 'GREEN');
  if (success) {
    broadcastState();
    res.json({ success: true, state: state[id] });
  } else {
    res.status(400).json({ 
      success: false, 
      error: 'Conflict detected! One or more conflicting signals are not RED.' 
    });
  }
});

// Set signal to DANGER (RED)
app.post('/api/signals/:id/danger', (req, res) => {
  state[req.params.id] = 'RED';
  broadcastState();
  res.json({ success: true });
});

// --- WebSocket Server (for real-time updates) ---
const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`Backend running on port ${process.env.PORT || 3001}`);
});

const wss = new WebSocketServer({ server });

function broadcastState() {
  const data = JSON.stringify(state);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

wss.on('connection', (ws) => {
  console.log('Client connected via WebSocket');
  ws.send(JSON.stringify(state));
});

// Export app for Vercel serverless (if running on Vercel)
export default app;
