import { useState } from 'react';
import { Search, Play, RotateCcw } from 'lucide-react';

export default function LinearSearchDemo() {
  const [dataset, setDataset] = useState([42, 17, 8, 63, 25, 91, 4, 56, 30, 12]);
  const [target, setTarget] = useState('');
  const [searching, setSearching] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [found, setFound] = useState<number | null>(null);
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const runSearch = async () => {
    const t = parseInt(target, 10);
    if (isNaN(t)) return;
    setSearching(true);
    setFound(null);
    setChecked(new Set());

    for (let i = 0; i < dataset.length; i++) {
      setCurrentIndex(i);
      await new Promise((r) => setTimeout(r, 500));
      if (dataset[i] === t) {
        setFound(i);
        setSearching(false);
        setCurrentIndex(-1);
        return;
      }
      setChecked((prev) => new Set([...prev, i]));
    }
    setCurrentIndex(-1);
    setSearching(false);
    setFound(-1);
  };

  const reset = () => {
    setDataset(Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)));
    setFound(null);
    setChecked(new Set());
    setCurrentIndex(-1);
    setTarget('');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-gray-800 mb-1">1. Linear Search</h3>
      <p className="text-sm text-gray-500 mb-4">
        Iterates through each element one by one until the target is found or the list ends.
        Time complexity: O(n).
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {dataset.map((n, i) => (
          <div
            key={i}
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              found === i
                ? 'bg-green-500 text-white scale-110'
                : currentIndex === i
                ? 'bg-blue-500 text-white scale-110'
                : checked.has(i)
                ? 'bg-gray-200 text-gray-400'
                : 'bg-gray-50 text-gray-700 border border-gray-200'
            }`}
          >
            {n}
          </div>
        ))}
      </div>

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
