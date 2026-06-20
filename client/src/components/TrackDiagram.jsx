import { useSignals } from '../context/SignalContext';

// Signal positions for Zone 4
const signalPositions = {
  'BN_033': { x: 80, y: 40 },
  'BN_032': { x: 130, y: 40 },
  'BN_031': { x: 80, y: 140 },
  'BN_030': { x: 130, y: 140 },
  'BN_028': { x: 180, y: 140 },
  'BN_027': { x: 180, y: 40 },
  'BN_003': { x: 300, y: 40 },
  'BN_023': { x: 350, y: 40 },
  'BN_009': { x: 300, y: 140 },
  'BN_011': { x: 350, y: 140 },
  'BN_002': { x: 450, y: 40 },
  'BN_007': { x: 500, y: 40 },
};

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
