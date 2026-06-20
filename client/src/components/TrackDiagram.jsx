// client/src/components/TrackDiagram.jsx
import { useSignals } from '../context/SignalContext';

export default function TrackDiagram() {
  const { signals, setSignal } = useSignals();

  const handleSignalClick = (id) => {
    const current = signals[id] || 'RED';
    const newAspect = current === 'RED' ? 'GREEN' : 'RED';
    setSignal(id, newAspect);
  };

  const getSignalColor = (aspect) => {
    switch(aspect) {
      case 'GREEN': return '#00ff00';
      case 'YELLOW': return '#ffff00';
      case 'DOUBLE_YELLOW': return '#ffaa00';
      default: return '#ff0000';
    }
  };

  // Signal positions on the diagram (matching PDF layout)
  const signalPositions = {
    'BN_033': { x: 120, y: 220, label: 'BN_033' }, // Newry Harbour P1
    'BN_032': { x: 160, y: 220, label: 'BN_032' }, // Newry Harbour P2
    'BN_031': { x: 320, y: 160, label: 'BN_031' }, // Newry P1
    'BN_030': { x: 360, y: 160, label: 'BN_030' }, // Newry P2
    'BN_028': { x: 400, y: 160, label: 'BN_028' }, // Newry P3
    'BN_027': { x: 400, y: 220, label: 'BN_027' }, // Newry P3 (towards Harbour)
    'BN_025': { x: 440, y: 280, label: 'BN_025' }, // Entry from siding
    'BN_003': { x: 560, y: 280, label: 'BN_003' }, // Elmstead Park Siding
    'BN_023': { x: 500, y: 280, label: 'BN_023' }, // Mainline from siding
    'BN_009': { x: 560, y: 100, label: 'BN_009' }, // Faraday Road P3
    'BN_011': { x: 500, y: 100, label: 'BN_011' }, // Faraday Road P2
    'BN_002': { x: 680, y: 160, label: 'BN_002' }, // Meriden Grove TMD
    'BN_007': { x: 640, y: 160, label: 'BN_007' }, // Mainline from TMD
  };

  return (
    <div style={{
      background: '#1a1a2e',
      borderRadius: '12px',
      border: '2px solid #333',
      padding: '20px',
      display: 'inline-block',
    }}>
      <h3 style={{ color: 'white', textAlign: 'center', margin: '0 0 10px 0' }}>
        Zone 4 - Newry Harbour to Faraday Road
      </h3>
      
      <svg width="800" height="400" viewBox="0 0 800 400" style={{ background: '#1a1a2e' }}>
        {/* 
          TRACK LINES - Matching the PDF layout
        */}
        
        {/* Main line (horizontal) */}
        <line x1="50" y1="180" x2="750" y2="180" stroke="#555" strokeWidth="4" />
        
        {/* Newry Harbour branch (vertical down) */}
        <line x1="140" y1="180" x2="140" y2="280" stroke="#555" strokeWidth="4" />
        
        {/* Newry Harbour Platforms 1 & 2 */}
        <line x1="100" y1="220" x2="180" y2="220" stroke="#555" strokeWidth="3" />
        <line x1="100" y1="240" x2="180" y2="240" stroke="#555" strokeWidth="3" />
        
        {/* Newry Station Platforms */}
        <line x1="300" y1="160" x2="420" y2="160" stroke="#555" strokeWidth="3" />
        <line x1="300" y1="180" x2="420" y2="180" stroke="#555" strokeWidth="3" />
        <line x1="300" y1="200" x2="420" y2="200" stroke="#555" strokeWidth="3" />
        
        {/* Track to Elmstead Park Siding */}
        <line x1="460" y1="180" x2="460" y2="280" stroke="#555" strokeWidth="4" />
        <line x1="460" y1="280" x2="540" y2="280" stroke="#555" strokeWidth="4" />
        <line x1="540" y1="280" x2="540" y2="260" stroke="#555" strokeWidth="3" strokeDasharray="4,4" />
        
        {/* Track to Faraday Road */}
        <line x1="460" y1="180" x2="460" y2="100" stroke="#555" strokeWidth="4" />
        <line x1="460" y1="100" x2="540" y2="100" stroke="#555" strokeWidth="4" />
        
        {/* Track to Meriden Grove TMD */}
        <line x1="640" y1="180" x2="640" y2="160" stroke="#555" strokeWidth="4" />
        <line x1="640" y1="160" x2="700" y2="160" stroke="#555" strokeWidth="3" strokeDasharray="4,4" />

        {/* 
          STATION LABELS 
        */}
        <text x="110" y="270" fill="#888" fontSize="12" textAnchor="middle">Newry</text>
        <text x="110" y="285" fill="#888" fontSize="12" textAnchor="middle">Harbour</text>
        
        <text x="360" y="140" fill="#888" fontSize="12" textAnchor="middle">Newry</text>
        <text x="360" y="155" fill="#888" fontSize="12" textAnchor="middle">Station</text>
        
        <text x="540" y="305" fill="#888" fontSize="11" textAnchor="middle">Elmstead Park</text>
        <text x="540" y="318" fill="#888" fontSize="11" textAnchor="middle">Carriage Siding</text>
        
        <text x="540" y="85" fill="#888" fontSize="11" textAnchor="middle">Faraday</text>
        <text x="540" y="98" fill="#888" fontSize="11" textAnchor="middle">Road</text>
        
        <text x="720" y="148" fill="#888" fontSize="11" textAnchor="middle">Meriden</text>
        <text x="720" y="161" fill="#888" fontSize="11" textAnchor="middle">Grove TMD</text>

        {/*
          SIGNALS - Clickable circles
        */}
        {Object.keys(signalPositions).map((id) => {
          const pos = signalPositions[id];
          const aspect = signals[id] || 'RED';
          const color = getSignalColor(aspect);
          const isRed = aspect === 'RED';
          
          return (
            <g key={id} style={{ cursor: 'pointer' }} onClick={() => handleSignalClick(id)}>
              {/* Signal post (line) */}
              <line 
                x1={pos.x} 
                y1={pos.y - 15} 
                x2={pos.x} 
                y2={pos.y + 10} 
                stroke="#666" 
                strokeWidth="2" 
              />
              
              {/* Signal head (circle) */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="10"
                fill={color}
                stroke="white"
                strokeWidth="2"
                style={{
                  transition: 'all 0.3s ease',
                  boxShadow: isRed ? '0 0 15px rgba(255,0,0,0.5)' : '0 0 15px rgba(0,255,0,0.5)',
                }}
              />
              
              {/* Signal ID label */}
              <text
                x={pos.x}
                y={pos.y + 28}
                fill="#aaa"
                fontSize="8"
                textAnchor="middle"
                fontFamily="monospace"
              >
                {id}
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* Legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '15px',
        color: 'white',
        fontSize: '13px',
        borderTop: '1px solid #333',
        paddingTop: '12px',
      }}>
        <span><span style={{ color: '#00ff00', fontSize: '18px' }}>●</span> GREEN (Proceed)</span>
        <span><span style={{ color: '#ffff00', fontSize: '18px' }}>●</span> YELLOW (Caution)</span>
        <span><span style={{ color: '#ff0000', fontSize: '18px' }}>●</span> RED (Danger)</span>
        <span style={{ color: '#555', fontSize: '11px' }}>Click any signal to toggle</span>
      </div>
    </div>
  );
}
