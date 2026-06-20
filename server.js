import express from 'express';
import { WebSocketServer } from 'ws';
import { signals } from './data/signals.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// CORS (optional, useful for local dev)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
});

// Serve React static files from 'public' (built by Vite)
app.use(express.static(path.join(__dirname, 'public')));

// --- In-memory state ---
const state = {};
signals.forEach(s => { state[s.id] = 'RED'; });

function canSetToProceed(signalId) {
  const signal = signals.find(s => s.id === signalId);
  if (!signal) return false;
  return signal.conflicts.every(id => state[id] === 'RED');
}

function setSignalAspect(signalId, aspect) {
  if (aspect === 'GREEN' && !canSetToProceed(signalId)) {
    return false;
  }
  state[signalId] = aspect;
  return true;
}

// --- API Routes ---
app.get('/api/signals', (req, res) => {
  res.json(state);
});

app.post('/api/signals/:id/proceed', (req, res) => {
  const { id } = req.params;
  const success = setSignalAspect(id, 'GREEN');
  if (success) {
    broadcastState();
    res.json({ success: true, state: state[id] });
  } else {
    res.status(400).json({ 
      success: false, 
      error: 'Conflict detected! Conflicting signals are not RED.' 
    });
  }
});

app.post('/api/signals/:id/danger', (req, res) => {
  state[req.params.id] = 'RED';
  broadcastState();
  res.json({ success: true });
});

// --- Fallback: serve React index.html for any unknown routes ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- WebSocket (local only) ---
const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT || 3001}`);
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
  ws.send(JSON.stringify(state));
});

// Export for Vercel
export default app;
