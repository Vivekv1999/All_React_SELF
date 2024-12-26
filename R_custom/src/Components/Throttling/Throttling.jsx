import React, { useEffect, useState } from "react";
import UseThrottling from "./UseThrottling";

const Throttling = () => {
  const [scrollVlaue, setScrollValue] = useState(0);
  const throuttleValue = UseThrottling(scrollVlaue, 1000);

  useEffect(() => {
    const handleScroll = () => {
      setScrollValue(window.scrollY);
    };
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

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
        <h1>Throttling</h1>
        <hr />
        <h1>Normal : {scrollVlaue}</h1>
        <hr />
        <h1>Throlletd : {throuttleValue}</h1>
      </div>
    </div>
  );
};

export default Throttling;
