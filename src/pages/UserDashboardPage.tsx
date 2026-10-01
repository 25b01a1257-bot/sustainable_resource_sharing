import { Package, ArrowDownToLine, Clock, CheckCircle, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from '@/router';
import { useState } from 'react';
import ResourceCard from '@/components/ResourceCard';

export default function UserDashboardPage() {
  const { resources, requests, currentUser, setCurrentUser } = useApp();
  const { navigate } = useRouter();
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(currentUser);

  const myResources = resources.filter((r) => r.owner === currentUser);
  const myRequests = requests.filter((r) => r.requester === currentUser);
  const requestsToMe = requests.filter((r) => r.owner === currentUser);
  const pendingRequests = [...myRequests, ...requestsToMe].filter((r) => r.status === 'Pending');
  const completedExchanges = [...myRequests, ...requestsToMe].filter(
    (r) => r.status === 'Completed'
  );

  const stats = [
    { label: 'Resources I Shared', value: myResources.length, icon: Package, color: 'from-green-400 to-green-600' },
    { label: 'Resources I Requested', value: myRequests.length, icon: ArrowDownToLine, color: 'from-blue-400 to-blue-600' },
    { label: 'Pending Requests', value: pendingRequests.length, icon: Clock, color: 'from-amber-400 to-amber-600' },
    { label: 'Completed Exchanges', value: completedExchanges.length, icon: CheckCircle, color: 'from-emerald-400 to-emerald-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with user switcher */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{currentUser}</h1>
                <p className="text-sm text-gray-500">My Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {editingName ? (
                <>
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={() => { setCurrentUser(tempName.trim() || currentUser); setEditingName(false); }}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => { setEditingName(false); setTempName(currentUser); }}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <select
                    value={currentUser}
                    onChange={(e) => setCurrentUser(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    {Array.from(new Set([...resources.map((r) => r.owner), ...requests.map((r) => r.requester)])).sort().map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => { setTempName(currentUser); setEditingName(true); }}
                    className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm hover:bg-gray-50"
                  >
                    Custom
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resources I shared */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">Resources I Shared</h2>
              <button onClick={() => navigate('add')} className="text-xs text-green-600 font-medium hover:underline">
                + Add new
              </button>
            </div>
            {myResources.length === 0 ? (
              <p className="text-sm text-gray-400 py-8 text-center">You haven't shared any resources yet.</p>
            ) : (
              <div className="space-y-2">
                {myResources.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => navigate('details', { id: r.id })}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-700">{r.name}</p>
                      <p className="text-xs text-gray-400">{r.category} • {r.sharingType}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${r.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {r.available ? 'Available' : 'Taken'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Resources I requested */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Resources I Requested</h2>
            {myRequests.length === 0 ? (
              <p className="text-sm text-gray-400 py-8 text-center">You haven't requested any resources yet.</p>
            ) : (
              <div className="space-y-2">
                {myRequests.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => navigate('details', { id: r.resourceId })}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-700">{r.resourceName}</p>
                      <p className="text-xs text-gray-400">From: {r.owner}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      r.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      r.status === 'Approved' ? 'bg-blue-100 text-blue-700' :
                      r.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending requests */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Pending Requests</h2>
            {pendingRequests.length === 0 ? (
              <p className="text-sm text-gray-400 py-8 text-center">No pending requests.</p>
            ) : (
              <div className="space-y-2">
                {pendingRequests.map((r) => (
                  <div key={r.id} className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                    <p className="text-sm font-medium text-gray-700">{r.resourceName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {r.requester === currentUser ? `To: ${r.owner}` : `From: ${r.requester}`}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Completed exchanges */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Completed Exchanges</h2>
            {completedExchanges.length === 0 ? (
              <p className="text-sm text-gray-400 py-8 text-center">No completed exchanges yet.</p>
            ) : (
              <div className="space-y-2">
                {completedExchanges.map((r) => (
                  <div key={r.id} className="p-3 rounded-xl bg-green-50 border border-green-100">
                    <p className="text-sm font-medium text-gray-700">{r.resourceName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {r.requester === currentUser ? `Received from ${r.owner}` : `Given to ${r.requester}`}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* My resources grid */}
        {myResources.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold text-gray-800 mb-4">My Shared Resources (Card View)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {myResources.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
