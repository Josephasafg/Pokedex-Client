import {FormControl, InputLabel, MenuItem, Typography} from "@mui/material";
import Select from '@mui/material/Select';
import classes from "./HeaderPageControl.module.scss";

import React from "react";

const PAGE_SIZE_OPTIONS = [5, 10, 20];

interface HeaderPageControlProps {
    showSize: number
}


export const HeaderPageControl: React.FC<HeaderPageControlProps> = (
    {
        showSize,
    }) => {
    return (
        <div className={classes.container}>
            <Typography>Show</Typography>
            <FormControl fullWidth={false}>
                <InputLabel id="demo-simple-select-label">Size</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={showSize}
                    label={showSize}
                    onChange={() => {
                    }}
                >
                    {PAGE_SIZE_OPTIONS.map(size => {
                        return <MenuItem value={size}>{size}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <Typography>Per Page</Typography>
        </div>
    )
}