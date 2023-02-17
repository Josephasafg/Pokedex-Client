import {API} from "../api";
import {Pokemon} from "../Models/Pokemon";

export class PokedexAPI {
    private static GET_ALL_URL = '/get-all'
    public static getAll = async (): Promise<Pokemon[]> => {
        const response = await API.get(PokedexAPI.GET_ALL_URL)

        if (response.status !== 200) {

        }

        return response.data;
    }
}