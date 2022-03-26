import React from "react";
import { Button, LinearProgress } from "@material-ui/core";
import { Plug } from "phosphor-react";

import Input from "../Input";

export interface PostProps {
  error: string;
  loading: boolean;
  message: string;
  currentAccount: string;
  handleChange: Function;
  handleSubmit: Function;
  connectWallet: Function;
}

export const Post: React.FC<PostProps> = ({
  error,
  loading,
  message,
  currentAccount,
  handleChange,
  handleSubmit,
  connectWallet,
}) => {
  return (
    <div className="post-tab">
      <img
        src="/assets/diary.png"
        alt="A woman writing"
        className="post-image"
      />
      {currentAccount ? (
        <div className="post-cta">
          <h1 className="post-heading">
            Make <span className="post-heading-strong">the move.</span>
          </h1>
          <p className="post-content">It's better than saying Hey.</p>
          {loading && (
            <div className="loader-container">
              <LinearProgress color="secondary" />
            </div>
          )}
          <Input
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        <div className="post-cta">
          <h1 className="post-heading">
            Make <span className="post-heading-strong">the move.</span>
          </h1>
          <p className="post-content">
            Connect your crypto wallet <br className="post-content-break" /> to
            start writing in seconds. <br /> No registration needed.
          </p>
          <Button
            variant="contained"
            startIcon={<Plug size={32} weight="light" />}
            onClick={() => connectWallet()}
            style={{
              width: 250,
              height: 64,
              fontFamily: "Poppins",
              fontWeight: 700,
            }}
            color="secondary"
          >
            Connect Wallet
          </Button>
        </div>
      )}
    </div>
  );
};

export default Post;
