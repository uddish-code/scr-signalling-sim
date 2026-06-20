import { SignalProvider } from './context/SignalContext';
import TrackDiagram from './components/TrackDiagram';

function App() {
  return (
    <SignalProvider>
      <div style={{
        minHeight: '100vh',
        background: '#0d0d1a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
      }}>
        <h1 style={{ color: '#fff', marginBottom: '5px', fontSize: '28px' }}>
          🚆 SCR Zone 4 Signalling Simulator
        </h1>
        <p style={{ color: '#666', marginTop: '0', fontSize: '14px' }}>
          Benton Signal Box (BN) — Newry Harbour to Faraday Road
        </p>
        <TrackDiagram />
        <p style={{ color: '#333', fontSize: '11px', marginTop: '15px' }}>
          Interlocking logic: Conflicting signals prevent SPADs (Signals Passed at Danger)
        </p>
      </div>
    </SignalProvider>
  );
}

export default App;
