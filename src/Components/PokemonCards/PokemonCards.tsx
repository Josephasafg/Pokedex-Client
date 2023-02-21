import React from "react";
import classes from "./PokemonCards.module.scss";
import {PokemonCard} from "../PokemonCard/PokemonCard";
import {Pokemon} from "../../Models/Pokemon";

interface PokemonCardsProp {
    pokemons: Pokemon[]
}

export const PokemonCards: React.FC<PokemonCardsProp> = (
    {
        pokemons,
    }) => {


    return (
        <div className={classes.cardsContainer}>
            {pokemons.map((pokemon: Pokemon) => {
                return <PokemonCard key={pokemon.pokemon_id} pokemon={pokemon}/>
            })}

        </div>
    )
}