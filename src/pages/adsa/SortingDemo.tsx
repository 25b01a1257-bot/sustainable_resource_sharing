import { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

type Algo = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick';

export default function SortingDemo() {
  const [data, setData] = useState([42, 17, 8, 63, 25, 91, 4, 56, 30, 12]);
  const [algo, setAlgo] = useState<Algo>('bubble');
  const [sorting, setSorting] = useState(false);
  const [comparing, setComparing] = useState<[number, number] | null>(null);
  const [sorted, setSorted] = useState<Set<number>>(new Set());

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const bubbleSort = async (arr: number[]) => {
    const a = [...arr];
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        setComparing([j, j + 1]);
        await sleep(300);
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          setData([...a]);
          await sleep(200);
        }
      }
      setSorted((prev) => new Set([...prev, a.length - i - 1]));
    }
  };

  const selectionSort = async (arr: number[]) => {
    const a = [...arr];
    for (let i = 0; i < a.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < a.length; j++) {
        setComparing([minIdx, j]);
        await sleep(300);
        if (a[j] < a[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        [a[i], a[minIdx]] = [a[minIdx], a[i]];
        setData([...a]);
        await sleep(200);
      }
      setSorted((prev) => new Set([...prev, i]));
    }
  };

  const insertionSort = async (arr: number[]) => {
    const a = [...arr];
    setSorted(new Set([0]));
    for (let i = 1; i < a.length; i++) {
      let j = i;
      while (j > 0 && a[j - 1] > a[j]) {
        setComparing([j - 1, j]);
        await sleep(300);
        [a[j], a[j - 1]] = [a[j - 1], a[j]];
        setData([...a]);
        j--;
      }
      setSorted((prev) => new Set([...prev, i]));
    }
  };

  const mergeSort = async (arr: number[], lo: number, hi: number) => {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    await mergeSort(arr, lo, mid);
    await mergeSort(arr, mid + 1, hi);
    await merge(arr, lo, mid, hi);
  };

  const merge = async (arr: number[], lo: number, mid: number, hi: number) => {
    const left = arr.slice(lo, mid + 1);
    const right = arr.slice(mid + 1, hi + 1);
    let i = 0, j = 0, k = lo;
    while (i < left.length && j < right.length) {
      setComparing([lo + i, mid + 1 + j]);
      await sleep(300);
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      setData([...arr]);
      k++;
    }
    while (i < left.length) {
      arr[k] = left[i];
      setData([...arr]);
      i++; k++;
    }
    while (j < right.length) {
      arr[k] = right[j];
      setData([...arr]);
      j++; k++;
    }
    await sleep(200);
  };

  const quickSort = async (arr: number[], lo: number, hi: number) => {
    if (lo >= hi) return;
    const pivot = arr[hi];
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      setComparing([j, hi]);
      await sleep(300);
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setData([...arr]);
      }
    }
    [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
    setData([...arr]);
    await sleep(200);
    const p = i + 1;
    await quickSort(arr, lo, p - 1);
    await quickSort(arr, p + 1, hi);
  };

  const run = async () => {
    setSorting(true);
    setSorted(new Set());
    setComparing(null);
    const arr = [...data];
    if (algo === 'bubble') await bubbleSort(arr);
    else if (algo === 'selection') await selectionSort(arr);
    else if (algo === 'insertion') await insertionSort(arr);
    else if (algo === 'merge') {
      await mergeSort(arr, 0, arr.length - 1);
    } else if (algo === 'quick') {
      await quickSort(arr, 0, arr.length - 1);
    }
    setComparing(null);
    setSorted(new Set(arr.map((_, i) => i)));
    setSorting(false);
  };

  const reset = () => {
    setData(Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)));
    setSorted(new Set());
    setComparing(null);
  };

  const maxVal = Math.max(...data, 1);

  const algoInfo: Record<Algo, { name: string; complexity: string; desc: string }> = {
    bubble: { name: 'Bubble Sort', complexity: 'O(n²)', desc: 'Repeatedly swaps adjacent out-of-order pairs, bubbling large values to the end.' },
    selection: { name: 'Selection Sort', complexity: 'O(n²)', desc: 'Selects the minimum element from the unsorted portion and places it at the front.' },
    insertion: { name: 'Insertion Sort', complexity: 'O(n²)', desc: 'Builds the sorted array one element at a time by inserting into its correct position.' },
    merge: { name: 'Merge Sort', complexity: 'O(n log n)', desc: 'Divides the array in half recursively, then merges sorted halves. Stable and efficient.' },
    quick: { name: 'Quick Sort', complexity: 'O(n log n) avg', desc: 'Picks a pivot, partitions elements around it, then recursively sorts each partition.' },
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-gray-800 mb-1">3. Sorting Algorithms</h3>
      <p className="text-sm text-gray-500 mb-4">
        Visualizes how sorting algorithms rearrange elements into order. Compare simple O(n²)
        algorithms with efficient O(n log n) ones.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(algoInfo) as Algo[]).map((a) => (
          <button
            key={a}
            onClick={() => setAlgo(a)}
            disabled={sorting}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              algo === a ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {algoInfo[a].name}
          </button>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-3 mb-4">
        <p className="text-xs text-blue-700">
          <strong>{algoInfo[algo].name}</strong> — {algoInfo[algo].desc}{' '}
          Time: {algoInfo[algo].complexity}, Space: {algo === 'merge' ? 'O(n)' : algo === 'quick' ? 'O(log n)' : 'O(1)'}.
        </p>
      </div>

      <div className="flex items-end gap-2 h-40 mb-4">
        {data.map((n, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end">
            <span className="text-xs font-semibold text-gray-600 mb-1">{n}</span>
            <div
              className={`w-full rounded-t-lg transition-all duration-300 ${
                sorted.has(i)
                  ? 'bg-green-500'
                  : comparing && (comparing[0] === i || comparing[1] === i)
                  ? 'bg-blue-500'
                  : 'bg-gradient-to-t from-green-400 to-blue-400'
              }`}
              style={{ height: `${(n / maxVal) * 120}px` }}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={run}
          disabled={sorting}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50"
        >
          <Play className="w-4 h-4" /> {sorting ? 'Sorting...' : 'Sort'}
        </button>
        <button
          onClick={reset}
          disabled={sorting}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50"
        >
          <RotateCcw className="w-4 h-4" /> Shuffle
        </button>
      </div>
    </div>
  );
}
