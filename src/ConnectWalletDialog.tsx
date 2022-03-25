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
import { X, Wallet } from "phosphor-react";

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
    margin: "16px auto",
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

  return (
    <WalletDialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="connect-wallet-dialog"
    >
      <DialogTitle id="connect-wallet-dialog-title">
        <Wallet size={32} weight="fill" />
        <IconButton
          onClick={(event: any) => onClose(event)}
          style={{
            backgroundColor: "transparent",
          }}
        >
          <X size={32} weight="light" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="connect-wallet-dialog">
          <h3>Weird, We can't find a crypto wallet.</h3>
        </div>
        <div className="connect-wallet-controls">
          <ConnectWalletButton variant="contained" onClick={() => onClose()}>
            <a
              href="https://metamask.io/"
              target="_blank"
              style={{
                color: "#ffffff",
                margin: "0px auto",
                textDecoration: "none",
              }}
              rel="noopener noreferrer"
            >
              Get a Wallet
            </a>
          </ConnectWalletButton>
          <div className="instruction-container">
            <span>New to Web3?</span>{" "}
            <a
              className="connect-wallet-learn"
              href="https://sassy-beast-257.notion.site/Web3-Apps-for-Dummies-104b941995a548838d8070937b0cc46c"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read this!
            </a>
          </div>
        </div>
      </DialogContent>
    </WalletDialog>
  );
};

export default ConnectWalletDialog;
