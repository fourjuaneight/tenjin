import { useState, useEffect, Dispatch, SetStateAction } from "react";

export const useSessionStorage = <T,>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  // Function to get the current value from sessionStorage or default to initialValue
  const getStoredValue = (): T => {
    const storedValue = sessionStorage.getItem(key);

    if (storedValue) {
      try {
        return JSON.parse(storedValue) as T;
      } catch (error) {
        console.error(
          "[useSessionStorage][getStoredValue]:",
          "Error parsing session storage value",
          error
        );
      }
    }
    return initialValue;
  };

  // Use useState with the initial value from sessionStorage
  const [value, setValue] = useState<T>(getStoredValue);

  // Sync the value to sessionStorage whenever it changes
  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(
        "[useSessionStorage][useEffect]:",
        "Error setting session storage value",
        error
      );
    }
  }, [key, value]);

  // Return the state and setter function
  return [value, setValue];
};

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  // Function to get the current value from localStorage or default to initialValue
  const getStoredValue = (): T => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        return JSON.parse(storedValue) as T;
      } catch (error) {
        console.error(
          "[useLocalStorage][getStoredValue]:",
          "Error parsing local storage value",
          error
        );
      }
    }
    return initialValue;
  };

  // Use useState with the initial value from localStorage
  const [value, setValue] = useState<T>(getStoredValue);

  // Sync the value to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(
        "[useLocalStorage][useEffect]:",
        "Error setting local storage value",
        error
      );
    }
  }, [key, value]);

  // Return the state and setter function
  return [value, setValue];
};
