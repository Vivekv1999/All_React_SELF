import React from "react";
import { createPortal } from "react-dom";

const PortalModal = ({ children }) => {
  const mpotalID = document.getElementById("portal_modal");
  return createPortal(
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          padding: 0,
          justifyContent: "center",
          alignContent: "center",
          display: "flex",
          // backgroundColor: "red",
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            maxWidth: "100%", // Added maxWidth for better responsiveness
            padding: "20px",
            margin: "40px",
            backgroundColor: "white", // White background for modal content
            borderRadius: "8px", // Rounded corners
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
            display: "flex",
            flexDirection: "column", // Stack children vertically
            justifyContent: "center", // Center content vertically
            alignItems: "center",
          }}
        >
          <h1>Modal With Portal</h1>
          {children}
          <hr />
          <button>Click Me</button>
        </div>
      </div>
    </>,
    mpotalID
  );
};

export default PortalModal;
