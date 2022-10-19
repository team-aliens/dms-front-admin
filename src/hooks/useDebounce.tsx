import { useRef } from 'react';

export const useDebounce = () => {
  const timer = useRef<null | NodeJS.Timeout>(null);
  const debounce = (callback: <T>(arg?: T) => void, timeMS: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      callback();
      timer.current = null;
    }, timeMS);
  };
  return { debounce };
};
