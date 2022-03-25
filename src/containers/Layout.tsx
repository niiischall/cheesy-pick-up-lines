import React from "react";
import { LinearProgress } from "@material-ui/core";

import Welcome from "../components/Welcome";
import Input from "../components/Input";
import Cards from "../components/Cards";
import Snackbar from "../components/Snackbar";
import ConnectWallletDialog from "../components/Dialogs/ConnectWalletDialog";
import ShareQuoteDialog from "../components/Dialogs/ShareQuoteDialog";

export interface LayoutProps {
  allLines: any[];
  error: string;
  loading: boolean;
  openWalletDialog: boolean;
  openShareDialog: boolean;
  openSnackbar: boolean;
  message: string;
  currentAccount: string;
  connectWallet: Function;
  handleChange: Function;
  handleSubmit: Function;
  handleShare: Function;
  handleShareDialogClose: Function;
  handleWalletDialogClose: Function;
  handleSnackbarClose: Function;
  shareOnTwitter: Function;
}

export const Layout: React.FC<LayoutProps> = ({
  allLines,
  error,
  loading,
  message,
  openWalletDialog,
  openShareDialog,
  openSnackbar,
  currentAccount,
  connectWallet,
  handleChange,
  handleSubmit,
  handleShare,
  handleWalletDialogClose,
  handleSnackbarClose,
  handleShareDialogClose,
  shareOnTwitter,
}) => {
  return (
    <main className="dataContainer">
      {!currentAccount ? (
        <Welcome connectWallet={connectWallet} error={error} />
      ) : (
        <Input
          message={message}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      {loading && (
        <div className="loader-container">
          <LinearProgress color="secondary" />
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      <Snackbar
        openSnackbar={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
      />
      <Cards allLines={allLines} shareOnTwitter={shareOnTwitter} />
      <ConnectWallletDialog
        open={openWalletDialog}
        onClose={handleWalletDialogClose}
      />
      <ShareQuoteDialog
        open={openShareDialog}
        onShare={handleShare}
        onClose={handleShareDialogClose}
      />
    </main>
  );
};

export default Layout;
