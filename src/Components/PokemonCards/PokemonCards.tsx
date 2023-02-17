import React, {useEffect, useState} from "react";
import classes from "./PokemonCards.module.scss";
import {PokemonCard} from "../PokemonCard/PokemonCard";
import {PokedexAPI} from "../../PokedexAPI/PokedexAPI";
import {Pokemon} from "../../Models/Pokemon";


export const PokemonCards: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    useEffect(() => {
             PokedexAPI.getAll().then((newPokemon) => {
                 setPokemons(newPokemon);
             })

    }, [pokemons])


    return (
        <div className={classes.cardsContainer}>
            {pokemons.map((pokemon: Pokemon, index: number) => {
                return <PokemonCard key={index} pokemon={pokemon}/>
            })}

        </div>
    )
}