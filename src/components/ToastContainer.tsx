import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => {
        const Icon = toast.type === 'success' ? CheckCircle : toast.type === 'error' ? XCircle : Info;
        const colors = {
          success: 'bg-green-50 border-green-200 text-green-700',
          error: 'bg-red-50 border-red-200 text-red-700',
          info: 'bg-blue-50 border-blue-200 text-blue-700',
        };
        const iconColors = {
          success: 'text-green-500',
          error: 'text-red-500',
          info: 'text-blue-500',
        };
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-slide-in ${colors[toast.type]}`}
            style={{ animation: 'slideInRight 0.3s ease-out' }}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 ${iconColors[toast.type]}`} />
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
