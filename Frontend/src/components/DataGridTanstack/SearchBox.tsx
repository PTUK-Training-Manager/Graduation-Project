import React, {ChangeEvent, FC, useContext} from 'react';
import {CreateDataGridConfig} from "./types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import {SearchBoxProps} from "./types";

export function makeSearchBox<T extends object>(configs: CreateDataGridConfig<T>) {

    const SearchBox: FC<SearchBoxProps> = ({searchPlaceholder = "Search"}) => {
        const {
            onSetGlobalFilter,
        } = useContext(configs.Context);

        const handleGlobalSearch = (e: ChangeEvent<HTMLInputElement>) => {
            onSetGlobalFilter(e.target.value);
        };

        return (
          <Box>
              <TextField
                  sx={{
                      m: 0,
                      "& .MuiInputBase-root": {height: 34,}
                  }}
                  // onChange={debounce(handleSearchChange, 1000)}
                  onChange={handleGlobalSearch}
                  size="small"
                  placeholder={searchPlaceholder}
                  margin="normal"
                  InputProps={{
                      startAdornment: (
                          <InputAdornment position="start"><SearchIcon color="disabled"/></InputAdornment>
                      ),
                  }}
              />
          </Box>
        );
    };

    SearchBox.displayName = `${configs.name}.SearchBox`;
    return SearchBox;
}

