import { useSignals } from '../context/SignalContext';
import { signalPositions } from '../../../data/signals.js';

export default function TrackDiagram() {
  const { signals, setSignal } = useSignals();

  const handleClick = (id) => {
    const current = signals[id] || 'RED';
    const newAspect = current === 'RED' ? 'GREEN' : 'RED';
    setSignal(id, newAspect);
  };

  const getColor = (aspect) => {
    switch(aspect) {
      case 'GREEN': return '#00ff00';
      case 'YELLOW': return '#ffff00';
      case 'DOUBLE_YELLOW': return '#ffaa00';
      default: return '#ff0000';
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '700px',
      height: '400px',
      background: '#1a1a2e',
      borderRadius: '12px',
      border: '2px solid #333',
      margin: '20px auto',
      padding: '20px'
    }}>
      <h3 style={{ color: 'white', textAlign: 'center', margin: 0 }}>Zone 4 - Benton Signal Box (BN)</h3>
      {Object.keys(signalPositions).map((id) => {
        const pos = signalPositions[id];
        const aspect = signals[id] || 'RED';
        const color = getColor(aspect);
        return (
          <div
            key={id}
            onClick={() => handleClick(id)}
            style={{
              position: 'absolute',
              left: pos.x,
              top: pos.y,
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: color,
              cursor: 'pointer',
              border: '2px solid white',
              boxShadow: aspect === 'GREEN' ? '0 0 20px #00ff00' : '0 0 10px #ff0000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: 'black',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
            }}
            title={`${id} - ${aspect}`}
          >
            {id.replace('BN_', '')}
          </div>
        );
      })}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '20px',
        color: 'white',
        fontSize: '12px',
        display: 'flex',
        gap: '15px'
      }}>
        <span><span style={{ color: '#00ff00' }}>●</span> GREEN (Proceed)</span>
        <span><span style={{ color: '#ff0000' }}>●</span> RED (Danger)</span>
        <span style={{ fontSize: '10px', color: '#aaa' }}>Click to toggle</span>
      </div>
    </div>
  );
}
