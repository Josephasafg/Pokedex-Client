import {Pokemon} from "./Models/Pokemon";
import {PageInfo} from "./Models/PageInfo";


export interface IPage {
    pokemons: Pokemon[]
    pageInfo: PageInfo
}

type PageState = {
    pokemons: Pokemon[]
    pageInfo: PageInfo
}

type PageAction = {
    type: string
    pokemons: Pokemon[]
    pageInfo: PageInfo
}

type DispatchType = (args: PageAction) => PageAction
