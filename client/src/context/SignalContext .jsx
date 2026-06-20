import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SignalContext = createContext();

// In production, the API is on the same domain, so use relative path.
const API_BASE = import.meta.env.DEV ? 'http://localhost:3001' : '';

export function SignalProvider({ children }) {
  const [signals, setSignals] = useState({});
  const [error, setError] = useState(null);

  // Polling (works on Vercel)
  const fetchState = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/signals`);
      const data = await res.json();
      setSignals(data);
      setError(null);
    } catch (err) {
      console.error('Polling error:', err);
      setError('Failed to connect to server');
    }
  }, []);

  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 2000);
    return () => clearInterval(interval);
  }, [fetchState]);

  // WebSocket for instant updates (local only)
  useEffect(() => {
    if (!import.meta.env.DEV) return; // only try WebSocket in dev
    let ws;
    try {
      ws = new WebSocket('ws://localhost:3001');
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setSignals(data);
      };
      ws.onerror = () => console.log('WebSocket not available');
    } catch (e) {
      console.log('WebSocket not supported');
    }
    return () => ws?.close();
  }, []);

  const setSignal = async (id, aspect) => {
    const endpoint = aspect === 'GREEN' ? 'proceed' : 'danger';
    try {
      const res = await fetch(`${API_BASE}/api/signals/${id}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await res.json();
      if (!result.success) {
        alert(`Cannot set signal: ${result.error}`);
      }
    } catch (err) {
      alert('Network error. Check if backend is running.');
    }
  };

  return (
    <SignalContext.Provider value={{ signals, setSignal, error }}>
      {children}
    </SignalContext.Provider>
  );
}

export function useSignals() {
  return useContext(SignalContext);
}
