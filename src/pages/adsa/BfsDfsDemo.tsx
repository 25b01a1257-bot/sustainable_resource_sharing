import { useState } from 'react';
import { Play, RotateCcw, GitBranch } from 'lucide-react';

interface GNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

const nodes: GNode[] = [
  { id: 'A', label: 'Aarav', x: 80, y: 60 },
  { id: 'B', label: 'Diya', x: 250, y: 40 },
  { id: 'C', label: 'Rohan', x: 420, y: 80 },
  { id: 'D', label: 'Ananya', x: 560, y: 50 },
  { id: 'E', label: 'Kabir', x: 150, y: 180 },
  { id: 'F', label: 'Meera', x: 350, y: 160 },
  { id: 'G', label: 'Vivaan', x: 500, y: 200 },
  { id: 'H', label: 'Sara', x: 250, y: 290 },
];

const edgesList: [string, string][] = [
  ['A', 'B'], ['B', 'C'], ['C', 'D'], ['A', 'E'],
  ['E', 'F'], ['F', 'C'], ['F', 'G'], ['B', 'F'],
  ['E', 'H'], ['H', 'F'], ['G', 'D'],
];

const adjList: Record<string, string[]> = {};
nodes.forEach((n) => (adjList[n.id] = []));
edgesList.forEach(([from, to]) => {
  adjList[from].push(to);
  adjList[to].push(from);
});

