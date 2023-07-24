import makeStyles from "@mui/styles/makeStyles";
import { grey } from "@mui/material/colors";
import theme from "src/styling/customTheme";

const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
    width: "100%",
    backgroundColor: "white",
    color: "black",
    fontWeight: 400,
    textAlign: "left",
  },
  containerBorder: {
    border: `1px solid ${theme.palette.grey[400]}`,
  },
  contentEditable: {
    position: "relative",
    maxHeight: "500px",
    resize: "none",
    outline: "0",
    fontSize: "1rem",
    caretColor: grey[600],
    tabSize: "1",
    padding: "15px",
    overflow: "auto",
    "& hr": {
      border: "none",
      height: "2px",
      backgroundColor: grey[400],
    },
  },
  contentEditableMinHeight: {
    minHeight: "150px",
  },
  placeholder: {
    position: "absolute",
    top: "67px",
    left: "15px",
    right: "28px",
    fontSize: "15px",
    color: grey[500],
    overflow: "hidden",
    textOverflow: "ellipsis",
    userSelect: "none",
    pointerEvents: "none",
    whiteSpace: "nowrap",
    display: "inline-block",
  },
}));

export default useStyles;
