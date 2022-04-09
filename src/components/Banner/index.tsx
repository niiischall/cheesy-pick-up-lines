import React from "react";

export const Banner: React.FC<{}> = () => {
  return (
    <div className="shownews">
      <div id="news">
        <h3 id="text">
          New to Web3?{" "}
          <a
            className="shownews-link"
            href="https://bit.ly/pickuplines-guide-new"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read this!
          </a>{" "}
          🚀
        </h3>
      </div>
    </div>
  );
};

export default Banner;
