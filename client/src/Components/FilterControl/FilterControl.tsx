import React from "react";
import {FormControl, InputLabel, MenuItem, SelectChangeEvent} from "@mui/material";
import Select from "@mui/material/Select";

interface FilterControlProps {
    label: string
    value: string
    options: string[]
    onChange: (event: SelectChangeEvent) => void
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

export const FilterControl: React.FC<FilterControlProps> = (
    {
        label,
        value,
        options,
        onChange,
    }) => {
    return (
        <div>
            <FormControl fullWidth={false} size={"small"}>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={label}
                    onChange={onChange}
                    MenuProps={MenuProps}
                >
                    {options.map((size: string, index: number) => {
                        return <MenuItem key={index} value={size}>{size}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    )
}