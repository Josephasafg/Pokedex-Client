import {Pokemon} from "./Models/Pokemon";
import {PageInfo} from "./Models/PageInfo";
import {FilterBy, OrderBy} from "./Models/Query";
import {Theme} from "./Models/Theme";


export interface IPage {
    pokemons: Pokemon[]
    pageInfo: PageInfo
    orderBy: OrderBy
    filterBy: FilterBy
}

type PageState = {
    pokemons: Pokemon[]
    pageInfo: PageInfo
    orderBy: OrderBy
    filterBy: FilterBy
    theme: Theme
}

type PageAction = {
    type: string
    pokemons: Pokemon[]
    pageInfo: PageInfo
    orderBy: OrderBy
    filterBy: FilterBy
}

type ThemeAction = {
    type: string
    theme: Theme
}

type UpdateIsCapturedAction = {
    type: string
    pokemonId: number
    isCaptured: boolean
}

export type PokedexActions = PageAction | ThemeAction | UpdateIsCapturedAction

type DispatchType = (args: PokedexActions) => PokedexActions
