import React from "react";
import { TextField, IconButton, styled } from "@material-ui/core";
import { Heart } from "phosphor-react";

export interface InputProps {
  handleSubmit: Function;
  handleChange: Function;
  message: string;
}

const CustomTextField = styled(TextField)({
  "& textarea": {
    color: "##d1495b",
    fontFamily: "Poppins",
    fontWeight: 500,
  },
  "& label": {
    color: "#d1495b",
    fontFamily: "Poppins",
    fontWeight: 500,
    marginRight: "5px",
  },
  "& label.Mui-focused": {
    color: "#d1495b",
    fontFamily: "Poppins",
    fontWeight: 500,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#d1495b",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: "2.5px",
      borderColor: "#d1495b",
    },
    "&:hover fieldset": {
      borderColor: "#d1495b",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#d1495b",
    },
  },
});

export const Input: React.FC<InputProps> = ({
  handleSubmit,
  handleChange,
  message,
}) => {
  console.log(message);
  return (
    <form className="form-box" onSubmit={(event: any) => handleSubmit(event)}>
      <CustomTextField
        id="message-field"
        label="Write something..."
        multiline
        maxRows={4}
        value={message}
        variant="outlined"
        style={{ width: 320 }}
        onChange={(event) => handleChange(event)}
      />
      <IconButton
        type="submit"
        style={{ marginLeft: 10, backgroundColor: "transparent" }}
        disabled={!message}
      >
        {message ? (
          <Heart size={32} weight="fill" color="#d1495b" />
        ) : (
          <Heart size={32} weight="fill" color="#c2c2c2" />
        )}
      </IconButton>
    </form>
  );
};

export default Input;
