// composables/Utils/search/useDebounce.js
// File: composables/Utils/search/useDebounce.js
export const useDebounce = (fn, delay = 300) => {
  let timeout = null;
  const debouncedFunction = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn();
    }, delay);
  };
  return { debouncedFunction };
};
