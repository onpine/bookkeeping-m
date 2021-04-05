/**
 * 本地存储
 */

export const getItem = (name: string) => {
  const data = window.localStorage.getItem(name);
  try {
    return JSON.parse(data || "")
  } catch (error) {
    return data
  }
}

export const setItem = (name: string, value: any) => {
  if (typeof value === "object") {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = (name: string) => {
  window.localStorage.removeItem(name)
}