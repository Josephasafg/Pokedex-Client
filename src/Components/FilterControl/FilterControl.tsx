import React from "react";
import {FormControl, InputLabel, MenuItem, SelectChangeEvent} from "@mui/material";
import Select from "@mui/material/Select";

interface FilterControlProps {
    label: string
    value: string
    options: string[]
    onChange: (event: SelectChangeEvent) => void
}

export const FilterControl: React.FC<FilterControlProps> = (
    {
        label,
        value,
        options,
        onChange,
    }) => {
    return (
        <div>
            <FormControl fullWidth={false}>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={label}
                    onChange={onChange}
                >
                    {options.map((size: string, index: number) => {
                        return <MenuItem key={index} value={size}>{size}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    )
}