import React, { useState } from "react";
import UseDebounce from "./UseDebounce";
import UseDebounceWithOutUseEffect from "./UseDebounceWithOutUseEffect";

export default function Debounce() {
  const [seachValue, setSearcValue] = useState("");
  // const debounce = UseDebounce(seachValue, 1000); //check with both
  const debounce = UseDebounceWithOutUseEffect(seachValue, 10000);
  return (
    <div style={{ height: "1000rem" }}>
      <div
        style={{
          position: "fixed",
          top: "3rem",
          left: "0rem",
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <input
          type="text"
          value={seachValue}
          onChange={(e) => setSearcValue(e.target.value)}
        />
        <hr />
        <h1>Normal : {seachValue}</h1>
        <hr />
        <h1>debounce : {debounce}</h1>
      </div>
    </div>
  );
}
