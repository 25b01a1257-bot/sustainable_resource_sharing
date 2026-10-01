import { useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertTriangle, ArrowRight, Flame } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from '@/router';
import type { RequestStatus } from '@/types';

const tabs: { key: RequestStatus | 'All'; label: string }[] = [
  { key: 'All', label: 'All Requests' },
  { key: 'Pending', label: 'Pending' },
  { key: 'Approved', label: 'Approved' },
  { key: 'Completed', label: 'Completed' },
  { key: 'Rejected', label: 'Rejected' },
];

export default function RequestsPage() {
  const { requests, updateRequestStatus, currentUser } = useApp();
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState<RequestStatus | 'All'>('All');

  const filtered = activeTab === 'All' ? requests : requests.filter((r) => r.status === activeTab);

  const counts = {
    Pending: requests.filter((r) => r.status === 'Pending').length,
    Approved: requests.filter((r) => r.status === 'Approved').length,
    Completed: requests.filter((r) => r.status === 'Completed').length,
    Rejected: requests.filter((r) => r.status === 'Rejected').length,
  };

  const statusBadge = (status: RequestStatus) => {
    const map = {
      Pending: 'bg-amber-100 text-amber-700',
      Approved: 'bg-blue-100 text-blue-700',
      Completed: 'bg-green-100 text-green-700',
      Rejected: 'bg-red-100 text-red-700',
    };
    return map[status];
  };

  const statusIcon = (status: RequestStatus) => {
    if (status === 'Pending') return <Clock className="w-4 h-4 text-amber-500" />;
    if (status === 'Approved') return <ArrowRight className="w-4 h-4 text-blue-500" />;
    if (status === 'Completed') return <CheckCircle className="w-4 h-4 text-green-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Request System</h1>
        <p className="text-gray-500 text-sm mb-6">
          Track and manage resource requests. Owners can approve or reject requests made to them.
        </p>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {([
            { label: 'Pending', value: counts.Pending, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
            { label: 'Approved', value: counts.Approved, icon: ArrowRight, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Completed', value: counts.Completed, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
            { label: 'Rejected', value: counts.Rejected, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
          ] as const).map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-800">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === t.key
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-green-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Request list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <AlertTriangle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400">No requests in this category.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-800 truncate">{r.resourceName}</h3>
                      {r.urgent && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600">
                          <Flame className="w-3 h-3" /> Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{r.message}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400">
                      <span>From: <strong className="text-gray-600">{r.requester}</strong></span>
                      <span>To: <strong className="text-gray-600">{r.owner}</strong></span>
                      <span>{r.dateRequested}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${statusBadge(r.status)}`}>
                      {statusIcon(r.status)} {r.status}
                    </span>
                  </div>
                </div>

                {/* Owner actions */}
                {r.owner === currentUser && r.status === 'Pending' && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
                    <button
                      onClick={() => updateRequestStatus(r.id, 'Approved')}
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateRequestStatus(r.id, 'Rejected')}
                      className="px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors border border-red-200"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {r.owner === currentUser && r.status === 'Approved' && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
                    <button
                      onClick={() => updateRequestStatus(r.id, 'Completed')}
                      className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Mark Completed
                    </button>
                  </div>
                )}

                <div className="mt-3">
                  <button
                    onClick={() => navigate('details', { id: r.resourceId })}
                    className="text-xs text-green-600 font-medium hover:underline"
                  >
                    View Resource →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
