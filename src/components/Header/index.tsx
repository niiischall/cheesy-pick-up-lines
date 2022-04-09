import React from "react";

export const Header: React.FC<{}> = () => {
  return (
    <header className="header">
      <div className="super-header">
        <span>
          Win exciting{" "}
          <a
            className="header-link"
            href="https://bit.ly/rewards-pickuplines"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rewards!
          </a>{" "}
          <br className="super-header-break" />
          Shoot a pick up line before
          <br className="super-header-break" /> 30th of April, 2022 🚀
        </span>
      </div>
      <h1 className="heading">🧀 Pick Up Lines</h1>
    </header>
  );
};

export default Header;
