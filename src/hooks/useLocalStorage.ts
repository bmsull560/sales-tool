import { useCallback, useEffect, useState } from 'react';

/**
 * Custom hook for storing values in localStorage with type safety
 * @param key - The localStorage key
 * @param initialValue - The initial value
 * @returns [storedValue, setValue]
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State to store the value
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Initialize stored value on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      const parsedItem = item ? JSON.parse(item) : initialValue;
      setStoredValue(parsedItem);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  // Return a wrapped version of useState's setter function
  const setValue = useCallback((value: T) => {
    try {
      // Allow value to be a function for same API as useState
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
