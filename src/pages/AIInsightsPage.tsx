import { useMemo } from 'react';
import {
  Brain, TrendingDown, TrendingUp, Recycle, Award, Leaf,
  BarChart3, Lightbulb, Sparkles,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { BarChart, DonutChart, LineChart } from '@/components/Charts';

export default function AIInsightsPage() {
  const { resources, requests, currentUser } = useApp();

  const insights = useMemo(() => {
    const totalResources = resources.length;
    const completedExchanges = requests.filter((r) => r.status === 'Completed').length;
    const available = resources.filter((r) => r.available).length;

    // Estimated waste reduced: each completed exchange ≈ 2kg saved
    const wasteReduced = completedExchanges * 2 + Math.floor(totalResources * 0.5);

    // CO2 saved estimate: each shared item ≈ 1.5kg CO2
    const co2Saved = completedExchanges * 1.5 + totalResources * 0.3;

    // Category distribution
    const categoryCount: Record<string, number> = {};
    resources.forEach((r) => {
      categoryCount[r.category] = (categoryCount[r.category] || 0) + 1;
    });
    const sortedCategories = Object.entries(categoryCount).sort(([, a], [, b]) => b - a);
    const mostSharedCategory = sortedCategories[0]?.[0] ?? 'N/A';

    // Monthly trend
    const monthMap: Record<string, number> = {};
    resources.forEach((r) => {
      const month = r.dateAdded.slice(0, 7);
      monthMap[month] = (monthMap[month] || 0) + 1;
    });
    const trend = Object.entries(monthMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([label, value]) => ({ label: label.slice(5), value }));

    // Most active users
    const userActivity: Record<string, number> = {};
    resources.forEach((r) => {
      userActivity[r.owner] = (userActivity[r.owner] || 0) + 1;
    });
    requests.forEach((r) => {
      userActivity[r.requester] = (userActivity[r.requester] || 0) + 0.5;
    });
    const topUsers = Object.entries(userActivity)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Sustainability score (0-100)
    const sharingRate = totalResources > 0 ? completedExchanges / totalResources : 0;
    const availabilityRate = totalResources > 0 ? available / totalResources : 0;
    const sustainabilityScore = Math.round(
      Math.min(100, sharingRate * 40 + (1 - availabilityRate) * 30 + totalResources * 2)
    );

    // Request status distribution
    const statusData = [
      { label: 'Pending', value: requests.filter((r) => r.status === 'Pending').length, color: '#f59e0b' },
      { label: 'Approved', value: requests.filter((r) => r.status === 'Approved').length, color: '#3b82f6' },
      { label: 'Completed', value: requests.filter((r) => r.status === 'Completed').length, color: '#059669' },
      { label: 'Rejected', value: requests.filter((r) => r.status === 'Rejected').length, color: '#ef4444' },
    ];

    // Category donut data
    const categoryColors: Record<string, string> = {
      Books: '#059669', Electronics: '#3b82f6', Education: '#8b5cf6',
      Clothing: '#ec4899', Furniture: '#f59e0b', Sports: '#ef4444',
      'Lab Equipment': '#0d9488', Stationery: '#6366f1', Other: '#6b7280',
    };
    const categoryDonut = sortedCategories.map(([label, value]) => ({
      label, value, color: categoryColors[label] || '#6b7280',
    }));

    // Category bar data
    const categoryBar = sortedCategories.map(([label, value]) => ({
      label, value,
      color: `linear-gradient(to top, ${categoryColors[label] || '#6b7280'}, ${categoryColors[label] || '#6b7280'}aa)`,
    }));

    // AI-generated natural language insights
    const aiInsights: { icon: typeof Lightbulb; text: string; type: string }[] = [];

    if (sortedCategories.length > 0) {
      aiInsights.push({
        icon: BarChart3,
        text: `${mostSharedCategory} ${sortedCategories[0][1] > 5 ? 'dominate' : 'is currently'} the most shared category with ${sortedCategories[0][1]} resources available.`,
        type: 'statistical',
      });
    }

    if (trend.length >= 2) {
      const recent = trend[trend.length - 1].value;
      const previous = trend[trend.length - 2].value;
      if (recent > previous) {
        aiInsights.push({
          icon: TrendingUp,
          text: `Resource sharing increased by ${Math.round(((recent - previous) / previous) * 100)}% compared to the previous month. Great momentum!`,
          type: 'statistical',
        });
      } else if (recent < previous) {
        aiInsights.push({
          icon: TrendingDown,
          text: `Resource sharing decreased by ${Math.round(((previous - recent) / previous) * 100)}% compared to the previous month. Consider promoting the platform.`,
          type: 'statistical',
        });
      }
    }

    const electronicsCount = categoryCount['Electronics'] || 0;
    if (electronicsCount > 0) {
      aiInsights.push({
        icon: Recycle,
        text: `Sharing ${electronicsCount} reusable electronics can prevent unnecessary purchases and reduce e-waste significantly.`,
        type: 'ai-generated',
      });
    }

    aiInsights.push({
      icon: Leaf,
      text: `The community has an estimated sustainability score of ${sustainabilityScore}/100. ${sustainabilityScore >= 70 ? 'Excellent progress!' : sustainabilityScore >= 50 ? 'Good start — keep sharing!' : 'More sharing activity needed.'}`,
      type: 'ai-generated',
    });

    if (completedExchanges > 0) {
      aiInsights.push({
        icon: TrendingDown,
        text: `With ${completedExchanges} completed exchanges, the community has prevented approximately ${wasteReduced}kg of waste and saved ${co2Saved.toFixed(1)}kg of CO2 emissions.`,
        type: 'statistical',
      });
    }

    if (topUsers.length > 0) {
      aiInsights.push({
        icon: Award,
        text: `${topUsers[0][0]} is the most active contributor with ${Math.round(topUsers[0][1])} activity points, leading by example in sustainable sharing.`,
        type: 'statistical',
      });
    }

    return {
      wasteReduced, co2Saved, sustainabilityScore,
      mostSharedCategory, categoryBar, categoryDonut,
      trend, topUsers, statusData, aiInsights,
      totalResources, completedExchanges, available,
    };
  }, [resources, requests]);

  const statCards = [
    { label: 'Est. Waste Reduced', value: `${insights.wasteReduced} kg`, icon: TrendingDown, color: 'from-green-400 to-green-600' },
    { label: 'Est. CO2 Saved', value: `${insights.co2Saved.toFixed(1)} kg`, icon: Leaf, color: 'from-emerald-400 to-emerald-600' },
    { label: 'Sustainability Score', value: `${insights.sustainabilityScore}/100`, icon: Recycle, color: 'from-blue-400 to-blue-600' },
    { label: 'Completed Exchanges', value: insights.completedExchanges, icon: TrendingUp, color: 'from-teal-400 to-teal-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">AI Sustainability Insights</h1>
              <p className="text-sm text-gray-500">
                Environmental impact analysis and AI-generated insights for {currentUser}
              </p>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-green-600" />
            <h2 className="font-semibold text-gray-800">AI-Generated Insights</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {insights.aiInsights.map((insight, i) => (
              <div key={i} className="bg-white rounded-xl p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                  <insight.icon className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-700 leading-relaxed">{insight.text}</p>
                  <span className={`text-xs mt-1 inline-block px-2 py-0.5 rounded ${
                    insight.type === 'ai-generated' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {insight.type === 'ai-generated' ? 'AI-Generated' : 'Calculated Statistic'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-1">Resources by Category</h2>
            <p className="text-xs text-gray-400 mb-4">Most shared categories on the platform</p>
            <BarChart data={insights.categoryBar} />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-1">Category Distribution</h2>
            <p className="text-xs text-gray-400 mb-4">Proportional share of each category</p>
            <DonutChart data={insights.categoryDonut} />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-1">Monthly Sharing Activity</h2>
            <p className="text-xs text-gray-400 mb-4">Resources added over time</p>
            {insights.trend.length > 1 ? (
              <LineChart data={insights.trend} />
            ) : (
              <p className="text-sm text-gray-400 py-12 text-center">Not enough data for trend.</p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-1">Request Status</h2>
            <p className="text-xs text-gray-400 mb-4">Distribution of all resource requests</p>
            <DonutChart data={insights.statusData} />
          </div>
        </div>

        {/* Top contributors */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="font-semibold text-gray-800">Most Active Sharing Users</h2>
          </div>
          <div className="space-y-3">
            {insights.topUsers.map(([name, score], i) => (
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
                <span className="text-sm text-gray-500">{Math.round(score)} activity points</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
