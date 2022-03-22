import * as React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme, withStyles } from "@material-ui/core/styles";
import { X } from "phosphor-react";

import { Metamask } from "./utils/Icons";

export interface Props {
  open: boolean;
  onClose: Function;
}

export const WalletDialog = withStyles((theme) => ({
  root: {
    "& .MuiDialogContent-root": {
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      "@media only screen and (max-width: 529px)": {
        padding: "16px",
      },
    },
    "& .MuiDialogTitle-root": {
      "@media only screen and (max-width: 529px)": {
        padding: "16px",
      },
    },
    "& .MuiIconButton-root": {
      padding: "0px",
    },
    "& h2": {
      color: "#323232",
      fontFamily: "Poppins",
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: "36px",
      textAlign: "left",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "& p": {
      color: "#323232",
      fontFamily: "Poppins",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "21px",
      letterSpacing: "0em",
      textAlign: "left",
      marginBottom: "50px",
    },
  },
  paper: {
    backgroundColor: "#FAF5F0",
    width: 480,
    height: 400,
    borderRadius: "20px",
    padding: "8px 0px",
    "@media only screen and (max-width: 529px)": {
      width: 375,
    },
  },
}))((props: any) => <Dialog {...props} />);

export const ConnectWalletButton = withStyles((theme: any) => ({
  root: {
    backgroundColor: "#5C53C5",
    color: "#FFFFFF",
    borderRadius: "100px",
    width: 200,
    height: 54,
    marginTop: 16,
    display: "flex",
    justifyContent: "space-between",
  },
  label: {
    fontFamily: "Poppins",
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: "28px",
    letterSpacing: "0em",
    textAlign: "center",
    textTransform: "none",
  },
}))(Button);

export const ConnectWalletDialog: React.FC<Props> = ({ open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const renderConnectButton = () => {
    let connectButton = (
      <ConnectWalletButton variant="contained" onClick={() => onClose()}>
        <a
          href="https://metamask.io/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#ffffff",
            margin: "0px auto",
            textDecoration: "none",
          }}
        >
          Get a Wallet
        </a>
      </ConnectWalletButton>
    );
    return connectButton;
  };

  return (
    <WalletDialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="connect-wallet-dialog"
    >
      <DialogTitle id="connect-wallet-dialog-title">
        <h3>Get a Crypto Wallet.</h3>
        <IconButton
          onClick={() => onClose()}
          style={{
            backgroundColor: "transparent",
          }}
        >
          <X size={32} weight="light" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="connect-wallet-dialog">
          <Metamask />
        </div>
        <div className="connect-wallet-controls">
          <a
            className="connect-wallet-learn"
            href="https://metamask.io/faqs/"
            target="_blank"
            rel="noopener"
          >
            Learn how to connect
          </a>
          {renderConnectButton()}
        </div>
      </DialogContent>
    </WalletDialog>
  );
};

export default ConnectWalletDialog;
