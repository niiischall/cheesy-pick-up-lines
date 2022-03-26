import React, { useState } from "react";

import Welcome from "../components/Welcome";
import Post from "../components/Post";
import Feed from "../components/Feed";
import Tabs from "../components/Tabs";
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
  submitSuccess: boolean;
  message: string;
  currentAccount: string;
  connectWallet: Function;
  handleChange: Function;
  handleSubmit: Function;
  handleShare: Function;
  handleShareDialogClose: Function;
  handleWalletDialogClose: Function;
  handleSnackbarClose: Function;
  handleFeedExplore: Function;
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
  submitSuccess,
  currentAccount,
  connectWallet,
  handleChange,
  handleSubmit,
  handleShare,
  handleWalletDialogClose,
  handleSnackbarClose,
  handleShareDialogClose,
  handleFeedExplore,
  shareOnTwitter,
}) => {
  const [currentTab, setCurrentTab] = useState<any>(null);

  const handleTabChange = (event: any, newValue: number) => {
    setCurrentTab(newValue);
  };

  const renderTabs = () => {
    let tab: any = null;
    if (currentTab === 1) {
      tab = <Feed allLines={allLines} shareOnTwitter={shareOnTwitter} />;
    } else if (currentTab === 2) {
      tab = (
        <Post
          error={error}
          loading={loading}
          currentAccount={currentAccount}
          message={message}
          submitSuccess={submitSuccess}
          connectWallet={connectWallet}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      );
    } else {
      tab = null;
    }
    return tab;
  };

  return (
    <main className="dataContainer">
      <Tabs handleTabChange={handleTabChange} />
      {currentTab ? (
        renderTabs()
      ) : (
        <Welcome
          connectWallet={connectWallet}
          handleFeedExplore={handleFeedExplore}
        />
      )}
      <Snackbar
        openSnackbar={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
      />
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
