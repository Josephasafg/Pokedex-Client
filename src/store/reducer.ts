import * as actionTypes from "./actionTypes";
import {PageAction, PageState} from "../types";

const initialState: PageState = {
    pokemons: [],
    pageInfo: {
        size: 10,
        page: 1,
        total: 0
    }
}


const reducer = (
    state: PageState = initialState,
    action: PageAction
): PageState => {
    switch (action.type) {
        case actionTypes.UPDATE_PAGE:
            return {
                ...state,
                pokemons: action.pokemons,
                pageInfo: action.pageInfo,
            }
    }
    return state;
}

export default reducer;