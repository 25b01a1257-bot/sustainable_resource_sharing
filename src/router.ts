import { useEffect, useState } from 'react';

export type Page =
  | 'home'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'add'
  | 'edit'
  | 'details'
  | 'requests'
  | 'my-resources'
  | 'user'
  | 'admin'
  | 'adsa'
  | 'about'
  | 'ai-assistant'
  | 'ai-recommendations'
  | 'ai-insights';

interface RouterValue {
  page: Page;
  params: Record<string, string>;
  navigate: (page: Page, params?: Record<string, string>) => void;
}

let currentNav: ((page: Page, params?: Record<string, string>) => void) | null = null;

export function navigate(page: Page, params?: Record<string, string>) {
  if (currentNav) currentNav(page, params);
}

const validPages: Page[] = [
  'home', 'login', 'register', 'dashboard', 'add', 'edit', 'details',
  'requests', 'my-resources', 'user', 'admin', 'adsa', 'about',
  'ai-assistant', 'ai-recommendations', 'ai-insights',
];

export function useRouter(): RouterValue {
  const [state, setState] = useState<{ page: Page; params: Record<string, string> }>(() => {
    const hash = window.location.hash.slice(1);
    return parseHash(hash);
  });

  useEffect(() => {
    const handler = () => {
      setState(parseHash(window.location.hash.slice(1)));
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handler);
    currentNav = (page, params) => {
      window.location.hash = buildHash(page, params);
    };
    return () => {
      window.removeEventListener('hashchange', handler);
      currentNav = null;
    };
  }, []);

  return {
    page: state.page,
    params: state.params,
    navigate: (page, params) => {
      window.location.hash = buildHash(page, params);
    },
  };
}

function parseHash(hash: string): { page: Page; params: Record<string, string> } {
  const [pagePart, queryPart] = hash.split('?');
  const page = (pagePart || 'home') as Page;
  const params: Record<string, string> = {};
  if (queryPart) {
    new URLSearchParams(queryPart).forEach((v, k) => {
      params[k] = v;
    });
  }
  if (!validPages.includes(page)) return { page: 'home', params };
  return { page, params };
}

function buildHash(page: Page, params?: Record<string, string>): string {
  if (!params || Object.keys(params).length === 0) return page;
  const sp = new URLSearchParams(params);
  return `${page}?${sp.toString()}`;
}
