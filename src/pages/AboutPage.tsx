import {
  Recycle, Target, Users, BookOpen, Code2, Brain, Database,
  Leaf, GitBranch, Cpu, Heart, ArrowRight,
} from 'lucide-react';
import { useRouter } from '@/router';

export default function AboutPage() {
  const { navigate } = useRouter();

  const objectives = [
    'Reduce waste by enabling reuse of resources among students and community members.',
    'Create a centralized platform for sharing books, electronics, furniture, and more.',
    'Demonstrate ADSA concepts through real-world algorithm implementations.',
    'Promote sustainability awareness and circular economy practices on campus.',
    'Provide AI-powered recommendations and insights for better resource utilization.',
  ];

  const techStack = [
    { icon: Code2, label: 'React + Vite + TypeScript', desc: 'Frontend framework' },
    { icon: Database, label: 'LocalStorage / Supabase', desc: 'Data persistence' },
    { icon: BookOpen, label: 'Tailwind CSS', desc: 'Styling and design system' },
    { icon: Cpu, label: 'ADSA Algorithms', desc: 'Search, sort, hash, queue, graph' },
    { icon: Brain, label: 'AI Recommendation Engine', desc: 'Similarity-based suggestions' },
    { icon: GitBranch, label: 'Graph Data Structure', desc: 'User-sharing network modeling' },
  ];

  const features = [
    { icon: Recycle, title: 'Resource Sharing', desc: 'List, browse, request, and track shared items.' },
    { icon: Users, title: 'User Management', desc: 'Register, login, manage your shared resources.' },
    { icon: Code2, title: 'ADSA Algorithm Lab', desc: 'Interactive visualizations of 10+ algorithms.' },
    { icon: Brain, title: 'AI Features', desc: 'Smart recommendations, chatbot assistant, sustainability insights.' },
    { icon: Target, title: 'Admin Dashboard', desc: 'Platform analytics with charts and statistics.' },
    { icon: Leaf, title: 'Sustainability Focus', desc: 'Track waste reduced and environmental impact.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 mb-4">
            <Leaf className="w-4 h-4" />
            <span className="text-sm font-medium">College ADSA Project</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">About the Project</h1>
          <p className="text-lg text-green-50 max-w-3xl leading-relaxed">
            The Sustainable Resource Sharing System is a college-level project that combines
            Advanced Data Structures & Algorithms with modern web development and AI features
            to address the real-world problem of waste reduction through resource reuse.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Problem Statement */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Problem Statement</h2>
          <p className="text-gray-600 leading-relaxed">
            Every year, students discard usable resources — textbooks, calculators, furniture, clothes —
            when they could be shared with peers who need them. This creates unnecessary waste and
            financial burden. There is no centralized campus platform for sharing these resources
            efficiently, and existing solutions don't leverage algorithmic optimization or AI for
            better matching and insights.
          </p>
        </div>

        {/* Objectives */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Objectives</h2>
          <div className="space-y-3">
            {objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-600">{obj}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center mb-3">
                  <f.icon className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Technology Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techStack.map((t) => (
              <div key={t.label} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <t.icon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">{t.label}</div>
                  <div className="text-xs text-gray-400">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADSA Concepts */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-100 p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">ADSA Concepts Used</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              ['Linear Search', 'O(n) — Scanning unsorted resource lists'],
              ['Binary Search', 'O(log n) — Fast lookup in sorted lists'],
              ['Bubble/Selection/Insertion Sort', 'O(n²) — Ordering resources'],
              ['Merge Sort & Quick Sort', 'O(n log n) — Efficient sorting'],
              ['HashMap', 'O(1) avg — Instant resource lookup by key'],
              ['Queue (FIFO)', 'O(1) — Processing requests in order'],
              ['Priority Queue', 'O(log n) — Urgent requests first'],
              ['Graph + BFS/DFS', 'O(V+E) — User-sharing network traversal'],
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

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate('dashboard')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            Explore Resources <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center text-sm text-gray-400 flex items-center justify-center gap-1.5">
          <span>Built with</span>
          <Heart className="w-4 h-4 text-green-400" />
          <span>for a sustainable future</span>
        </div>
      </div>
    </div>
  );
}
