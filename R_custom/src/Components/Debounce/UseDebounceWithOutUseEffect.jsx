import { useCallback, useState } from "react";

export default function UseDebounceWithOutUseEffect(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value || "");
  const debouncedFunction = useCallback(debounce(setDebounceValue, delay), []); //remove useCallback and check behaviour
  //--memoize function with dependencies but it has [] so this fxn make only one time not on every key stoke
  //https://www.youtube.com/watch?v=_Edzw40LOgs
  debouncedFunction(value);
  return debounceValue;
}

function debounce(callback, delay) {
  let timer;
  let newValue = 1;
  return function debounceFxn(...args) {
    console.log("debounce111--------", newValue);
    if (timer) {
      clearTimeout(timer);
    }
    newValue += 1;
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

//concept in this
// 1 HOF =>higher order funcction -->fucntion that return another function
// 2 closuer
