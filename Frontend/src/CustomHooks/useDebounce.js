import { useState, useEffect } from "react";

export const useDebounce = (value, delay = 500) => {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update debouncedValue after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timer if value or delay changes before timeout completes
    return () => clearTimeout(handler);
  }, [value, delay]);

  // Return the latest debounced value
  return debouncedValue;
};
