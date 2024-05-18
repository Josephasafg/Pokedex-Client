import {SelectChangeEvent} from "@mui/material";

import React from "react";
import {PageSize} from "../PageSize/PageSize";
import {FilterControl} from "../FilterControl/FilterControl";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {PageState} from "../../types";
import {FilterBy, OrderBy} from "../../Models/Query";
import {Toggle} from "../Toggle/Toggle";
import {Theme} from "../../Models/Theme";
import {toggleTheme} from "../../store/actionCreators";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const RightSideWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
`;

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
    const theme = useSelector((state: PageState) => state.theme, shallowEqual);
    const orderBy = useSelector((state: PageState) => state.orderBy, shallowEqual);
    const filterBy = useSelector((state: PageState) => state.filterBy, shallowEqual);

    const handleOnThemeToggle = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleTheme(event.target.checked ? Theme.DARK : Theme.LIGHT));
    }, [dispatch])

    return (
        <HeaderWrapper>
            <Toggle label={"Theme"} onChange={handleOnThemeToggle} isChecked={theme === Theme.DARK}/>
            <RightSideWrapper>
                <FilterControl value={orderBy}
                               onChange={onSortChange}
                               label={"Sort"}
                               options={[OrderBy.ASC, OrderBy.DESC]}/>

                <FilterControl value={filterBy} onChange={onFilterChange} label={"Filter"}
                               options={Object.values(FilterBy)}/>
                {onPageChange && <PageSize showSize={showSize} onChange={onPageChange} title={"Size"}/>}
            </RightSideWrapper>

        </HeaderWrapper>
    )
}