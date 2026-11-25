import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface RouterContextValue {
  pathname: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue>({
  pathname: '/',
  navigate: () => {},
});

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname || '/' : '/'
  );

  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('mailto:')) {
      window.location.href = to;
      return;
    }

    if (to.startsWith('#')) {
      const id = to.slice(1);
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/' + to);
        setPathname('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const [rawPath, hash] = to.split('#');
    const targetPath = rawPath || '/';

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', to);
      setPathname(targetPath);
    }

    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

interface AppLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function AppLink({ href, onClick, children, ...rest }: AppLinkProps) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      rest.target === '_blank' ||
      rest.download !== undefined
    ) {
      return;
    }
    if (href.startsWith('/') || href.startsWith('#')) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
