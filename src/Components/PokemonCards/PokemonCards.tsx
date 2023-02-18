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