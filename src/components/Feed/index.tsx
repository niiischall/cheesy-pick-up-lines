import React from "react";
import { Clock } from "phosphor-react";

import Cards from "../Cards";

export interface FeedProps {
  allLines: any[];
  shareOnTwitter: Function;
}

export const Feed: React.FC<FeedProps> = ({ allLines, shareOnTwitter }) => {
  return (
    <div id="feed" className="feed-tab">
      <div className="feed-heading">
        <Clock color="#d1495b" size={32} weight="fill" />
        <h3>Recent <span className="feed-emphasis">Posts</span></h3>
      </div>
      {allLines.length > 0 ? (
        <Cards allLines={allLines} shareOnTwitter={shareOnTwitter} />
      ) : <p>We're working on this...give us a moment.</p>}
    </div>
  );
};

export default Feed;
