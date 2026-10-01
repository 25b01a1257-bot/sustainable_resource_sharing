import { useMemo, useState } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from '@/router';
import { CATEGORIES, type Category } from '@/types';
import ResourceCard from '@/components/ResourceCard';

type SortKey = 'name' | 'date' | 'condition' | 'availability';

const conditionOrder: Record<string, number> = {
  'New': 1, 'Like New': 2, 'Good': 3, 'Fair': 4, 'Poor': 5,
};

export default function DashboardPage() {
  const { resources } = useApp();
  const { navigate } = useRouter();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [sort, setSort] = useState<SortKey>('date');

  const filtered = useMemo(() => {
    let list = resources.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== 'All') {
      list = list.filter((r) => r.category === category);
    }
    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'name': return a.name.localeCompare(b.name);
        case 'date': return b.dateAdded.localeCompare(a.dateAdded);
        case 'condition': return conditionOrder[a.condition] - conditionOrder[b.condition];
        case 'availability': return (a.available === b.available) ? 0 : a.available ? -1 : 1;
      }
    });
    return list;
  }, [resources, search, category, sort]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Resource Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">
              {filtered.length} resource{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <button
            onClick={() => navigate('add')}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors shadow-sm"
          >
            + Share a Resource
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category | 'All')}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="date">Sort by Date (Newest)</option>
                <option value="name">Sort by Name (A-Z)</option>
                <option value="condition">Sort by Condition (Best)</option>
                <option value="availability">Sort by Availability</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">No resources found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