export default function BfsDfsDemo() {
  const [mode, setMode] = useState<'bfs' | 'dfs'>('bfs');
  const [startNode, setStartNode] = useState('A');
  const [visiting, setVisiting] = useState<string | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [queue, setQueue] = useState<string[]>([]);
  const [order, setOrder] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const run = async () => {
    setRunning(true);
    setVisited(new Set());
    setOrder([]);
    const visitedSet = new Set<string>();
    const traversalOrder: string[] = [];

    if (mode === 'bfs') {
      const q: string[] = [startNode];
      setQueue([...q]);
      while (q.length > 0) {
        const node = q.shift()!;
        if (visitedSet.has(node)) continue;
        visitedSet.add(node);
        traversalOrder.push(node);
        setVisiting(node);
        setVisited(new Set(visitedSet));
        setOrder([...traversalOrder]);
        await sleep(700);
        for (const neighbor of adjList[node]) {
          if (!visitedSet.has(neighbor)) {
            q.push(neighbor);
          }
        }
        setQueue([...q]);
      }
    } else {
      setQueue([]);
      const dfsHelper = async (node: string) => {
        if (visitedSet.has(node)) return;
        visitedSet.add(node);
        traversalOrder.push(node);
        setVisiting(node);
        setVisited(new Set(visitedSet));
        setOrder([...traversalOrder]);
        await sleep(700);
        for (const neighbor of adjList[node]) {
          if (!visitedSet.has(neighbor)) {
            await dfsHelper(neighbor);
          }
        }
      };
      await dfsHelper(startNode);
    }

    setVisiting(null);
    setRunning(false);
  };

  const reset = () => {
    setVisited(new Set());
    setVisiting(null);
    setQueue([]);
    setOrder([]);
  };

  const nodeColor = (id: string) => {
    if (visiting === id) return '#3b82f6';
    if (visited.has(id)) return '#059669';
    return '#f0fdf4';
  };

  const nodeTextColor = (id: string) => {
    if (visiting === id || visited.has(id)) return '#ffffff';
    return '#047857';
  };

  const edgeColor = (from: string, to: string) => {
    if (visited.has(from) && visited.has(to)) return '#059669';
    return '#d1d5db';
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-gray-800 mb-1">8. BFS & DFS — Graph Traversal</h3>
      <p className="text-sm text-gray-500 mb-4">
        BFS explores neighbors level by level using a queue. DFS dives deep using recursion (stack).
        Both visit all reachable nodes. Time: O(V+E), Space: O(V).
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setMode('bfs')}
            disabled={running}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${mode === 'bfs' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            BFS
          </button>
          <button
            onClick={() => setMode('dfs')}
            disabled={running}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${mode === 'dfs' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            DFS
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500">Start:</span>
          <select
            value={startNode}
            onChange={(e) => setStartNode(e.target.value)}
            disabled={running}
            className="px-2 py-1.5 rounded-lg border border-gray-200 text-sm bg-white"
          >
            {nodes.map((n) => (
              <option key={n.id} value={n.id}>{n.label} ({n.id})</option>
            ))}
          </select>
        </div>
        <button
          onClick={run}
          disabled={running}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50"
        >
          <Play className="w-4 h-4" /> {running ? 'Running...' : 'Run'}
        </button>
        <button
          onClick={reset}
          disabled={running}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>

      <div className="bg-blue-50 rounded-xl p-3 mb-4">
        <p className="text-xs text-blue-700">
          {mode === 'bfs'
            ? 'BFS uses a Queue (FIFO). It visits all neighbors of the current node before moving deeper. Good for finding shortest path.'
            : 'DFS uses a Stack (LIFO via recursion). It goes as deep as possible before backtracking. Good for cycle detection and connectivity.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Graph visualization */}
        <div className="lg:col-span-2 overflow-x-auto">
          <svg viewBox="0 0 640 340" className="w-full" style={{ minHeight: 300 }}>
            {edgesList.map(([from, to], i) => {
              const f = nodes.find((n) => n.id === from)!;
              const t = nodes.find((n) => n.id === to)!;
              return (
                <line
                  key={i}
                  x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                  stroke={edgeColor(from, to)}
                  strokeWidth={visited.has(from) && visited.has(to) ? 3 : 1.5}
                  className="transition-all duration-300"
                />
              );
            })}
            {nodes.map((n) => (
              <g key={n.id}>
                <circle
                  cx={n.x} cy={n.y}
                  r={visiting === n.id ? 28 : 24}
                  fill={nodeColor(n.id)}
                  stroke={visiting === n.id ? '#2563eb' : visited.has(n.id) ? '#047857' : '#86efac'}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                <text
                  x={n.x} y={n.y + 1}
                  textAnchor="middle" dy="0.35em"
                  className="text-[11px] font-bold transition-all"
                  fill={nodeTextColor(n.id)}
                >
                  {n.id}
                </text>
                <text
                  x={n.x} y={n.y + 38}
                  textAnchor="middle"
                  className="text-[8px] fill-gray-500"
                >
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Side panel */}
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <GitBranch className="w-4 h-4 text-green-600" />
              <span className="text-xs font-semibold text-gray-700">Traversal Order</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {order.length === 0 ? (
                <span className="text-xs text-gray-400">Not started</span>
              ) : (
                order.map((id, i) => (
                  <span key={i} className="px-2 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-bold">
                    {i + 1}. {id}
                  </span>
                ))
              )}
            </div>
          </div>

          {mode === 'bfs' && (
            <div className="bg-gray-50 rounded-xl p-3">
              <span className="text-xs font-semibold text-gray-700 mb-2 block">Queue</span>
              <div className="flex flex-wrap gap-1.5">
                {queue.length === 0 ? (
                  <span className="text-xs text-gray-400">Empty</span>
                ) : (
                  queue.map((id, i) => (
                    <span key={i} className="px-2 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-mono">
                      {id}
                    </span>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-3">
            <span className="text-xs font-semibold text-gray-700 mb-2 block">Visited</span>
            <div className="flex flex-wrap gap-1.5">
              {visited.size === 0 ? (
                <span className="text-xs text-gray-400">None yet</span>
              ) : (
                Array.from(visited).map((id) => (
                  <span key={id} className="px-2 py-1 rounded-lg bg-green-500 text-white text-xs font-bold">
                    {id}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
