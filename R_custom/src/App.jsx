// import "./App.css";
import React from "react";
import InfiniteScroll from "./Components/InfiniteScroll/InfiniteScroll";
import ProgressBar from "./Components/ProgressBar/ProgressBar";
import Throttling from "./Components/Throttling/Throttling";
import Debounce from "./Components/Debounce/Debounce";
import PortalModal from "./Components/Portal/PortalModal";
import Portal from "./Components/Portal/Portal";

function App() {
  return (
    <>
      <div style={{ padding: "5px" }}>
        {/* <InfiniteScroll />; */}
        {/* <ProgressBar /> */}
        {/* <Throttling /> */}
        {/* <Debounce /> */}
        <Portal />
      </div>
    </>
  );
}

export default App;
