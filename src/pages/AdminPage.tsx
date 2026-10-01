import { Users, Package, CheckCircle, Clock, TrendingUp, Award } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { BarChart, DonutChart, LineChart } from '@/components/Charts';

export default function AdminPage() {
  const { resources, requests } = useApp();

  const totalUsers = new Set([
    ...resources.map((r) => r.owner),
    ...requests.map((r) => r.requester),
  ]).size;
  const totalResources = resources.length;
  const availableResources = resources.filter((r) => r.available).length;
  const pendingRequests = requests.filter((r) => r.status === 'Pending').length;
  const completedExchanges = requests.filter((r) => r.status === 'Completed').length;

  const stats = [
    { label: 'Total Users', value: totalUsers, icon: Users, color: 'from-blue-400 to-blue-600' },
    { label: 'Total Resources', value: totalResources, icon: Package, color: 'from-green-400 to-green-600' },
    { label: 'Available Resources', value: availableResources, icon: CheckCircle, color: 'from-emerald-400 to-emerald-600' },
    { label: 'Pending Requests', value: pendingRequests, icon: Clock, color: 'from-amber-400 to-amber-600' },
    { label: 'Completed Exchanges', value: completedExchanges, icon: TrendingUp, color: 'from-teal-400 to-teal-600' },
  ];

  // Category distribution
  const categoryColors: Record<string, string> = {
    Books: '#059669',
    Stationery: '#3b82f6',
    Electronics: '#0d9488',
    Clothes: '#8b5cf6',
    Furniture: '#f59e0b',
    Other: '#ec4899',
  };

  const categoryData = Object.entries(
    resources.reduce<Record<string, number>>((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([label, value]) => ({ label, value, color: categoryColors[label] || '#6b7280' }))
   .sort((a, b) => b.value - a.value);

  // Request status distribution
  const statusData = [
    { label: 'Pending', value: requests.filter((r) => r.status === 'Pending').length, color: '#f59e0b' },
    { label: 'Approved', value: requests.filter((r) => r.status === 'Approved').length, color: '#3b82f6' },
    { label: 'Completed', value: requests.filter((r) => r.status === 'Completed').length, color: '#059669' },
    { label: 'Rejected', value: requests.filter((r) => r.status === 'Rejected').length, color: '#ef4444' },
  ];

  // Bar chart for categories
  const categoryBarData = categoryData.map((d) => ({
    label: d.label,
    value: d.value,
    color: `linear-gradient(to top, ${d.color}, ${d.color}aa)`,
  }));

  // Trend by month (based on dateAdded)
  const monthMap: Record<string, number> = {};
  resources.forEach((r) => {
    const month = r.dateAdded.slice(0, 7);
    monthMap[month] = (monthMap[month] || 0) + 1;
  });
  const trendData = Object.entries(monthMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, value]) => ({
      label: label.slice(5),
      value,
    }));

  // Top contributors
  const contributorMap: Record<string, number> = {};
  resources.forEach((r) => {
    contributorMap[r.owner] = (contributorMap[r.owner] || 0) + 1;
  });
  const topContributors = Object.entries(contributorMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mb-6">
          Platform-wide statistics and analytics for the Sustainable Resource Sharing System.
        </p>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Category bar chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-1">Resources by Category</h2>
            <p className="text-xs text-gray-400 mb-4">Distribution of shared resources across categories</p>
            <BarChart data={categoryBarData} />
          </div>

          {/* Request status donut */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-1">Request Status Distribution</h2>
            <p className="text-xs text-gray-400 mb-4">Breakdown of all resource requests by status</p>
            <DonutChart data={statusData} />
          </div>

          {/* Category donut */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-1">Category Share</h2>
            <p className="text-xs text-gray-400 mb-4">Proportional view of resource categories</p>
            <DonutChart data={categoryData} />
          </div>

          {/* Trend line chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-1">Resources Added Over Time</h2>
            <p className="text-xs text-gray-400 mb-4">Monthly trend of new resource listings</p>
            {trendData.length > 1 ? (
              <LineChart data={trendData} />
            ) : (
              <p className="text-sm text-gray-400 py-12 text-center">Not enough data for trend.</p>
            )}
          </div>
        </div>

        {/* Top contributors + top category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-amber-500" />
              <h2 className="font-semibold text-gray-800">Top Contributors</h2>
            </div>
            <div className="space-y-3">
              {topContributors.map(([name, count], i) => (
                <div key={name} className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    i === 0 ? 'bg-amber-100 text-amber-700' :
                    i === 1 ? 'bg-gray-200 text-gray-600' :
                    i === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-700 flex-1">{name}</span>
                  <span className="text-sm text-gray-500">{count} resources</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-green-600" />
              <h2 className="font-semibold text-gray-800">Categories with Most Resources</h2>
            </div>
            <div className="space-y-3">
              {categoryData.map((c) => {
                const pct = Math.round((c.value / totalResources) * 100);
                return (
                  <div key={c.label}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{c.label}</span>
                      <span className="text-gray-500">{c.value} ({pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: c.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
