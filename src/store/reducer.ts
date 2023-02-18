import * as actionTypes from "./actionTypes";
import {PageAction, PageState, PokedexActions} from "../types";
import {FilterBy, OrderBy} from "../Models/Query";

const initialState: PageState = {
    pokemons: [],
    pageInfo: {
        size: 10,
        page: 1,
        total: 0
    },
    orderBy: OrderBy.ASC,
    filterBy: FilterBy.ALL,
}

const updatePage = (state: PageState, action: PageAction): PageState => {
    return {
        ...state,
        pokemons: action.pokemons,
        pageInfo: action.pageInfo,
        orderBy: action.orderBy,
        filterBy: action.filterBy
    }
}

const projectReducer = (
    state: PageState = initialState,
    action: PokedexActions
): PageState => {
    switch (action.type) {
        case actionTypes.UPDATE_PAGE:
            return updatePage(state, action as PageAction);
    }
    return state;
}

export default projectReducer;