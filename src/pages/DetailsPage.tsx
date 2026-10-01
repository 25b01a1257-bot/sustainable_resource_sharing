import { useState } from 'react';
import {
  ArrowLeft, MapPin, User, Calendar, Package, Tag,
  CheckCircle, XCircle, AlertCircle, CheckCircle2, Send, Trash2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from '@/router';
import { CategoryIcon } from '@/components/ResourceCard';

export default function DetailsPage() {
  const { resources, requests, addRequest, deleteResource, currentUser, setCurrentUser } = useApp();
  const { params, navigate } = useRouter();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [message, setMessage] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const resource = resources.find((r) => r.id === params.id);

  if (!resource) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">Resource not found.</p>
          <button onClick={() => navigate('dashboard')} className="text-green-600 font-medium hover:underline">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const resourceRequests = requests.filter((r) => r.resourceId === resource.id);

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser.trim()) {
      setError('Please enter your name in the field at the top first.');
      return;
    }
    if (!message.trim()) {
      setError('Please write a short message to the owner.');
      return;
    }
    setError('');
    addRequest({
      resourceId: resource.id,
      resourceName: resource.name,
      requester: currentUser,
      owner: resource.owner,
      urgent,
      message: message.trim(),
    });
    setSuccess(true);
    setShowRequestForm(false);
    setMessage('');
    setUrgent(false);
    setTimeout(() => setSuccess(false), 4000);
  };

  const infoRow = (Icon: typeof MapPin, label: string, value: string) => (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-50">
      <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <div>
        <div className="text-xs text-gray-400">{label}</div>
        <div className="text-sm font-medium text-gray-700">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('dashboard')}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        {success && (
          <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-700">
              Request submitted! The owner will review it. You can track it in the Requests page.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: resource info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center relative">
                <CategoryIcon category={resource.category} className="w-20 h-20 text-white/80" />
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700">
                  {resource.sharingType}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                    {resource.category}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    resource.condition === 'New' ? 'bg-green-100 text-green-700' :
                    resource.condition === 'Like New' ? 'bg-emerald-100 text-emerald-700' :
                    resource.condition === 'Good' ? 'bg-blue-100 text-blue-700' :
                    resource.condition === 'Fair' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {resource.condition}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-3">{resource.name}</h1>
                <p className="text-gray-600 leading-relaxed">{resource.description}</p>
              </div>
            </div>

            {/* Availability banner */}
            <div className={`rounded-2xl border p-5 flex items-center gap-4 ${
              resource.available
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}>
              {resource.available ? (
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              ) : (
                <XCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
              )}
              <div>
                <p className={`font-semibold ${resource.available ? 'text-green-700' : 'text-red-600'}`}>
                  {resource.available ? 'Available' : 'Currently Unavailable'}
                </p>
                <p className={`text-sm ${resource.available ? 'text-green-600' : 'text-red-500'}`}>
                  {resource.available
                    ? `${resource.quantity} unit${resource.quantity > 1 ? 's' : ''} available for ${resource.sharingType === 'Give' ? 'giveaway' : 'lending'}`
                    : 'This resource is already requested/approved. Check back later.'}
                </p>
              </div>
            </div>

            {/* Requests on this resource */}
            {resourceRequests.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Requests for this resource</h3>
                <div className="space-y-3">
                  {resourceRequests.map((r) => (
                    <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <div>
                        <p className="text-sm font-medium text-gray-700">{r.requester}</p>
                        <p className="text-xs text-gray-400">{r.dateRequested} {r.urgent && <span className="text-red-500 font-medium">• Urgent</span>}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
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
              </div>
            )}
          </div>

          {/* Right: info sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-3">Resource Information</h3>
              {infoRow(MapPin, 'Location', resource.location)}
              {infoRow(User, 'Owner', resource.owner)}
              {infoRow(Package, 'Quantity', String(resource.quantity))}
              {infoRow(Tag, 'Sharing Type', resource.sharingType === 'Give' ? 'Give Away' : 'Lend')}
              {infoRow(Calendar, 'Date Added', resource.dateAdded)}
            </div>

            {/* Current user */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-3">Your Identity</h3>
              <p className="text-xs text-gray-400 mb-2">Requests will be made under this name:</p>
              <input
                type="text"
                value={currentUser}
                onChange={(e) => setCurrentUser(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Request button / form */}
            {resource.available ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                {!showRequestForm ? (
                  <button
                    onClick={() => setShowRequestForm(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-sm"
                  >
                    <Send className="w-4 h-4" /> Request Resource
                  </button>
                ) : (
                  <form onSubmit={handleRequest} className="space-y-3">
                    <h4 className="font-semibold text-gray-800 text-sm">Request this resource</h4>
                    {error && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {error}
                      </p>
                    )}
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      placeholder="Write a message to the owner explaining why you need this..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={urgent}
                        onChange={(e) => setUrgent(e.target.checked)}
                        className="w-4 h-4 rounded accent-red-500"
                      />
                      Mark as urgent
                    </label>
                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors">
                        Submit Request
                      </button>
                      <button type="button" onClick={() => setShowRequestForm(false)} className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center">
                <XCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">This resource is currently unavailable for requests.</p>
              </div>
            )}

            {/* Delete (if owner) */}
            {currentUser === resource.owner && (
              <button
                onClick={() => {
                  if (confirm('Delete this resource? This cannot be undone.')) {
                    deleteResource(resource.id);
                    navigate('dashboard');
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Delete Resource
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
