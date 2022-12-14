import React from "react";
import "./Footer.css";

// We use JSX curly braces to evaluate the style object

function Footer() {
  return (
    <div className="d-flex align-items-center justify-content-center footer p-2 bg-light">
      <p className="mt-4"> © 6ixAuto, 2022. All rights reserved.</p>
    </div>
  );
}

export default Footer;
