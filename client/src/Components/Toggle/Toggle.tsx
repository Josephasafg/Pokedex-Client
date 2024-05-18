import {FormControlLabel, FormGroup} from "@mui/material";
import Switch from '@mui/material/Switch';

import React from "react";

interface ToggleProps {
    isChecked?: boolean
    label: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Toggle: React.FC<ToggleProps> = (
    {
        label,
        onChange,
        isChecked = false
    }) => {
    return (
        <FormGroup>
            <FormControlLabel
                control={<Switch checked={isChecked} onChange={onChange} inputProps={{'aria-label': 'controlled'}}/>}
                label={label}/>
        </FormGroup>
    )
}