import {SelectChangeEvent} from "@mui/material";
import classes from "./HeaderPageControl.module.scss";

import React from "react";
import {PageSize} from "../PageSize/PageSize";
import {FilterControl} from "../FilterControl/FilterControl";
import {shallowEqual, useSelector} from "react-redux";
import {PageState} from "../../types";
import {FilterBy, OrderBy} from "../../Models/Query";

const PAGE_SIZE_OPTIONS = [5, 10, 20];

interface HeaderPageControlProps {
    showSize: number
    onChange: (event: SelectChangeEvent) => void
    onSortChange: (event: SelectChangeEvent) => void
    onFilterChange: (event: SelectChangeEvent) => void
}


export const HeaderPageControl: React.FC<HeaderPageControlProps> = (
    {
        showSize,
        onChange,
        onSortChange,
        onFilterChange
    }) => {

    const orderBy = useSelector(
        (state: PageState) => state.orderBy,
        shallowEqual,
    )

    const filterBy = useSelector(
        (state: PageState) => state.filterBy,
        shallowEqual,
    )

    return (
        <div className={classes.headerContainer}>
            <FilterControl value={orderBy} onChange={onSortChange} label={"Sort"}
                           options={[OrderBy.ASC, OrderBy.DESC]}/>

            <FilterControl value={filterBy} onChange={onFilterChange} label={"Type"}
                           options={Object.values(FilterBy)}/>
            <PageSize showSize={showSize} onChange={onChange} title={"Size"}/>
        </div>
    )
}