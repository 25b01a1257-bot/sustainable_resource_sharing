import { useState } from 'react';
import { Plus, Trash2, ArrowRight } from 'lucide-react';

interface QueueItem {
  id: number;
  name: string;
  resource: string;
}

export default function QueueDemo() {
  const [queue, setQueue] = useState<QueueItem[]>([
    { id: 1, name: 'Aarav', resource: 'Data Structures Book' },
    { id: 2, name: 'Diya', resource: 'Scientific Calculator' },
    { id: 3, name: 'Rohan', resource: 'Study Table' },
  ]);
  const [name, setName] = useState('');
  const [resource, setResource] = useState('');
  const [nextId, setNextId] = useState(4);
  const [dequeued, setDequeued] = useState<QueueItem | null>(null);

  const enqueue = () => {
    if (!name.trim() || !resource.trim()) return;
    setQueue([...queue, { id: nextId, name: name.trim(), resource: resource.trim() }]);
    setNextId(nextId + 1);
    setName('');
    setResource('');
  };

  const dequeue = () => {
    if (queue.length === 0) return;
    const [first, ...rest] = queue;
    setQueue(rest);
    setDequeued(first);
    setTimeout(() => setDequeued(null), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-gray-800 mb-1">5. Queue — Resource Request Queue</h3>
      <p className="text-sm text-gray-500 mb-4">
        A queue is a FIFO (First-In-First-Out) data structure. Resource requests are processed in
        the order they arrive. New requests are added to the rear; the front request is served first.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Queue visualization */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">REAR (enqueue)</span>
            <span className="flex-1" />
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">FRONT (dequeue)</span>
          </div>
          <div className="min-h-[120px] flex items-center gap-2 p-4 bg-gray-50 rounded-xl overflow-x-auto">
            {queue.length === 0 ? (
              <span className="text-sm text-gray-400 mx-auto">Queue is empty</span>
            ) : (
              [...queue].reverse().map((item, i) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className={`px-4 py-6 rounded-lg text-center min-w-[100px] ${
                    i === 0
                      ? 'bg-blue-100 border-2 border-blue-300 text-blue-700'
                      : 'bg-white border border-gray-200 text-gray-700'
                  }`}>
                    <div className="text-sm font-bold">{item.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{item.resource}</div>
                    {i === 0 && <div className="text-xs text-blue-500 font-medium mt-1">NEXT</div>}
                  </div>
                  {i < queue.length - 1 && <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />}
                </div>
              ))
            )}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Size: {queue.length}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Enqueue Request</h4>
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
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={enqueue}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700"
            >
              <Plus className="w-4 h-4" /> Add to Queue
            </button>
          </div>

          <button
            onClick={dequeue}
            disabled={queue.length === 0}
            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            <ArrowRight className="w-4 h-4" /> Serve Next Request (Dequeue)
          </button>

          {dequeued && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm font-medium text-green-700">
                Served: <strong>{dequeued.name}</strong> — {dequeued.resource}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
