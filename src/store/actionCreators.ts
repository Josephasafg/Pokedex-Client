import * as actionTypes from "./actionTypes";
import {IPage, PageAction} from "../types";

export const updatePage = (page: IPage) => {
    const action: PageAction = {
        type: actionTypes.UPDATE_PAGE,
        pokemons: page.pokemons,
        pageInfo: page.pageInfo,
    }

}