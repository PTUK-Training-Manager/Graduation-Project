import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import { StyledTableRowProps } from "./types";

export const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  //margin-top: 1rem;
`;

export const StyledTableRow = styled(TableRow, {
  shouldForwardProp: prop => !["isClickable", "striped"].includes(prop as string),
})<StyledTableRowProps>(({ theme, isClickable, striped }) => ({
  cursor: isClickable ? "pointer" : "default",
  ...(striped && {
    "&:nth-of-type(odd)": {
      backgroundColor: "#f1f1f1",
    },
  }),
  // "&:last-child td, &:last-child th": {
  //     border: 0,
  // },
  ":hover": {
    backgroundColor: theme.palette.grey[50],
  },
}));
