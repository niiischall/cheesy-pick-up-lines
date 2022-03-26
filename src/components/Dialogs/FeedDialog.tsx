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
import { X, UserCirclePlus, GoogleLogo } from "phosphor-react";

export interface Props {
  open: boolean;
  onAuth: Function;
  onClose: Function;
}

export const FeedDialog = withStyles((theme) => ({
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
    width: 350,
    height: 350,
    borderRadius: "20px",
    padding: "8px 0px",
    "@media only screen and (max-width: 529px)": {
      width: 375,
    },
  },
}))((props: any) => <Dialog {...props} />);

export const FeedButton = withStyles((theme: any) => ({
  root: {
    backgroundColor: "#00acee",
    color: "#FFFFFF",
    borderRadius: "100px",
    width: 300,
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

export const CustomisedFeedDialog: React.FC<Props> = ({
  open,
  onClose,
  onAuth,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <FeedDialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="share-quote-dialog"
    >
      <DialogTitle id="share-quote-dialog-title">
        <div className="wallet-header">
          <UserCirclePlus color="#00acee" size={32} weight="fill" />
          <h4 style={{ marginLeft: "10px" }}>Join us</h4>
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
        <div>
          <h2 style={{ textAlign: "center" }}>Let's get started 🚀</h2>
        </div>
        <div className="connect-wallet-controls">
          <FeedButton
            variant="contained"
            onClick={(event: any) => onAuth(event)}
          >
            <span
              style={{
                color: "#ffffff",
                margin: "0px auto",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <GoogleLogo color="#ffffff" size={32} weight="bold" />
              <span style={{ marginLeft: "5px" }}>Continue With Google</span>
            </span>
          </FeedButton>
        </div>
      </DialogContent>
    </FeedDialog>
  );
};

export default CustomisedFeedDialog;
