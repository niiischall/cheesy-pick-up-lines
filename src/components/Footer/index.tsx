import React from "react";

import { TwitterLogo } from "phosphor-react";

export const Footer: React.FC<{}> = () => {
  return (
    <footer className="footer">
      <h2>We're live on Ethereum Blockchain. 🎉</h2>
      <div className="footer-credit">
        <h2 style={{ marginRight: 10 }}>Built by </h2>
        <TwitterLogo color="#00acee" size={24} weight="fill"></TwitterLogo>
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
