import {API} from "../api";
import {PokemonResponse} from "../Models/PokemonResponse";
import {OrderBy} from "../Models/Query";

export class PokedexAPI {
    private static GET_ALL_URL = '/get-all'
    public static getAll = async (page: number, size: number, orderBy: OrderBy): Promise<PokemonResponse> => {
        const params = {size: size, page: page, order_by: orderBy};

        const response = await API.get(PokedexAPI.GET_ALL_URL, {params: params});

        if (response.status !== 200) {

        }

        return response.data;
    }
}