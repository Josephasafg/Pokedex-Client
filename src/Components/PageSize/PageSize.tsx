import {FormControl, InputLabel, MenuItem, SelectChangeEvent, Typography} from "@mui/material";
import Select from '@mui/material/Select';

import React from "react";
import classes from "./PageSize.module.scss";

const PAGE_SIZE_OPTIONS = [5, 10, 20];

interface PageSizeProps {
    title: string
    showSize: number
    onChange: (event: SelectChangeEvent) => void
}

export const PageSize: React.FC<PageSizeProps> = (
    {
        title,
        showSize,
        onChange,
    }) => {
    return (
        <div className={classes.container}>
            <Typography>Show</Typography>
            <FormControl fullWidth={false}>
                <InputLabel id="demo-simple-select-label">{title}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={showSize.toString()}
                    label={showSize}
                    onChange={onChange}
                >
                    {PAGE_SIZE_OPTIONS.map((size: number, index: number) => {
                        return <MenuItem key={index} value={size}>{size}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <Typography>Per Page</Typography>
        </div>
    )
}