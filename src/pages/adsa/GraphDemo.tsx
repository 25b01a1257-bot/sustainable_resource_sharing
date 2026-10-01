import { useState } from 'react';

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface GraphEdge {
  from: string;
  to: string;
  resource: string;
}

const nodes: GraphNode[] = [
  { id: 'A', label: 'Aarav', x: 150, y: 80 },
  { id: 'D', label: 'Diya', x: 350, y: 50 },
  { id: 'R', label: 'Rohan', x: 500, y: 120 },
  { id: 'N', label: 'Ananya', x: 100, y: 220 },
  { id: 'K', label: 'Kabir', x: 300, y: 200 },
  { id: 'M', label: 'Meera', x: 480, y: 260 },
  { id: 'V', label: 'Vivaan', x: 200, y: 320 },
  { id: 'S', label: 'Sara', x: 400, y: 340 },
];

const edges: GraphEdge[] = [
  { from: 'A', to: 'D', resource: 'DSA Book' },
  { from: 'D', to: 'R', resource: 'Calculator' },
  { from: 'A', to: 'K', resource: 'Folding Chair' },
  { from: 'K', to: 'S', resource: 'Jacket' },
  { from: 'R', to: 'M', resource: 'Study Table' },
  { from: 'D', to: 'M', resource: 'CLRS Book' },
  { from: 'N', to: 'A', resource: 'Drawing Set' },
  { from: 'N', to: 'K', resource: 'Lab Coat' },
  { from: 'V', to: 'A', resource: 'Arduino Kit' },
  { from: 'V', to: 'M', resource: 'Python Notes' },
  { from: 'K', to: 'R', resource: 'Markers' },
  { from: 'S', to: 'V', resource: 'Highlighters' },
];

const adjacencyList: Record<string, string[]> = {};
nodes.forEach((n) => (adjacencyList[n.id] = []));
edges.forEach((e) => {
  adjacencyList[e.from].push(e.to);
  adjacencyList[e.to].push(e.from);
});

export default function GraphDemo() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [view, setView] = useState<'visual' | 'adjacency'>('visual');

  const isHighlighted = (from: string, to: string) =>
    hoveredNode && (from === hoveredNode || to === hoveredNode);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-gray-800 mb-1">7. Graph — User & Resource-Sharing Connections</h3>
      <p className="text-sm text-gray-500 mb-4">
        A graph represents users as nodes and resource-sharing relationships as edges. This models
        the social network of sharing on campus. Hover over a node to highlight its connections.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setView('visual')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${view === 'visual' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          Graph View
        </button>
        <button
          onClick={() => setView('adjacency')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${view === 'adjacency' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          Adjacency List
        </button>
      </div>

      {view === 'visual' ? (
        <div className="overflow-x-auto">
          <svg viewBox="0 0 600 400" className="w-full" style={{ minHeight: 360 }}>
            {/* Edges */}
            {edges.map((e, i) => {
              const from = nodes.find((n) => n.id === e.from)!;
              const to = nodes.find((n) => n.id === e.to)!;
              const highlighted = isHighlighted(e.from, e.to);
              return (
                <g key={i}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={highlighted ? '#059669' : '#d1d5db'}
                    strokeWidth={highlighted ? 2.5 : 1.5}
                    className="transition-all"
                  />
                  {highlighted && (
                    <text
                      x={(from.x + to.x) / 2}
                      y={(from.y + to.y) / 2 - 4}
                      textAnchor="middle"
                      className="text-[8px] fill-green-600 font-medium"
                    >
                      {e.resource}
                    </text>
                  )}
                </g>
              );
            })}
            {/* Nodes */}
            {nodes.map((n) => {
              const isActive = hoveredNode === n.id;
              const isConnected = hoveredNode && adjacencyList[hoveredNode].includes(n.id);
              return (
                <g
                  key={n.id}
                  onMouseEnter={() => setHoveredNode(n.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={isActive ? 26 : 22}
                    fill={isActive ? '#059669' : isConnected ? '#3b82f6' : '#f0fdf4'}
                    stroke={isActive ? '#047857' : '#86efac'}
                    strokeWidth="2"
                    className="transition-all"
                  />
                  <text
                    x={n.x}
                    y={n.y + 1}
                    textAnchor="middle"
                    dy="0.35em"
                    className={`text-[10px] font-bold ${isActive ? 'fill-white' : isConnected ? 'fill-white' : 'fill-green-700'}`}
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="text-xs text-gray-400 text-center mt-2">
            Hover over a node to see their sharing connections and the resources exchanged.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(adjacencyList).map(([nodeId, neighbors]) => {
            const node = nodes.find((n) => n.id === nodeId)!;
            return (
              <div key={nodeId} className="flex items-start gap-2 p-3 rounded-xl bg-gray-50">
                <span className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {nodeId}
                </span>
                <div className="min-w-0">
                  <span className="text-sm font-medium text-gray-700">{node.label}</span>
                  <span className="text-gray-400 text-sm"> → </span>
                  <span className="text-sm text-gray-600">
                    {neighbors.length > 0
                      ? neighbors.map((n) => nodes.find((x) => x.id === n)!.label).join(', ')
                      : 'no connections'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
