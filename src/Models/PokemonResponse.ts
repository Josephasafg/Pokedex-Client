import {Pokemon} from "./Pokemon";

export interface PokemonResponse {
    items: Pokemon[]
    total: number
    page: number
    size: number
}