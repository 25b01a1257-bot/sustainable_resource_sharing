import { useState } from 'react';
import { Recycle, Mail, Lock, ArrowRight, LogIn, Eye, EyeOff } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from '@/router';

export default function LoginPage() {
  const { login } = useApp();
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Email is required'); return; }
    if (!password.trim()) { setError('Password is required'); return; }
    const success = login(email.trim(), password);
    if (success) {
      navigate('dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const fillDemo = () => {
    setEmail('aarav@college.edu');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-800">Sustainable<span className="text-green-600">Share</span></span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to continue sharing resources</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sm:p-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.edu"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-sm"
          >
            <LogIn className="w-4 h-4" /> Sign In <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={fillDemo}
            className="w-full text-xs text-gray-400 hover:text-green-600 transition-colors"
          >
            Use demo credentials (aarav@college.edu / demo123)
          </button>

          <div className="text-center text-sm text-gray-500 pt-2">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('register')}
              className="text-green-600 font-medium hover:underline"
            >
              Register here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
