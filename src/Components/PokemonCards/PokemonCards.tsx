import React, {useEffect, useState} from "react";
import classes from "./PokemonCards.module.scss";
import {PokemonCard} from "../PokemonCard/PokemonCard";
import {PokedexAPI} from "../../PokedexAPI/PokedexAPI";
import {Pokemon} from "../../Models/Pokemon";


export const PokemonCards: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    // TODO: Implement Logic to treat Mega Pokemon
    const parseMegaPokemon = (newPokemon: Pokemon[]) => {

    }


    useEffect(() => {
             PokedexAPI.getAll().then((newPokemon) => {
                 setPokemons(newPokemon);
             })
    }, [])

    let redundantPokemon = new Map();

    return (
        <div className={classes.cardsContainer}>
            {pokemons.map((pokemon: Pokemon, index: number) => {
                //Don't treat mega for now
                if (pokemon.name.includes("Mega") && pokemon.name.includes(" ")) {
                    return;
                }

                if (!redundantPokemon.get(pokemon.number)) {
                    redundantPokemon.set(pokemon.number, true);
                    return <PokemonCard key={index} pokemon={pokemon}/>
                }

            })}

        </div>
    )
}