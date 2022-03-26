import React from "react";
import { Button } from "@material-ui/core";
import { Plug } from "phosphor-react";

export interface WelcomeProps {
  connectWallet: Function;
  handleFeedExplore: Function;
}

export const Welcome: React.FC<WelcomeProps> = ({
  connectWallet,
  handleFeedExplore,
}) => {
  return (
    <div className="welcome-container">
      <div className="wallet-connect">
        <p>
          It's free.
          <br className="tagline" /> It's cupid.
          <br className="tagline" /> It's Web3.0!
        </p>
      </div>
      <div className="bio">
        <div className="bio-section">
          <img
            src="/assets/love-remember.png"
            className="bio-section-icon"
            alt="Love Remember"
          />
          <h1>
            Can't find the right words to say to that{" "}
            <span className="bio-emphasis">special someone?</span>
          </h1>
        </div>
        <div className="bio-section">
          <h1>
            These <span className="bio-emphasis">cheesy pickup lines</span> may
            be corny...
          </h1>
          <img
            src="/assets/everywhere-together.png"
            className="bio-section-icon"
            alt="Everywhere Together"
          />
        </div>
        <div className="bio-section">
          <img
            src="/assets/spread-love.png"
            className="bio-section-icon"
            alt="Spread Love"
          />
          <h1>
            But they're sure to make someone{" "}
            <span className="bio-emphasis">crack a smile.</span>
          </h1>
        </div>
        <div className="bio-section">
          <h1>
            If you're <span className="bio-emphasis">bold enough</span> to try
            them out!
          </h1>
          <img
            src="/assets/intense-feeling.png"
            className="bio-section-icon"
            alt="Intense Feeling"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
