import {FormControl, InputLabel, MenuItem, SelectChangeEvent, Typography} from "@mui/material";
import Select from '@mui/material/Select';

import React from "react";
import styled from "styled-components";
import configData from "../../ProjectConfig.json";

const PageSizeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  align-content: space-between;
  margin-right: 100px;
  gap: 10px;
`;


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
        <PageSizeContainer>
            <Typography>Show</Typography>
            <FormControl fullWidth={false} size={"small"}>
                <InputLabel id="pokedex-pages-id">{title}</InputLabel>
                <Select
                    labelId="pokedex-pages-id-label"
                    id="pokedex-pages-id-select"
                    value={showSize.toString()}
                    label={showSize}
                    onChange={onChange}
                >
                    {configData.PAGE_SIZE_OPTIONS.map((size: number, index: number) => {
                        return <MenuItem key={index} value={size}>{size}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <Typography>Per Page</Typography>
        </PageSizeContainer>
    )
}