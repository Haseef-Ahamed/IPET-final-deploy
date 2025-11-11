if (typeof window !== 'undefined') {
  if (!window.localStorage) {
    window.localStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
    };
  }
  if (!window.sessionStorage) {
    window.sessionStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
    };
  }

  // Add this for framer-motion and other libs that need IntersectionObserver
  if (!window.IntersectionObserver) {
    window.IntersectionObserver = class {
      constructor() {}
      observe() {}
      disconnect() {}
      unobserve() {}
      takeRecords() { return []; }
    };
  }

  if (!window.scrollTo) {
    window.scrollTo = () => {};
  }
  if (!document.documentElement.scrollTo) {
    document.documentElement.scrollTo = () => {};
  }
}
