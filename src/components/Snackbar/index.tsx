import React from "react";
import { Snackbar } from "@material-ui/core";

export interface SnackbarProps {
  openSnackbar: boolean;
  handleSnackbarClose: Function;
}

export const CustomizedSnackbar: React.FC<SnackbarProps> = ({
  openSnackbar,
  handleSnackbarClose,
}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={openSnackbar}
      onClose={(event) => handleSnackbarClose(event)}
      autoHideDuration={1000}
    >
      <div className="snackbar">
        <span>Copied to Clipboard. Tweet it!</span>
      </div>
    </Snackbar>
  );
};

export default CustomizedSnackbar;
