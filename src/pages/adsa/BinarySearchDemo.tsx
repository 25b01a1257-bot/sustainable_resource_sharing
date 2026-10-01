import { useState } from 'react';
import { Play, RotateCcw, Search } from 'lucide-react';

export default function BinarySearchDemo() {
  const [dataset, setDataset] = useState([4, 8, 12, 17, 25, 30, 42, 56, 63, 91]);
  const [target, setTarget] = useState('');
  const [searching, setSearching] = useState(false);
  const [lo, setLo] = useState(-1);
  const [hi, setHi] = useState(-1);
  const [mid, setMid] = useState(-1);
  const [found, setFound] = useState<number | null>(null);
  const [eliminated, setEliminated] = useState<Set<number>>(new Set());

  const runSearch = async () => {
    const t = parseInt(target, 10);
    if (isNaN(t)) return;
    setSearching(true);
    setFound(null);
    setEliminated(new Set());

    let left = 0;
    let right = dataset.length - 1;

    while (left <= right) {
      const m = Math.floor((left + right) / 2);
      setLo(left);
      setHi(right);
      setMid(m);
      await new Promise((r) => setTimeout(r, 800));

      if (dataset[m] === t) {
        setFound(m);
        setSearching(false);
        setLo(-1); setHi(-1); setMid(-1);
        return;
      } else if (dataset[m] < t) {
        for (let i = left; i <= m; i++) {
          setEliminated((prev) => new Set([...prev, i]));
        }
        left = m + 1;
      } else {
        for (let i = m; i <= right; i++) {
          setEliminated((prev) => new Set([...prev, i]));
        }
        right = m - 1;
      }
    }
    setLo(-1); setHi(-1); setMid(-1);
    setSearching(false);
    setFound(-1);
  };

  const reset = () => {
    const sorted = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b);
    setDataset(sorted);
    setFound(null);
    setEliminated(new Set());
    setLo(-1); setHi(-1); setMid(-1);
    setTarget('');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-gray-800 mb-1">2. Binary Search</h3>
      <p className="text-sm text-gray-500 mb-2">
        Works on sorted arrays. Repeatedly divides the search range in half, eliminating half the
        remaining elements each step. Time complexity: O(log n).
      </p>
      <p className="text-xs text-gray-400 mb-4">Note: the array must be sorted first.</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {dataset.map((n, i) => (
          <div
            key={i}
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              found === i
                ? 'bg-green-500 text-white scale-110'
                : mid === i
                ? 'bg-blue-500 text-white scale-110'
                : eliminated.has(i)
                ? 'bg-gray-200 text-gray-300 opacity-50'
                : i >= lo && i <= hi && lo >= 0
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'bg-gray-50 text-gray-700 border border-gray-200'
            }`}
          >
            {n}
          </div>
        ))}
      </div>

      {lo >= 0 && (
        <div className="text-xs text-blue-600 mb-3">
          Range: [{lo}, {hi}] — Checking index {mid} (value {dataset[mid]})
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Target value"
          className="w-32 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={runSearch}
          disabled={searching || !target}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50"
        >
          <Play className="w-4 h-4" /> Search
        </button>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>

      {found !== null && (
        <div className={`text-sm font-medium ${found >= 0 ? 'text-green-600' : 'text-red-500'}`}>
          {found >= 0 ? (
            <span className="flex items-center gap-1.5"><Search className="w-4 h-4" /> Found at index {found}!</span>
          ) : (
            <span>Value not found in the list.</span>
          )}
        </div>
      )}
    </div>
  );
}
