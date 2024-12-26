import { useEffect, useState } from "react";

export default function UseDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value || "");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timer); //uncommetn this and check why return us required
    ///it we ddi not write clen up than all each leeter settimeout call if we clen up than call only last one
  }, [delay, value]);

  return debounceValue;
}
