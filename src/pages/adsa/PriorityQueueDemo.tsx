import { useState } from 'react';
import { Plus, ArrowUp, Flame, CheckCircle } from 'lucide-react';

interface PQItem {
  id: number;
  name: string;
  resource: string;
  priority: number;
}

export default function PriorityQueueDemo() {
  const [items, setItems] = useState<PQItem[]>([
    { id: 1, name: 'Aarav', resource: 'Textbook', priority: 2 },
    { id: 2, name: 'Diya', resource: 'Calculator', priority: 1 },
    { id: 3, name: 'Rohan', resource: 'Study Table', priority: 3 },
  ]);
  const [name, setName] = useState('');
  const [resource, setResource] = useState('');
  const [priority, setPriority] = useState('2');
  const [nextId, setNextId] = useState(4);
  const [served, setServed] = useState<PQItem | null>(null);

  const sorted = [...items].sort((a, b) => a.priority - b.priority);

  const add = () => {
    if (!name.trim() || !resource.trim()) return;
    const p = Math.max(1, Math.min(5, parseInt(priority, 10) || 3));
    setItems([...items, { id: nextId, name: name.trim(), resource: resource.trim(), priority: p }]);
    setNextId(nextId + 1);
    setName('');
    setResource('');
    setPriority('2');
  };

  const serve = () => {
    if (sorted.length === 0) return;
    const top = sorted[0];
    setItems(items.filter((i) => i.id !== top.id));
    setServed(top);
    setTimeout(() => setServed(null), 3000);
  };

  const priorityLabels: Record<number, { label: string; color: string }> = {
    1: { label: 'Urgent', color: 'bg-red-100 text-red-700 border-red-200' },
    2: { label: 'High', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    3: { label: 'Normal', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    4: { label: 'Low', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    5: { label: 'Very Low', color: 'bg-gray-100 text-gray-600 border-gray-200' },
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-gray-800 mb-1">6. Priority Queue — Urgent Requests</h3>
      <p className="text-sm text-gray-500 mb-4">
        A priority queue serves elements based on priority instead of arrival order. Lower number =
        higher priority. This models how urgent resource requests are handled before normal ones.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visualization */}
        <div>
          <div className="space-y-2">
            {sorted.length === 0 ? (
              <div className="text-center py-8 text-sm text-gray-400">No requests in queue</div>
            ) : (
              sorted.map((item, i) => {
                const pl = priorityLabels[item.priority];
                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      i === 0 ? `${pl.color} scale-[1.02]` : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    {i === 0 ? (
                      <Flame className="w-5 h-5 text-red-500 flex-shrink-0" />
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                        {i + 1}
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-700 truncate">{item.name}</div>
                      <div className="text-xs text-gray-400 truncate">{item.resource}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${pl.color}`}>
                      P{item.priority} — {pl.label}
                    </span>
                  </div>
                );
              })
            )}
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Queue size: {items.length} • Top priority served first
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Add Request</h4>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Requester name"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              value={resource}
              onChange={(e) => setResource(e.target.value)}
              placeholder="Resource name"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <label className="block text-xs text-gray-500 mb-1">Priority (1=Urgent, 5=Very Low)</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="1">1 — Urgent</option>
              <option value="2">2 — High</option>
              <option value="3">3 — Normal</option>
              <option value="4">4 — Low</option>
              <option value="5">5 — Very Low</option>
            </select>
            <button
              onClick={add}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700"
            >
              <Plus className="w-4 h-4" /> Add Request
            </button>
          </div>

          <button
            onClick={serve}
            disabled={sorted.length === 0}
            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:opacity-50"
          >
            <ArrowUp className="w-4 h-4" /> Serve Highest Priority
          </button>

          {served && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm font-medium text-green-700">
                Served: <strong>{served.name}</strong> — {served.resource} (Priority {served.priority})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
