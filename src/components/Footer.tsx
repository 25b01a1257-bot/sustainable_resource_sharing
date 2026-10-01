import { Recycle, Heart } from 'lucide-react';
import { useRouter, type Page } from '@/router';

export default function Footer() {
  const { navigate } = useRouter();

  const links: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Browse Resources', page: 'dashboard' },
    { label: 'Share a Resource', page: 'add' },
    { label: 'My Dashboard', page: 'user' },
    { label: 'ADSA Algorithms', page: 'adsa' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                <Recycle className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Sustainable<span className="text-green-400">Share</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A college initiative to reduce waste by sharing unused resources.
              Built as an ADSA project demonstrating data structures and algorithms
              in a real-world application.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.page}>
                  <button
                    onClick={() => navigate(l.page)}
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Our Mission</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Every shared resource is one less item in a landfill. Together we can
              build a circular economy on campus — one book, one calculator, one
              jacket at a time.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>Built with</span>
          <Heart className="w-4 h-4 text-green-400" />
          <span>for a sustainable future</span>
        </div>
      </div>
    </footer>
  );
}
