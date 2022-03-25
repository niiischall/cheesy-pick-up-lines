import React from "react";
import { Button } from "@material-ui/core";
import { Plugs } from "phosphor-react";

export interface WelcomeProps {
  connectWallet: Function;
  error: string
}

export const Welcome: React.FC<WelcomeProps> = ({
    connectWallet,
    error
}) => {
  return (
    <div className="welcome-container">
      <div className="wallet-connect">
        <Button
          variant="contained"
          startIcon={<Plugs size={32} weight="light" />}
          onClick={() => connectWallet()}
          style={{
            width: 250,
            height: 64,
            margin: "16px auto",
            fontFamily: "Poppins",
            fontWeight: 500,
          }}
          color="secondary"
        >
          {!window.ethereum ? "Get A Wallet" : "Connect Wallet"}
        </Button>
        <p>It's free. It's cupid. It's Web3.0!</p>
      </div>
      <div className="bio">
        <div className="bio-section">
          <img
            src="/assets/love-remember.png"
            className="bio-section-icon"
            alt="Love Remember"
          />
          <h1>Can't find the right words to say to that special someone?</h1>
        </div>
        <div className="bio-section">
          <h1>These cheesy pickup lines may be corny...</h1>
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
          <h1>But they're sure to make someone crack a smile.</h1>
        </div>
        <div className="bio-section">
          <h1>If you're bold enough to try them out!</h1>
          <img
            src="/assets/intense-feeling.png"
            className="bio-section-icon"
            alt="Intense Feeling"
          />
        </div>
        <div className="wallet-connect">
          <Button
            variant="contained"
            startIcon={<Plugs size={32} weight="light" />}
            onClick={() => connectWallet()}
            style={{
              width: 250,
              height: 64,
              margin: "0px auto",
              fontFamily: "Poppins",
              fontWeight: 500,
            }}
            color="secondary"
          >
            {!window.ethereum ? "Get A Wallet" : "Connect Wallet"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
