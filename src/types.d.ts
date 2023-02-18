import {Pokemon} from "./Models/Pokemon";
import {PageInfo} from "./Models/PageInfo";
import {FilterBy, OrderBy} from "./Models/Query";


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
}

type PageAction = {
    type: string
    pokemons: Pokemon[]
    pageInfo: PageInfo
    orderBy: OrderBy
    filterBy: FilterBy
}

export type PokedexActions = PageAction

type DispatchType = (args: PokedexActions) => PokedexActions
