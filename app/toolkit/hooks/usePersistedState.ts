import { useEffect, useState } from "react";
import { checkIsBrowser } from "../browser/checkIsBrowser";

const isBrowser = checkIsBrowser();

let isomorphicStorage: Partial<Storage> = {
  setItem: (key: string, value: string) => {
    return isBrowser ? localStorage.setItem(key, value) : value;
  },
  getItem: (key: string) => (isBrowser ? localStorage.getItem(key) : null),
};

export default function usePersistedState<T>(
  defaultValue: T,
  key: string,
  storage = isomorphicStorage
) {
  let [value, setValue] = useState<T>(() => {
    return tryGetCachedValue(key, storage, defaultValue);
  });

  useEffect(() => {
    setValue(tryGetCachedValue(key, storage, defaultValue));
  }, [key]);

  useEffect(() => {
    if (!key) return;
    let valueStr = typeof value === "string" ? value : JSON.stringify(value);
    storage.setItem(key, valueStr);
  }, [key, value]);

  return [value, setValue] as [T, typeof setValue];
}

const tryGetCachedValue = (key, storage, defaultValue) => {
  try {
    let cachedValue = key ? storage.getItem(key) : null;
    if (!cachedValue) return defaultValue;
    try {
      return JSON.parse(cachedValue);
    } catch (err) {
      // Unable to parse the JSON, must be a string?
      return cachedValue;
    }
  } catch (err) {
    return defaultValue;
  }
};
