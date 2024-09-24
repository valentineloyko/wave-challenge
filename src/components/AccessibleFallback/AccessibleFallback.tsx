import React from "react";
import "./AccessibleFallback.css";

const AccessibleFallback: React.FC = () => (
  <div
    className="accessible-fallback"
    role="status"
    aria-live="polite"
    aria-label="Loading content, please wait"
  >
    Loading...
  </div>
);

export default AccessibleFallback;
