// All Zone 4 signals from your PDF
export const signals = [
  { id: 'BN_033', label: 'Newry Harbour P1', conflicts: ['BN_027'] },
  { id: 'BN_032', label: 'Newry Harbour P2', conflicts: ['BN_027'] },
  { id: 'BN_031', label: 'Newry P1', conflicts: [] },
  { id: 'BN_030', label: 'Newry P2', conflicts: [] },
  { id: 'BN_028', label: 'Newry P3', conflicts: ['BN_033', 'BN_032'] },
  { id: 'BN_027', label: 'Newry P3 (towards Harbour)', conflicts: [] },
  { id: 'BN_003', label: 'Elmstead Park Siding', conflicts: ['BN_023'] },
  { id: 'BN_023', label: 'Mainline (from Siding)', conflicts: ['BN_003'] },
  { id: 'BN_009', label: 'Faraday Road P3', conflicts: ['BN_011'] },
  { id: 'BN_011', label: 'Faraday Road P2', conflicts: ['BN_009'] },
  { id: 'BN_002', label: 'Meriden Grove TMD', conflicts: ['BN_007'] },
  { id: 'BN_007', label: 'Mainline (from TMD)', conflicts: ['BN_002'] },
];

export const signalPositions = {
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
