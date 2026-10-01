import { useState } from 'react';
import { Menu, X, Recycle, ChevronDown, LogOut, User } from 'lucide-react';
import { useRouter, type Page } from '@/router';
import { useApp } from '@/context/AppContext';

const mainNavItems: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Browse', page: 'dashboard' },
  { label: 'Share', page: 'add' },
  { label: 'Requests', page: 'requests' },
  { label: 'My Dashboard', page: 'user' },
];

const moreNavItems: { label: string; page: Page }[] = [
  { label: 'Admin Dashboard', page: 'admin' },
  { label: 'ADSA Algorithm Lab', page: 'adsa' },
  { label: 'AI Assistant', page: 'ai-assistant' },
  { label: 'AI Recommendations', page: 'ai-recommendations' },
  { label: 'AI Insights', page: 'ai-insights' },
  { label: 'About Project', page: 'about' },
];

export default function Navbar() {
  const { page, navigate } = useRouter();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { currentUser, isAuthenticated, logout } = useApp();

  const handleNav = (p: Page) => {
    navigate(p);
    setOpen(false);
    setMoreOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('home');
    setOpen(false);
  };

  const isActive = (p: Page) => page === p;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => handleNav('home')} className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Recycle className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-800 hidden sm:block">
              Sustainable<span className="text-green-600">Share</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {mainNavItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.page)
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                onBlur={() => setTimeout(() => setMoreOpen(false), 200)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  moreNavItems.some((i) => isActive(i.page))
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                More <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl border border-gray-100 shadow-lg py-2 z-50">
                  {moreNavItems.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => handleNav(item.page)}
                      className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                        isActive(item.page)
                          ? 'bg-green-50 text-green-700'
                          : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Auth area */}
          <div className="hidden lg:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNav('user')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <User className="w-4 h-4" />
                  {currentUser.split(' ')[0]}
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNav('login')}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="px-4 py-1.5 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-2 space-y-1">
            {mainNavItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.page)
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-gray-100 my-2 pt-2">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase mb-1">More</p>
              {moreNavItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.page)
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="border-t border-gray-100 my-2 pt-2">
              {isAuthenticated ? (
                <div className="flex items-center justify-between px-3">
                  <span className="text-sm text-gray-600">{currentUser}</span>
                  <button onClick={handleLogout} className="text-sm text-red-500 font-medium">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 px-3">
                  <button onClick={() => handleNav('login')} className="flex-1 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600">
                    Login
                  </button>
                  <button onClick={() => handleNav('register')} className="flex-1 py-2 rounded-lg bg-green-600 text-white text-sm font-medium">
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
