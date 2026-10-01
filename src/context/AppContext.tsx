import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Resource, ResourceRequest, User } from '@/types';
import { sampleResources, sampleRequests, sampleUsers } from '@/data/sampleData';

const STORAGE_KEY = 'srs_data_v2';

interface StoredData {
  resources: Resource[];
  requests: ResourceRequest[];
  users: User[];
  currentUserName: string;
  isAuthenticated: boolean;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextValue {
  resources: Resource[];
  requests: ResourceRequest[];
  users: User[];
  currentUser: string;
  isAuthenticated: boolean;
  toasts: Toast[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, location: string) => boolean;
  logout: () => void;
  setCurrentUser: (name: string) => void;
  addResource: (r: Omit<Resource, 'id' | 'dateAdded' | 'available' | 'views'>) => void;
  editResource: (id: string, r: Partial<Omit<Resource, 'id' | 'dateAdded'>>) => void;
  addRequest: (r: Omit<ResourceRequest, 'id' | 'dateRequested' | 'status'>) => void;
  updateRequestStatus: (id: string, status: ResourceRequest['status']) => void;
  deleteResource: (id: string) => void;
  incrementViews: (id: string) => void;
  showToast: (message: string, type?: Toast['type']) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function loadData(): StoredData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredData;
      if (parsed.resources && parsed.requests) return parsed;
    }
  } catch {
    // ignore
  }
  return {
    resources: sampleResources,
    requests: sampleRequests,
    users: sampleUsers,
    currentUserName: 'Aarav Sharma',
    isAuthenticated: false,
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StoredData>(loadData);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const login: AppContextValue['login'] = (email, password) => {
    const user = data.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (user) {
      setData((p) => ({ ...p, currentUserName: user.name, isAuthenticated: true }));
      showToast(`Welcome back, ${user.name}!`, 'success');
      return true;
    }
    showToast('Invalid email or password', 'error');
    return false;
  };

  const register: AppContextValue['register'] = (name, email, password, location) => {
    if (data.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      showToast('An account with this email already exists', 'error');
      return false;
    }
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      password,
      location,
      joined: new Date().toISOString().slice(0, 10),
    };
    setData((p) => ({
      ...p,
      users: [...p.users, newUser],
      currentUserName: name,
      isAuthenticated: true,
    }));
    showToast(`Account created! Welcome, ${name}!`, 'success');
    return true;
  };

  const logout = () => {
    setData((p) => ({ ...p, isAuthenticated: false }));
    showToast('Logged out successfully', 'info');
  };

  const setCurrentUser = (name: string) =>
    setData((p) => ({ ...p, currentUserName: name }));

  const addResource: AppContextValue['addResource'] = (r) => {
    setData((prev) => ({
      ...prev,
      resources: [
        {
          ...r,
          id: `r${Date.now()}`,
          dateAdded: new Date().toISOString().slice(0, 10),
          available: r.quantity > 0,
          views: 0,
        },
        ...prev.resources,
      ],
    }));
    showToast('Resource shared successfully!', 'success');
  };

  const editResource: AppContextValue['editResource'] = (id, updates) => {
    setData((prev) => ({
      ...prev,
      resources: prev.resources.map((r) =>
        r.id === id ? { ...r, ...updates, available: updates.quantity !== undefined ? updates.quantity > 0 : r.available } : r
      ),
    }));
    showToast('Resource updated successfully!', 'success');
  };

  const addRequest: AppContextValue['addRequest'] = (r) => {
    setData((prev) => {
      if (prev.requests.some(
        (existing) =>
          existing.resourceId === r.resourceId &&
          existing.requester === r.requester &&
          (existing.status === 'Pending' || existing.status === 'Approved')
      )) {
        return prev;
      }
      return {
        ...prev,
        requests: [
          {
            ...r,
            id: `req${Date.now()}`,
            dateRequested: new Date().toISOString().slice(0, 10),
            status: 'Pending',
          },
          ...prev.requests,
        ],
      };
    });
    showToast('Request submitted! The owner will review it.', 'success');
  };

  const updateRequestStatus: AppContextValue['updateRequestStatus'] = (id, status) => {
    setData((prev) => ({
      ...prev,
      requests: prev.requests.map((req) =>
        req.id === id ? { ...req, status } : req
      ),
      resources: prev.resources.map((res) => {
        const req = prev.requests.find((q) => q.id === id);
        if (!req || req.resourceId !== res.id) return res;
        if (status === 'Completed') return { ...res, available: res.quantity > 0 };
        if (status === 'Approved') return { ...res, available: false };
        if (status === 'Rejected') return { ...res, available: true };
        return res;
      }),
    }));
    showToast(`Request ${status.toLowerCase()}`, 'info');
  };

  const deleteResource: AppContextValue['deleteResource'] = (id) => {
    setData((prev) => ({
      ...prev,
      resources: prev.resources.filter((r) => r.id !== id),
      requests: prev.requests.filter((r) => r.resourceId !== id),
    }));
    showToast('Resource deleted', 'info');
  };

  const incrementViews: AppContextValue['incrementViews'] = (id) => {
    setData((prev) => ({
      ...prev,
      resources: prev.resources.map((r) =>
        r.id === id ? { ...r, views: r.views + 1 } : r
      ),
    }));
  };

  return (
    <AppContext.Provider
      value={{
        resources: data.resources,
        requests: data.requests,
        users: data.users,
        currentUser: data.currentUserName,
        isAuthenticated: data.isAuthenticated,
        toasts,
        login,
        register,
        logout,
        setCurrentUser,
        addResource,
        editResource,
        addRequest,
        updateRequestStatus,
        deleteResource,
        incrementViews,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
