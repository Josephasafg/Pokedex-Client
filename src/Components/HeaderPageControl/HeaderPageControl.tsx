import {SelectChangeEvent} from "@mui/material";
import classes from "./HeaderPageControl.module.scss";

import React from "react";
import {PageSize} from "../PageSize/PageSize";
import {FilterControl} from "../FilterControl/FilterControl";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {PageState} from "../../types";
import {FilterBy, OrderBy} from "../../Models/Query";
import {Toggle} from "../Toggle/Toggle";
import {Theme} from "../../Models/Theme";
import {toggleTheme} from "../../store/actionCreators";


interface HeaderPageControlProps {
    showSize: number
    onPageChange?: (event: SelectChangeEvent) => void
    onSortChange: (event: SelectChangeEvent) => void
    onFilterChange: (event: SelectChangeEvent) => void
}


export const HeaderPageControl: React.FC<HeaderPageControlProps> = (
    {
        showSize,
        onPageChange,
        onSortChange,
        onFilterChange
    }) => {
    const dispatch = useDispatch();
    const theme = useSelector((state: PageState) => state.theme, shallowEqual,)

    const orderBy = useSelector(
        (state: PageState) => state.orderBy,
        shallowEqual,
    )

    const filterBy = useSelector(
        (state: PageState) => state.filterBy,
        shallowEqual,
    )

    const handleOnThemeToggle = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleTheme(event.target.checked ? Theme.DARK : Theme.LIGHT));
    }, [dispatch])


    return (
        <div className={classes.headerContainer}>
            <Toggle label={"Theme"} onChange={handleOnThemeToggle} isChecked={theme === Theme.DARK}/>
            <div className={classes.rightSide}>
                <FilterControl value={orderBy}
                               onChange={onSortChange}
                               label={"Sort"}
                               options={[OrderBy.ASC, OrderBy.DESC]}/>

                <FilterControl value={filterBy} onChange={onFilterChange} label={"Filter"}
                               options={Object.values(FilterBy)}/>
                {onPageChange && <PageSize showSize={showSize} onChange={onPageChange} title={"Size"}/>}
            </div>

        </div>
    )
}