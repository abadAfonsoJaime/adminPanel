import React from "react";

const PhoneSimulator = ({ children }) => {
  return (
    <div>
      <div className="image phone">
        <div className="inner" style={{ backgroundColor: "#61c8ec" }}>
          <div className="altura">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default PhoneSimulator;
