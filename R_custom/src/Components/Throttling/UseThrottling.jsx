import React, { useEffect, useRef, useState } from "react";

const UseThrottling = (value, delay) => {
  const [newValue, setNewValue] = useState(value);
  const flagref = useRef(true); //we use ref beause when this compoent unmount ref dtore hivalue while other state strt with defaulf value
  //but ref store his value
  //--->>> should persist across renders but do not need to cause re-renders

  useEffect(() => {
    if (flagref.current) {
      console.log(flagref, "flaggggggggggg", value);
      setNewValue(value);
      flagref.current = false;
      setTimeout(() => {
        flagref.current = true;
      }, delay);
    }
  }, [value, delay]);

  return newValue;
};

export default UseThrottling;
