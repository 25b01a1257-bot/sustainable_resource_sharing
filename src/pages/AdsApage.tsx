import { Code2, BookOpen } from 'lucide-react';
import LinearSearchDemo from './adsa/LinearSearchDemo';
import BinarySearchDemo from './adsa/BinarySearchDemo';
import SortingDemo from './adsa/SortingDemo';
import HashTableDemo from './adsa/HashTableDemo';
import QueueDemo from './adsa/QueueDemo';
import PriorityQueueDemo from './adsa/PriorityQueueDemo';
import GraphDemo from './adsa/GraphDemo';
import BfsDfsDemo from './adsa/BfsDfsDemo';

const algorithms = [
  { name: 'Linear Search', complexity: 'O(n)', use: 'Finding resources by scanning the list' },
  { name: 'Binary Search', complexity: 'O(log n)', use: 'Fast lookup in sorted resource lists' },
  { name: 'Bubble/Selection/Insertion Sort', complexity: 'O(n²)', use: 'Ordering resources by name, date, condition' },
  { name: 'Merge Sort', complexity: 'O(n log n)', use: 'Efficient divide-and-conquer sorting' },
  { name: 'Quick Sort', complexity: 'O(n log n) avg', use: 'Efficient partition-based sorting' },
  { name: 'Hash Table', complexity: 'O(1) avg', use: 'Instant resource lookup by name key' },
  { name: 'Queue (FIFO)', complexity: 'O(1)', use: 'Processing resource requests in order' },
  { name: 'Priority Queue', complexity: 'O(log n)', use: 'Handling urgent requests first' },
  { name: 'Graph', complexity: 'O(V+E)', use: 'Modeling user-sharing connections' },
  { name: 'BFS / DFS', complexity: 'O(V+E)', use: 'Traversing the sharing network' },
];

export default function AdsApage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 mb-4">
            <Code2 className="w-4 h-4" />
            <span className="text-sm font-medium">ADSA Algorithm Lab</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Algorithms in Action</h1>
          <p className="text-blue-50 max-w-2xl leading-relaxed">
            Interactive visualizations of every key data structure and algorithm from the ADSA
            curriculum, demonstrated using real examples from the Sustainable Resource Sharing
            System. Try each one — search, sort, hash, queue, traverse graphs, and more.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-green-600" />
            <h2 className="font-semibold text-gray-800">Algorithm Overview</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Algorithm</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Complexity</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 hidden sm:table-cell">Used For</th>
                </tr>
              </thead>
              <tbody>
                {algorithms.map((a) => (
                  <tr key={a.name} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-gray-700">{a.name}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-green-50 text-green-700 text-xs font-mono font-medium">
                        {a.complexity}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-500 hidden sm:table-cell">{a.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive demos */}
        <div className="space-y-6">
          <LinearSearchDemo />
          <BinarySearchDemo />
          <SortingDemo />
          <HashTableDemo />
          <QueueDemo />
          <PriorityQueueDemo />
          <GraphDemo />
          <BfsDfsDemo />
        </div>

        {/* Application mapping */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-100 p-6 mt-6">
          <h2 className="font-semibold text-gray-800 mb-4">
            How These Algorithms Power the Application
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              ['Linear Search', 'Scanning unsorted resource lists for keyword matches in the browse page.'],
              ['Binary Search', 'Fast O(log n) lookups in sorted resource lists for quick retrieval.'],
              ['Sorting', 'Browse page sorts resources by name, date, condition, and availability.'],
              ['Merge / Quick Sort', 'Efficient O(n log n) sorting for large resource catalogs.'],
              ['Hash Table', 'Resources stored and looked up by name — instant O(1) retrieval.'],
              ['Queue', 'Resource requests processed in arrival order (FIFO) for fairness.'],
              ['Priority Queue', 'Urgent requests (exam tomorrow) served before normal ones.'],
              ['Graph + BFS/DFS', 'Users are nodes, shared resources form edges — reveals the sharing network.'],
            ].map(([algo, desc]) => (
              <div key={algo} className="flex items-start gap-2 bg-white rounded-xl p-3">
                <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-700">{algo}: </span>
                  <span className="text-gray-500">{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
