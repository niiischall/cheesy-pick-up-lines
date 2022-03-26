import React from "react";

export const Footer: React.FC<{}> = () => {
  return (
    <footer className="footer">
      <h2>We're live on Ethereum Blockchain. 🎉</h2>
      <div className="footer-credit">
        <h3 style={{ marginRight: 5 }}>Built by </h3>
        <h3>
          <a
            href="https://twitter.com/niiischall"
            target="_blank"
            rel="noopener noreferrer"
          >
            @niiischall
          </a>
        </h3>
      </div>
    </footer>
  );
};

export default Footer;
