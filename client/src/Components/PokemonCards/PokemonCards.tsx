import React from "react";
import {PokemonCard} from "../PokemonCard/PokemonCard";
import {Pokemon} from "../../Models/Pokemon";
import styled from "styled-components";

interface PokemonCardsProp {
    pokemons: Pokemon[]
}

const CardsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const PokemonCards: React.FC<PokemonCardsProp> = (
    {
        pokemons,
    }) => {


    return (
        <CardsWrapper>
            {pokemons.map((pokemon: Pokemon) => {
                return <PokemonCard key={pokemon.pokemon_id} pokemon={pokemon}/>
            })}

        </CardsWrapper>
    )
}