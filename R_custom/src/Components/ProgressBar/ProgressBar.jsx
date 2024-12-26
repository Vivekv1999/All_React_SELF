import React, { useEffect, useState } from "react";
import "./style.css";

const ProgressBar = () => {
  const [processedData, setProcessedData] = useState(0);

  useEffect(() => {
    const data = setInterval(() => {
      console.log("interval is running", processedData);
      setProcessedData((prev) => {
        if (prev >= 100) {
          /**check note put here processedData insted of prev and check result*/ /**key */
          clearInterval(data);
          return prev;
        } else {
          return prev + 5;
        }
      });
    }, 500);

    return () => {
      clearInterval(data);
    };
  }, []);

  console.log("running", processedData);

  return (
    <>
      1. Progress bar form progrss html
      <progress id="file" max="100" value={processedData}>
        {processedData}%
      </progress>
      {/* <hr style={{ margin: "20px 0px" }} />
      <hr style={{ margin: "20px 0px" }} /> */}
      <hr style={{ margin: "20px 0px" }} />
      2. using CSS
      <div className="progress_container">
        <div
          className="progress_inner_container"
          style={{ transform: `translateX(${processedData - 100}%)` }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
