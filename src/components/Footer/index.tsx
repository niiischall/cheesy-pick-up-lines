import React from "react";

export const Footer: React.FC<{}> = () => {
  return (
    <footer className="footer">
      <div className="footer-header">
        <h3 className="footer-heading">Supported By</h3>
        <a
          href="https://geekyants.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/assets/geekyants-logo.png"
            className="geekyants-logo"
            alt="GeekyAnts Logo"
          />
        </a>
      </div>
      <div className="footer-credit">
        <h3 style={{ marginRight: 5 }}>Built by </h3>
        <h4>
          <a
            href="https://twitter.com/niiischall"
            target="_blank"
            rel="noopener noreferrer"
          >
            @niiischall
          </a>
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
