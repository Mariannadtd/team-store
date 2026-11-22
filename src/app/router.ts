export type RoutePath = '/about' | '/products' | '/cart';

export type PageRenderer = () => HTMLElement;

export interface RouterOptions {
  routes: Record<RoutePath, PageRenderer>;
  defaultRoute: RoutePath;
  outlet: HTMLElement;
  onRouteChange?: (route: RoutePath) => void;
}

function isRoutePath(path: string, routes: Record<string, PageRenderer>): path is RoutePath {
  return Object.prototype.hasOwnProperty.call(routes, path);
}

function getHashPath(): string {
  const hash = window.location.hash;
  if (!hash || hash === '#') {
    return '';
  }
  return hash.startsWith('#') ? hash.slice(1) : hash;
}

export function initRouter(options: RouterOptions): void {
  const { routes, defaultRoute, outlet, onRouteChange } = options;

  const handleRouteChange = (): void => {
    const currentPath = getHashPath();

    if (!isRoutePath(currentPath, routes)) {
      window.location.replace(`#${defaultRoute}`);
      return;
    }

    const pageElement = routes[currentPath]();
    outlet.replaceChildren(pageElement);

    if (onRouteChange) {
      onRouteChange(currentPath);
    }
  };

  window.addEventListener('hashchange', handleRouteChange);

  handleRouteChange();
}
