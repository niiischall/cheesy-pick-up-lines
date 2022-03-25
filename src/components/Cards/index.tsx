import React from "react";

import Card from "./Card";

export interface CardsProps {
  allLines: any[];
  shareOnTwitter: Function;
}

export const Cards: React.FC<CardsProps> = ({ allLines, shareOnTwitter }) => {
  return (
    <div className="message-container">
      {allLines.map((line: any, index: number) => {
        return (
          <Card
            key={index}
            line={line}
            shareOnTwitter={shareOnTwitter}
          />
        );
      })}
    </div>
  );
};

export default Cards;
