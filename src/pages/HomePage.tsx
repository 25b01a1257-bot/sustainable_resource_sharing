import {
  Recycle, Users, Package, TrendingDown, Leaf,
  ArrowRight, BookOpen, Laptop, Shirt, Sofa, PenTool,
} from 'lucide-react';
import { useRouter } from '@/router';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const { navigate } = useRouter();
  const { resources, requests } = useApp();

  const totalShared = resources.length;
  const totalUsers = new Set([...resources.map((r) => r.owner), ...requests.map((r) => r.requester)]).size;
  const completedExchanges = requests.filter((r) => r.status === 'Completed').length;
  const resourcesSaved = completedExchanges + Math.floor(totalShared * 0.3);

  const stats = [
    { label: 'Resources Shared', value: totalShared, icon: Package, color: 'from-green-400 to-green-600' },
    { label: 'Active Users', value: totalUsers, icon: Users, color: 'from-blue-400 to-blue-600' },
    { label: 'Completed Exchanges', value: completedExchanges, icon: Recycle, color: 'from-emerald-400 to-emerald-600' },
    { label: 'Resources Saved', value: resourcesSaved, icon: TrendingDown, color: 'from-teal-400 to-teal-600' },
  ];

  const features = [
    { icon: BookOpen, title: 'Share Books', desc: 'Pass along textbooks and notes you no longer need.' },
    { icon: Laptop, title: 'Lend Electronics', desc: 'Calculators, chargers, and kits for short-term use.' },
    { icon: Shirt, title: 'Give Clothes', desc: 'Winter wear, lab coats, and more — keep them in use.' },
    { icon: Sofa, title: 'Pass On Furniture', desc: 'Tables, chairs, and shelves for the next student.' },
    { icon: PenTool, title: 'Stationery Pool', desc: 'Share drawing tools, markers, and supplies.' },
    { icon: Leaf, title: 'Reduce Waste', desc: 'Every shared item stays out of a landfill.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-blue-600 text-white">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm mb-6">
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-medium">A College Sustainability Initiative</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Sustainable Resource Sharing
            </h1>
            <p className="text-lg sm:text-xl text-green-50 leading-relaxed mb-8 max-w-2xl">
              Reduce waste by sharing unused resources with fellow students and community members.
              Books, electronics, furniture, clothes — everything finds a second life through sharing
              instead of landfilling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('dashboard')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-green-600 font-semibold hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Browse Resources <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('add')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-green-700/40 backdrop-blur-sm text-white font-semibold border border-white/30 hover:bg-green-700/60 transition-colors"
              >
                Share a Resource
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-50">
              <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How Resource Sharing Reduces Waste</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Instead of buying new or throwing away, sharing keeps resources circulating within the community.
            This means fewer items manufactured, fewer items discarded, and a smaller carbon footprint for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:border-green-200 transition-all">
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to start sharing?</h2>
          <p className="text-blue-50 mb-8 max-w-xl mx-auto">
            Join your peers in building a circular campus economy. Every item you share makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('add')}
              className="px-6 py-3 rounded-xl bg-white text-green-600 font-semibold hover:bg-green-50 transition-colors shadow-lg"
            >
              List a Resource
            </button>
            <button
              onClick={() => navigate('dashboard')}
              className="px-6 py-3 rounded-xl bg-blue-700/40 backdrop-blur text-white font-semibold border border-white/30 hover:bg-blue-700/60 transition-colors"
            >
              Browse Available Items
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
