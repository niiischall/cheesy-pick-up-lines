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
import { X, TwitterLogo } from "phosphor-react";

export interface Props {
  open: boolean;
  onShare: Function;
  onClose: Function;
}

export const ShareDialog = withStyles((theme) => ({
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
    width: 400,
    height: 350,
    borderRadius: "20px",
    padding: "8px 0px",
    "@media only screen and (max-width: 529px)": {
      width: 375,
    },
  },
}))((props: any) => <Dialog {...props} />);

export const ShareButton = withStyles((theme: any) => ({
  root: {
    backgroundColor: "#00acee",
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

export const ShareQuoteDialog: React.FC<Props> = ({
  open,
  onClose,
  onShare,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ShareDialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="share-quote-dialog"
    >
      <DialogTitle id="share-quote-dialog-title">
        <div className="wallet-header">
          <TwitterLogo color="#00acee" size={32} weight="fill" />
          <h4 style={{ marginLeft: "10px" }}>Tweet this..</h4>
        </div>
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
        <div className="share-quote-content">
          <h2 style={{ textAlign: "center" }}>
            @ the person you want to dedicate it to!
          </h2>
        </div>
        <div className="connect-wallet-controls">
          <ShareButton
            variant="contained"
            onClick={(event: any) => onShare(event)}
          >
            <span
              style={{
                color: "#ffffff",
                margin: "0px auto",
                textDecoration: "none",
              }}
            >
              Share
            </span>
          </ShareButton>
        </div>
      </DialogContent>
    </ShareDialog>
  );
};

export default ShareQuoteDialog;
