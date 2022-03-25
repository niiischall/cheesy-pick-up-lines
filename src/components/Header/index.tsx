import React from "react";

export const Header: React.FC<{}> = () => {
  return (
    <header className="header">
      <div className="super-header">
        <span>
          Stand a chance to win ₹1000 worth of ETH! Send an OG 🧀 pick up line
          before
          <br className="super-header-break" /> 30th of April, 2022.
        </span>
      </div>
      <h1 className="heading">🧀 Pick Up Lines</h1>
    </header>
  );
};

export default Header;
