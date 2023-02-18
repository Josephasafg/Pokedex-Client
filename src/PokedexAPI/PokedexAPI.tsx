import {API} from "../api";
import {PokemonResponse} from "../Models/PokemonResponse";

export class PokedexAPI {
    private static GET_ALL_URL = '/get-all'
    public static getAll = async (page: number = 1, size: number = 10): Promise<PokemonResponse> => {
        const params = {size: size, page: page};

        const response = await API.get(PokedexAPI.GET_ALL_URL, {params: params});

        if (response.status !== 200) {

        }

        return response.data;
    }
}