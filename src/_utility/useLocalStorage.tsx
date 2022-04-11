import { useEffect, useState } from "react";

function getSavedValue(key: string, initialValue: any) {
  const savedValue = localStorage.getItem(key) && JSON.parse(localStorage.getItem(key) || "{}")
  if (savedValue) return savedValue
  if (initialValue instanceof Function) return initialValue()
  return initialValue
}

export default function useLocalStorage<T>(key: string, initialValue?: T) {
  const [value, setValue] = useState<T>(() => getSavedValue(key, initialValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])
  return [value, setValue]
};
