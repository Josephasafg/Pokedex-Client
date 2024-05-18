import * as actionTypes from "./actionTypes";
import {PageAction, PageState, PokedexActions, ThemeAction, UpdateIsCapturedAction} from "../types";
import {FilterBy, OrderBy} from "../Models/Query";
import {Theme} from "../Models/Theme";
import { produce } from 'immer';



const initialState: PageState = {
    pokemons: [],
    pageInfo: {
        size: 10,
        page: 1,
        total: 0
    },
    orderBy: OrderBy.ASC,
    filterBy: FilterBy.ALL,
    theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.DARK : Theme.LIGHT,
}

const updatePage = (state: PageState, action: PageAction): PageState => {
    return {
        ...state,
        pokemons: action.pokemons,
        pageInfo: action.pageInfo,
        orderBy: action.orderBy,
        filterBy: action.filterBy,
    }
}

const toggleTheme = (state: PageState, action: ThemeAction): PageState => {
    return {
        ...state,
        theme: action.theme,
    }
}

function updateIsCaptured(state: PageState, action: UpdateIsCapturedAction) {
    const {pokemonId, isCaptured} = {...action}
    const matchedIndex = Object.values(state.pokemons).findIndex(pokemon => pokemon.pokemon_id === pokemonId)

    if (matchedIndex !== -1) {
        state.pokemons[matchedIndex].is_captured = isCaptured;
    }
}

const projectReducer = (
    state: PageState = initialState,
    action: PokedexActions
): PageState => produce(state, draft => {
    switch (action.type) {
        case actionTypes.UPDATE_PAGE:
            return updatePage(draft, action as PageAction);

        case actionTypes.TOGGLE_THEME:
            return toggleTheme(draft, action as ThemeAction);

        case actionTypes.UPDATE_CAPTURED:
            updateIsCaptured(draft, action as UpdateIsCapturedAction);
            break;
    }
    return draft;
})


export default projectReducer;