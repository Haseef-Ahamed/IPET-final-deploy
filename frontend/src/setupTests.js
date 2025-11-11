global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};
if (!window.scrollTo) {
  window.scrollTo = () => {};
}
if (!document.documentElement.scrollTo) {
  document.documentElement.scrollTo = () => {};
}
