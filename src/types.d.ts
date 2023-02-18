import {Pokemon} from "./Models/Pokemon";
import {PageInfo} from "./Models/PageInfo";
import {OrderBy} from "./Models/Query";


export interface IPage {
    pokemons: Pokemon[]
    pageInfo: PageInfo
    orderBy: OrderBy
}

type PageState = {
    pokemons: Pokemon[]
    pageInfo: PageInfo
    orderBy: OrderBy
}

type PageAction = {
    type: string
    pokemons: Pokemon[]
    pageInfo: PageInfo
    orderBy: OrderBy
}

export type PokedexActions = PageAction

type DispatchType = (args: PokedexActions) => PokedexActions
