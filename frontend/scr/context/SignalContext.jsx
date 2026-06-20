// frontend/src/context/SignalContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SignalContext = createContext();

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function SignalProvider({ children }) {
  const [signals, setSignals] = useState({});
  const [error, setError] = useState(null);

  // Fetch state via HTTP polling (works on Vercel)
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

  // Poll every 2 seconds
  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 2000);
    return () => clearInterval(interval);
  }, [fetchState]);

  // Also try WebSocket for instant updates (if available)
  useEffect(() => {
    let ws;
    try {
      ws = new WebSocket('ws://localhost:3001');
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setSignals(data);
      };
      ws.onerror = () => console.log('WebSocket not available, using polling only');
    } catch (e) {
      console.log('WebSocket not supported, using polling');
    }
    return () => ws?.close();
  }, []);

  // Send signal update via REST API
  const setSignal = async (id, aspect) => {
    const endpoint = aspect === 'GREEN' ? 'proceed' : 'danger';
    try {
      const res = await fetch(`${API_BASE}/api/signals/${id}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await res.json();
      if (!result.success) {
        alert(`Cannot set signal to GREEN: ${result.error}`);
      }
      // The polling will automatically update the UI
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
