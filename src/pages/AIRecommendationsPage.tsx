import { useState } from 'react';
import { Sparkles, TrendingUp, Lightbulb, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from '@/router';
import { getRecommendationsForUser, getRecommendations, type Recommendation } from '@/services/recommendations';
import ResourceCard from '@/components/ResourceCard';
import { CategoryIcon } from '@/components/ResourceCard';

export default function AIRecommendationsPage() {
  const { resources, currentUser } = useApp();
  const { navigate } = useRouter();
  const [selectedResourceId, setselectedResourceId] = useState<string>('');

  const userRecs = getRecommendationsForUser(currentUser, resources);
  const selectedResource = resources.find((r) => r.id === selectedResourceId);
  const resourceRecs: Recommendation[] = selectedResource
    ? getRecommendations(selectedResource, resources)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">AI Resource Recommender</h1>
              <p className="text-sm text-gray-500">
                Smart recommendations using similarity scoring — analyzes category, description, condition, and popularity
              </p>
            </div>
          </div>
          <div className="mt-3 bg-blue-50 rounded-xl p-3 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              This is an AI-style recommendation engine that computes similarity scores between resources
              based on category matching, keyword overlap in descriptions, name similarity, condition,
              sharing type, location proximity, and view popularity.
            </p>
          </div>
        </div>

        {/* Personal recommendations */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h2 className="font-semibold text-gray-800">AI Recommended For You</h2>
            <span className="text-xs text-gray-400">Based on {currentUser}'s activity</span>
          </div>

          {userRecs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <p className="text-gray-400 text-sm">
                No recommendations yet. Share some resources to get personalized recommendations!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {userRecs.map((rec) => (
                <div key={rec.resource.id}>
                  <ResourceCard resource={rec.resource} />
                  <div className="mt-2 bg-white rounded-xl border border-green-100 px-3 py-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3 h-3 text-green-500" />
                      <span className="text-xs font-medium text-green-600">Match Score: {rec.score}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {rec.reasons.map((reason, i) => (
                        <span key={i} className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Resource-based recommendations */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Find Similar Resources</h2>
          <p className="text-sm text-gray-500 mb-4">
            Select a resource to see what else the AI recommends based on similarity:
          </p>
          <select
            value={selectedResourceId}
            onChange={(e) => setselectedResourceId(e.target.value)}
            className="w-full sm:w-96 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white mb-4"
          >
            <option value="">Choose a resource...</option>
            {resources.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>

          {selectedResource && (
            <div>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl mb-4">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                  <CategoryIcon category={selectedResource.category} className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{selectedResource.name}</p>
                  <p className="text-xs text-gray-400">{selectedResource.category} • {selectedResource.condition}</p>
                </div>
              </div>

              {resourceRecs.length === 0 ? (
                <p className="text-sm text-gray-400 py-4 text-center">No similar resources found.</p>
              ) : (
                <div className="space-y-3">
                  {resourceRecs.map((rec, i) => (
                    <div
                      key={rec.resource.id}
                      onClick={() => navigate('details', { id: rec.resource.id })}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <span className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-400 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 truncate">{rec.resource.name}</p>
                        <p className="text-xs text-gray-400">{rec.resource.category} • {rec.resource.condition} • {rec.resource.owner}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="text-xs font-bold text-green-600">{rec.score}%</span>
                        <div className="flex flex-wrap gap-1 justify-end max-w-[200px]">
                          {rec.reasons.slice(0, 2).map((reason, j) => (
                            <span key={j} className="text-xs text-gray-400 bg-white px-1.5 py-0.5 rounded">
                              {reason}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
