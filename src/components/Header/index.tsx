import React from "react";

export const Header: React.FC<{}> = () => {
  return (
    <header className="header">
      <div className="super-header">
        <span>
          Win ₹5000 worth of rewards! Shoot a pick up line before
          <br className="super-header-break" /> 30th of April, 2022 🚀 
        </span>
      </div>
      <h1 className="heading">🧀 Pick Up Lines</h1>
    </header>
  );
};

export default Header;
