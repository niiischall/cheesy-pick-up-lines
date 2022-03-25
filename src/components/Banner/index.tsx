import React from "react";

export const Banner: React.FC<{}> = () => {
  return (
    <div className="shownews">
      <div id="news">
        <h3 id="text">
          New to Web3?{" "}
          <a
            className="shownews-link"
            href="https://sassy-beast-257.notion.site/Web3-Apps-for-Dummies-104b941995a548838d8070937b0cc46c"
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
