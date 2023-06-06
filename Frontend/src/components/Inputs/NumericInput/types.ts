import {TextFieldProps} from "@mui/material/TextField";
import {AutocompleteProps} from "@mui/material/Autocomplete";

export type NumericInputProps = TextFieldProps & {
    min?: number;
    max?: number;
}

