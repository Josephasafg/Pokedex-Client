import {SelectChangeEvent} from "@mui/material";
import classes from "./HeaderPageControl.module.scss";

import React from "react";
import {PageSize} from "../PageSize/PageSize";
import {FilterControl} from "../FilterControl/FilterControl";
import {shallowEqual, useSelector} from "react-redux";
import {PageState} from "../../types";
import {OrderBy} from "../../Models/Query";

const PAGE_SIZE_OPTIONS = [5, 10, 20];

interface HeaderPageControlProps {
    showSize: number
    onChange: (event: SelectChangeEvent) => void
    onSortChange: (event: SelectChangeEvent) => void
}


export const HeaderPageControl: React.FC<HeaderPageControlProps> = (
    {
        showSize,
        onChange,
        onSortChange,
    }) => {

    const orderBy = useSelector(
        (state: PageState) => state.orderBy,
        shallowEqual,
    )

    return (
        <div className={classes.headerContainer}>
            <FilterControl value={orderBy} onChange={onSortChange} label={"Sort"}
                           options={[OrderBy.ASC, OrderBy.DESC]}/>
            <PageSize showSize={showSize} onChange={onChange} title={"Size"}/>
        </div>
    )
}