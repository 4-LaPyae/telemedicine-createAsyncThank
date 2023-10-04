import { InputBase } from "@mui/material";

export default function SimpleInput({
  placeholder = "Name",
  type = "text",
  fullwidth = false,
  autoFocus = false,
  required = false,
  endAdornment = null,
  ...rest
}) {
  return (
    <InputBase
      {...rest}
      endAdornment={endAdornment}
      placeholder={placeholder}
      type={type}
      fullWidth={fullwidth ? true : false}
      autoFocus={autoFocus ? true : false}
      required={required ? true : false}
      sx={{
        border: "#d2d6da solid 2px",
        padding: 1,
        "&.Mui-focused": {
          border: "#088395 solid 2px",
          outline: 0,
        },
      }}
    />
  );
}
