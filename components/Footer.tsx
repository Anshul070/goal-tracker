import React from "react";

interface FooterProps {
  onReset: () => void;
}

export default function Footer({ onReset }: FooterProps) {
  return (
    <div className="footer">
      <div className="footer-text" id="footerText">
        Progress saved automatically.
      </div>
      <button className="reset-btn" id="resetBtn" onClick={onReset}>
        Reset all progress
      </button>
    </div>
  );
}
