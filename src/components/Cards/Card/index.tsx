import React from "react";
import moment from "moment";

import { IconButton } from "@material-ui/core";
import { TwitterLogo } from "phosphor-react";

export interface CardProps {
  line: any;
  shareOnTwitter: Function;
}

export const Card: React.FC<CardProps> = ({
  line,
  shareOnTwitter,
}) => {
  const d = new Date(line.timestamp.toString());
  const time = moment.utc(d).local().startOf("seconds").fromNow();
  return (
    <div className="message-section">
      <div className="message-box">
        <h1 className="message-heading">{line.line}</h1>
        <div className="message-details">
          <h3 className="message-text-address">✍🏻 {line.address}</h3>
          <h5 style={{ color: "#7678ED" }}>{time}</h5>
        </div>
      </div>
      <div className="twitter-box">
        <IconButton
          onClick={() => shareOnTwitter(line)}
          style={{
            backgroundColor: "#ffffff",
          }}
        >
          <TwitterLogo color="#00acee" size={32} weight="fill" />
        </IconButton>
      </div>
    </div>
  );
};

export default Card;
