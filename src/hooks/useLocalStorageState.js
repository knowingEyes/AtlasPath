import { useEffect, useRef, useState } from "react";

export const useLocalStorageState = (
  initialValue,
  key,
  { render = true } = {}
) => {
  function getter() {
    try {
      const savedData = localStorage.getItem(key);
      return JSON.parse(savedData) || initialValue;
    } catch {
      return initialValue;
    }
  }
  const [state, setState] = useState(getter);
  const refValue = useRef(getter());
  useEffect(() => {
    if (render) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, render, state]);
  return render ? [state, setState] : []
};
