import * as actionTypes from "./actionTypes";
import {IPage, PageAction, ThemeAction} from "../types";
import {Theme} from "../Models/Theme";

export const updatePage = (page: IPage) => {
    const action: PageAction = {
        type: actionTypes.UPDATE_PAGE,
        pokemons: page.pokemons,
        pageInfo: page.pageInfo,
        orderBy: page.orderBy,
        filterBy: page.filterBy,
    }

    return action;
}

export const toggleTheme = (theme: Theme) => {
    const action: ThemeAction = {
        type: actionTypes.TOGGLE_THEME,
        theme: theme,
    }

    return action;
}


