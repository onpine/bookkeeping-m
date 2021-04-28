/**
 * 本地存储
 */
import { isMonth, isToday, getFormat1 } from "@/utils/time";

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

export const initTotal = () => {
  let noteList = getItem("noteList");
  let monthTotal = {
    payTotal: 0,
    payNum: 0,
    inTotal: 0,
    inNum: 0,
    budget: getItem("monthTotal") ? getItem("monthTotal").budget || 0 : 0,
    time: getFormat1(new Date()),
  };
  let todayTotal = {
    payTotal: 0,
    inTotal: 0,
    time: getFormat1(new Date()),
  };
  noteList.forEach((element: any) => {
    if (isMonth(element.time)) {
      if (element.type) {
        monthTotal.inNum += 1;
        monthTotal.inTotal += parseFloat(element.amount);
        if (isToday(element.time)) {
          todayTotal.inTotal += parseFloat(element.amount);
        }
      } else {
        monthTotal.payNum += 1;
        monthTotal.payTotal += parseFloat(element.amount);
        if (isToday(element.time)) {
          todayTotal.payTotal += parseFloat(element.amount);
        }
      }
    }
  });
  setItem("monthTotal", monthTotal);
  setItem("todayTotal", todayTotal);
}