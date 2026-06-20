// frontend/src/App.jsx
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
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{ color: '#fff', marginBottom: '10px' }}>
          🚆 SCR Zone 4 Signalling Simulator
        </h1>
        <p style={{ color: '#888', marginTop: 0 }}>
          Click any signal to toggle between RED and GREEN (interlocking enforced)
        </p>
        <TrackDiagram />
        <p style={{ color: '#555', fontSize: '12px', marginTop: '20px' }}>
          Signals: BN_033, BN_032, BN_031, BN_030, BN_028, BN_027, BN_003, BN_023, BN_009, BN_011, BN_002, BN_007
        </p>
      </div>
    </SignalProvider>
  );
}

export default App;
