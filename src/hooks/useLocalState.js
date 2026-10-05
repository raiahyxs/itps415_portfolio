import { useRef, useState } from 'react';
export default function useLocalState(key, initialValue, validate = () => true) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) { const parsed = JSON.parse(stored); if (validate(parsed)) return parsed; }
    } catch { /* Keep private browsing usable. */ }
    return initialValue;
  });
  const valueRef = useRef(value);
  function update(nextValue) {
    const next = typeof nextValue === 'function' ? nextValue(valueRef.current) : nextValue;
    valueRef.current = next;
    setValue(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* Retain the in-memory interaction. */ }
  }
  return [value, update];
}
