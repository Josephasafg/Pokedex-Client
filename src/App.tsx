import React, {useEffect, useState} from 'react';
import './App.module.scss';
import {PokemonCards} from "./Components/PokemonCards/PokemonCards";
import {Title} from "./Components/Title/Title";
import {Pokemon} from "./Models/Pokemon";
import {PageInfo} from "./Models/PageInfo";
import {PokedexAPI} from "./PokedexAPI/PokedexAPI";

function App() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfo>({page: 1, total: 0, size: 10})

    // TODO: Implement Logic to treat Mega Pokemon
    const parseMegaPokemon = (newPokemon: Pokemon[]) => {

    }


    useEffect(() => {
        PokedexAPI.getAll(pageInfo.page, pageInfo.size).then((response) => {
            setPokemons(response.items);
            setPageInfo({page: response.page, size: response.size, total: response.total});
        })
    }, [pageInfo.size, pageInfo.page])


    return (
        <div className="App">
            <Title/>
            <PokemonCards pokemons={pokemons}/>
        </div>
    );
}

export default App;
