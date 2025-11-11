const globalScope = typeof globalThis !== "undefined"
  ? globalThis
  : typeof window !== "undefined"
  ? window
  : typeof global !== "undefined"
  ? global
  : {};

if (!globalScope.localStorage) {
  globalScope.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  };
}
if (!globalScope.sessionStorage) {
  globalScope.sessionStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  };
}
if (!globalScope.IntersectionObserver) {
  globalScope.IntersectionObserver = class {
    constructor() {}
    observe() {}
    disconnect() {}
    unobserve() {}
    takeRecords() { return []; }
  };
}

if (!globalScope.scrollTo) {
  globalScope.scrollTo = () => {};
}
if (
  globalScope.document &&
  globalScope.document.documentElement &&
  !globalScope.document.documentElement.scrollTo
) {
  globalScope.document.documentElement.scrollTo = () => {};
}
