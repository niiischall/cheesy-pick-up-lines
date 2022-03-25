import React from "react";

import { TwitterLogo } from "phosphor-react";

export const Footer: React.FC<{}> = () => {
  return (
    <footer className="footer">
      <h3 style={{ marginRight: 10 }}>Built by </h3>
      <TwitterLogo color="#00acee" size={32} weight="fill"></TwitterLogo>
      <h3>
        <a
          href="https://twitter.com/niiischall"
          target="_blank"
          rel="noopener noreferrer"
        >
          @niiischall
        </a>
      </h3>
    </footer>
  );
};

export default Footer;
