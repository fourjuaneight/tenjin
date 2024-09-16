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

/**
 * Custom hook to manage cookies in a React app.
 *
 * @param {string} name - Name of the cookie to manage.
 * @returns {[string | null, (value: string, days?: number) => void]} - An array containing the cookie value and a setter function.
 */
export const useCookie = (
  name: string
): [string | null, (value: string, days?: number) => void] => {
  const [cookieValue, setCookieValue] = useState<string | null>(null);

  useEffect(() => {
    const value = getCookie(name);
    setCookieValue(value);
  }, [name]);

  const updateCookie = useCallback(
    (value: string, days?: number) => {
      setCookie(name, value, days);
      setCookieValue(value);
    },
    [name]
  );

  return [cookieValue, updateCookie];
};
