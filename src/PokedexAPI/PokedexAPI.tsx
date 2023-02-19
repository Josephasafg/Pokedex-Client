import {API} from "../api";
import {PokemonResponse} from "../Models/PokemonResponse";
import {FilterBy, OrderBy} from "../Models/Query";
import {AxiosResponse} from "axios";

export class PokedexAPI {
    private static GET_ALL_URL = '/get-all';
    private static POST_CAPTURE = '/capture';

    public static getAll = async (page: number, size: number, orderBy: OrderBy, filterBy?: FilterBy): Promise<PokemonResponse> => {
        const params = {size: size, page: page, order_by: orderBy, type: filterBy};

        const response = await API.get(PokedexAPI.GET_ALL_URL, {params: params});

        if (response.status !== 200) {

        }

        return response.data;
    }

    public static postCapture = async (pokemonId: number, isCaptured: boolean): Promise<AxiosResponse> => {
        const params = {pokemon_id: pokemonId, is_captured: isCaptured};

        return await API.post(PokedexAPI.POST_CAPTURE, params);
    }
}