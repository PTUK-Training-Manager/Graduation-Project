import React, {FC} from 'react';
import Box, {BoxProps} from "@mui/material/Box";
import {ToolbarLayoutProps} from "./types";

const ToolbarLayout: ToolbarLayoutProps = ({children, ...rest}) => (
    <Box
        {...rest}
        sx={{
            display: "flex",
            mb: 2,
            justifyContent: "space-between",
            ...rest.sx,
        }}
    >
        {children}
    </Box>
);

const ToolbarStartCol: FC<BoxProps> = ({children, ...rest}) => (
    <Box
        {...rest}
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexGrow: 1,
            ...rest.sx,
        }}
    >
        {children}
    </Box>
);

const ToolbarEndCol: FC<BoxProps> = ({children, ...rest}) => (
    <Box
        {...rest}
        sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexGrow: 1,
            ...rest.sx,
        }}
    >
        {children}
    </Box>
);

ToolbarLayout.Start = ToolbarStartCol;
ToolbarLayout.End = ToolbarEndCol;

export default ToolbarLayout;

// const ToolbarLayout: FC<ToolbarLayoutProps> = (props) => {
//   return (
//       <Stack direction="row" sx={{pb: 2}}>
//           {/*    {memoizedHeaderComponent && <Box>{memoizedHeaderComponent}</Box>}*/}
//           <Box>
//               <TextField
//                   sx={{
//                       m: 0,
//                       "& .MuiInputBase-root": {height: 34,}
//                   }}
//                   // onChange={debounce(handleSearchChange, 1000)}
//                   onChange={handleGlobalSearch}
//                   size="small"
//                   placeholder={searchPlaceholder}
//                   margin="normal"
//                   InputProps={{
//                       startAdornment: (
//                           <InputAdornment position="start"><SearchIcon color="disabled"/></InputAdornment>
//                       ),
//                   }}
//               />
//           </Box>
//           <Stack direction="row" sx={{flexGrow: 1, justifyContent: "flex-end", alignItems: "center"}}>
//               {/*<Chip icon={<FilterListIcon/>} label="Filter" variant="outlined" clickable*/}
//               {/*      onClick={() => onSetIsOpenFiltersModal(true)}/>*/}
//           </Stack>
//       </Stack>
//   );
// };
//
// export default ToolbarLayout;
