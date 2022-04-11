import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  const setLocalStorage = (value) => {
    try {
      setValue((state) => [...state, value]);
      storedValue.push(value);
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (e) {}
  };

  return [storedValue, setLocalStorage];
}
