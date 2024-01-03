import { useState, useEffect, useRef } from 'react';

const useChromeStorage = (key, defaultValue) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(defaultValue);
  const isInitialized = useRef(false);
  console.log(key, `key`);
  useEffect(() => {
    try {
      chrome.storage.local.get([key], (res) => {
        if (key in res) {
          setState(res[key]);
        } else {
          setState(defaultValue);
        }
        setLoading(false);
      });
    } catch (error) {
      console.warn(`useChromeStorage get error: ${key}`, error);
      setState(defaultValue);
    } finally {
      isInitialized.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isInitialized.current) return;
    try {
      chrome?.storage?.local?.set({ [key]: state }, () => {
        if (chrome.runtime.lastError) {
          console.warn(
            `useChromeStorage set error: ${key}`,
            chrome.runtime.lastError
          );
        }
      });
    } catch (error) {
      console.warn(`useChromeStorage set error: ${key}`, error);
    }
  }, [key, state]);

  return [state, setState, { loading }];
};

export default useChromeStorage;
