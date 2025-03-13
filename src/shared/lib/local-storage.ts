export const setLS = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const getLS = (key: string) => localStorage.getItem(key);

export const removeLS = (key: string) => localStorage.removeItem(key);

export const clearLS = () => localStorage.clear();
