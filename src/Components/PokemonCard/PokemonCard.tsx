import React from "react";
import {Card, CardActions, CardContent, CardMedia, Collapse, IconButton, IconButtonProps, Typography} from '@mui/material';
import classes from "./PokemonCard.module.scss";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Pokemon} from "../../Models/Pokemon";
import {styled} from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



interface PokemonProps {
    pokemon: Pokemon
}


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export const PokemonCard: React.FC<PokemonProps> = (
    {
        pokemon,
    }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
                    <div className={classes.cardHeader}>
                        <Typography variant="h5" component="div">
                            {parseName(pokemon.name)}
                        </Typography>

                        <CardMedia
                            component="img"
                            image={pokemon.icon_url}
                            alt="Paella dish"
                            sx={{ padding: "1em 1em 0 1em", objectFit: "contain", width: "40%"}}

                        />
                    </div>

                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {getTypes(pokemon)}
                    </Typography>
                    <Typography variant="body2">
                        Generation {pokemon.generation}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon/>
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography className={classes.stats}>
                            HP: {pokemon.hit_points} Attack: {pokemon.attack} Defense: {pokemon.defense} Sp. Attack: {pokemon.special_attack} Sp. Defense: {pokemon.special_defense} Speed: {pokemon.speed} Total: {pokemon.total}
                        </Typography>
                        <Typography className={classes.stats}>
                            Legendary: {pokemon.legendary ? "Yes": "No"}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}