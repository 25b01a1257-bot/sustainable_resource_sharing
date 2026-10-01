import { useState } from 'react';
import { Search, Hash, Plus, Trash2 } from 'lucide-react';

interface HashEntry {
  key: string;
  value: string;
}

const TABLE_SIZE = 7;

function hashFn(key: string): number {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash + key.charCodeAt(i) * (i + 1)) % TABLE_SIZE;
  }
  return hash;
}

export default function HashTableDemo() {
  const [table, setTable] = useState<(HashEntry | null)[]>(() => {
    const t: (HashEntry | null)[] = new Array(TABLE_SIZE).fill(null);
    const initial: [string, string][] = [
      ['Book', 'Data Structures'],
      ['Laptop', 'Dell Inspiron'],
      ['Chair', 'Wooden folding'],
    ];
    initial.forEach(([k, v]) => {
      let idx = hashFn(k);
      while (t[idx] !== null) idx = (idx + 1) % TABLE_SIZE;
      t[idx] = { key: k, value: v };
    });
    return t;
  });
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<number | null>(null);

  const insert = () => {
    if (!key.trim() || !value.trim()) return;
    const newTable = [...table];
    let idx = hashFn(key);
    setHighlight(idx);
    let probes = 0;
    while (newTable[idx] !== null && newTable[idx]!.key !== key && probes < TABLE_SIZE) {
      idx = (idx + 1) % TABLE_SIZE;
      probes++;
      setHighlight(idx);
    }
    if (probes >= TABLE_SIZE) return;
    newTable[idx] = { key: key.trim(), value: value.trim() };
    setTable(newTable);
    setKey('');
    setValue('');
    setTimeout(() => setHighlight(null), 1000);
  };

  const search = () => {
    if (!searchKey.trim()) return;
    let idx = hashFn(searchKey);
    setHighlight(idx);
    let probes = 0;
    while (table[idx] !== null && probes < TABLE_SIZE) {
      if (table[idx]!.key === searchKey.trim()) {
        setSearchResult(`Found: "${table[idx]!.value}" at index ${idx}`);
        return;
      }
      idx = (idx + 1) % TABLE_SIZE;
      probes++;
      setHighlight(idx);
    }
    setSearchResult(`"${searchKey}" not found in hash table`);
    setTimeout(() => setHighlight(null), 1000);
  };

  const remove = (idx: number) => {
    const newTable = [...table];
    newTable[idx] = null;
    setTable(newTable);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-gray-800 mb-1">4. Hash Table — Resource Lookup</h3>
      <p className="text-sm text-gray-500 mb-2">
        A hash table maps keys to values using a hash function, enabling O(1) average-time lookups.
        Collisions are resolved using linear probing (trying the next slot).
      </p>
      <p className="text-xs text-gray-400 mb-4">
        Hash function: sum of charCodeAt(char) × (position+1), mod {TABLE_SIZE}. This models how
        resources are looked up by name instantly.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Table visualization */}
        <div>
          <div className="space-y-1.5">
            {table.map((entry, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                  highlight === i
                    ? 'border-blue-400 bg-blue-50 scale-[1.02]'
                    : entry
                    ? 'border-gray-200 bg-gray-50'
                    : 'border-dashed border-gray-200 bg-white'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                  {i}
                </div>
                {entry ? (
                  <>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-700 truncate">
                        <Hash className="w-3 h-3 inline mr-1 text-gray-400" />
                        {entry.key}
                      </div>
                      <div className="text-xs text-gray-400 truncate">{entry.value}</div>
                    </div>
                    <button
                      onClick={() => remove(i)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-gray-300">empty</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Insert Resource</h4>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Key (e.g. Book)"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Value (e.g. Data Structures)"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={insert}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700"
            >
              <Plus className="w-4 h-4" /> Insert
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Lookup Resource</h4>
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Key to search..."
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={search}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
            >
              <Search className="w-4 h-4" /> Search
            </button>
            {searchResult && (
              <p className="mt-3 text-sm font-medium text-gray-700">{searchResult}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
