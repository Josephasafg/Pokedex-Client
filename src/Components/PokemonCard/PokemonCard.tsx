import React from "react";
import {Button, Card, CardActions, CardContent, Typography} from '@mui/material';
import classes from "./PokemonCard.module.scss";
import {Pokemon} from "../../Models/Pokemon";

interface PokemonProps {
    pokemon: Pokemon
}

export const PokemonCard: React.FC<PokemonProps> = (
    {
        pokemon,
    }) => {

    const getTypes = (pokemon: Pokemon): string => {
        return pokemon.type_two ? `${pokemon.type_one} | ${pokemon.type_two}` : pokemon.type_one;
    }

    const parseName = (pokemonName: string): string => {
        let newName = "";

        pokemonName.split(' ').map(word => {
            if (word.includes("Mega")) {
                newName = newName.concat("Mega");
            } else {
                newName = newName.concat(" ", word);
            }
        })

        return newName;
    }

    return (
        <div className={classes.card}>
            <Card>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        #{pokemon.number}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {parseName(pokemon.name)}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {getTypes(pokemon)}
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br/>
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    )
}