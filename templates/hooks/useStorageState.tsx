import { useState, useEffect, Dispatch, SetStateAction } from "react";

/**
 * Sets a cookie with an optional expiration time.
 *
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param expires - The expiration time in seconds or a specific Date object.
 */
export const setCookie = (
  name: string,
  value: string,
  expires?: number | Date,
) => {
  let expiration = ''

  if (expires) {
    if (typeof expires === 'number') {
      // calculated expiration date = current time + specified seconds
      const date = new Date(Date.now() + expires * 1000)

      expiration = `; expires=${date.toUTCString()}`
    }
    else {
      expiration = `; expires=${expires.toUTCString()}`
    }
  }

  document.cookie = `${name}=${value || ''}${expiration}; path=/`
}

/**
 * Retrieves the value of a specified cookie.
 *
 * @param name - The name of the cookie to retrieve.
 * @returns The value of the cookie, or null if not found.
 */
export const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`
  const cookies = document.cookie.split(';')

  // iterate through cookies to find a match by the specified name.
  for (const cookie of cookies) {
    const ck = cookie.trim()

    if (ck.startsWith(nameEQ)) {
      return ck.substring(nameEQ.length)
    }
  }

  return null
}


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
