import React from "react";
import classes from "./PokemonCards.module.scss";
import {PokemonCard} from "../PokemonCard/PokemonCard";


export const PokemonCards: React.FC = () => {
    return (
        <div className={classes.cardsContainer}>
            <PokemonCard/>
            <PokemonCard/>
            <PokemonCard/>
            <PokemonCard/>
            <PokemonCard/>
            <PokemonCard/>
            <PokemonCard/>
            <PokemonCard/>
            <PokemonCard/>
            <PokemonCard/>
            <PokemonCard/>
            <PokemonCard/>
            <PokemonCard/>
        </div>
    )
}