import React, { FC, useState, useEffect } from 'react';
import {DebouncedInputProps} from "./types";

const DebouncedInput: FC<DebouncedInputProps> = (props) => {
    const {
        value: initialValue,
        onChange,
        debounce = 500,
        ...rest
    } = props;

    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <input
            {...rest}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}

export default DebouncedInput;
